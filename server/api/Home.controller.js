//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),

    //MongoDB Models
    ContactModel = require('../models/Contact.model'),
    CarModel = require('../models/Car.model'),
    LeadsGeneratedModel = require('../models/GeneratedLead.model'),

    //Helper and Services
    { GenerateOTP, SearchEscapeRegex, RangeBasedFilter } = require('../helper/service'),
    { verifyAccessToken, decodeToken } = require('../helper/auth/JWT_service'),
    { SendMail } = require('../helper/mail/config'),
    { ContactMail } = require('../helper/mail/content');

Router.get('/', (req, res, next) => {
    const DataToFetch = {
        Make: '$Make',
        Model: '$Model',
        Price: '$Price',
        ViewsCount: '$ViewsCount',
        VINum: '$VINum'
    }
    CarModel.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $group: {
                _id: null,
                usedCars: {
                    $push: {
                        $cond: [{
                            $lte: ['$ModelYear', 2019]
                        },
                            DataToFetch, '$$REMOVE'
                        ]
                    }
                },
                recentCars: {
                    $push: {
                        $cond: [{
                            $eq: ['$ModelYear', 2020]
                        }, DataToFetch, '$$REMOVE']
                    }
                },
                suvType: {
                    $push: {
                        $cond: [{
                            $eq: ['$BodyType', 'SUV']
                        }, DataToFetch, '$$REMOVE']
                    }
                },
                hatchbackType: {
                    $push: {
                        $cond: [{
                            $eq: ['$BodyType', 'Hatchback']
                        }, DataToFetch, '$$REMOVE']
                    }
                },
                sedanType: {
                    $push: {
                        $cond: [{
                            $eq: ['$BodyType', 'Sedan']
                        }, DataToFetch, '$$REMOVE']
                    }
                },
                under5K: {
                    $push: {
                        $cond: [{
                            $lt: ['$Price', 5000]
                        }, DataToFetch, '$$REMOVE']
                    }
                },
                under10K: {
                    $push: {
                        $cond: [{
                            $and: [{
                                $gt: ['$Price', 5000]
                            }, {
                                $lte: ['$Price', 10000]
                            }]
                        }, DataToFetch, '$$REMOVE']
                    }
                },
                above10K: {
                    $push: {
                        $cond: [{
                            $gt: ['$Price', 10000]
                        }, DataToFetch, '$$REMOVE']
                    }
                },
            }
        },
        {
            $project: {
                _id: 0,
                usedCars: {
                    "$slice": ["$usedCars", 10]
                },
                recentCars: {
                    "$slice": ["$recentCars", 10]
                },
                suvType: {
                    "$slice": ["$suvType", 10]
                },
                hatchbackType: {
                    "$slice": ["$hatchbackType", 10]
                },
                sedanType: {
                    "$slice": ["$sedanType", 10]
                },
                under5K: {
                    "$slice": ["$under5K", 10]
                },
                under10K: {
                    "$slice": ["$under10K", 10]
                },
                above10K: {
                    "$slice": ["$above10K", 10]
                }
            }
        }
    ], (err, doc) => {
        if (err) return next(createError.ServiceUnavailable())
        res.json(...doc)
    })
})

Router.post('/contact', (req, res, next) => {
    const { FullName, Email, Subject, Message } = req.body
    const ComplaintNum = GenerateOTP()
    new ContactModel({
        ComplaintNum,
        FullName,
        Email,
        Subject,
        Message
    })
        .save()
        .then(() => {
            SendMail('contact@hoohoop.co.nz', `#${ComplaintNum}: ${Subject}`, ContactMail(Email, Subject, FullName, Message))
            res.sendStatus(200)
        })
})

Router.get('/buy-car/:PageNo', async (req, res, next) => {
    const { Price, BodyType, FuelType, SearchedCar, KMsDriven, ModelYear, SortData, Make, Model, Transmission, Color } = req.query
    let { PageNo } = req.params

    // Decoding authorization to check user and getting ObjectID
    let UserID = decodeToken(req.headers['authorization'])
    UserID = UserID ? UserID.aud : null

    // Making Sure Page Number IS NOT LESS THAN OR EQUAL TO 0
    PageNo = Math.max(1, PageNo)

    let options = {
        page: PageNo || 1,
        lean: true
    }

    const DataToFetch = {
        Make: '$Make',
        Model: '$Model',
        ModelYear: '$ModelYear',
        Price: '$Price',
        State: '$State',
        BodyType: '$BodyType',
        FuelType: '$FuelType',
        KMsDriven: '$KMsDriven',
        ViewsCount: '$ViewsCount',
        VINum: '$VINum'
    }

    // Basic Filter For All Queries
    let Filters = {
        isActive: true
    }

    // Selected Filters
    if (Make) Filters.Make = Make
    if (Color) Filters.Color = Color
    if (Model) Filters.Model = Model
    if (FuelType) Filters.FuelType = FuelType
    if (BodyType) Filters.BodyType = BodyType
    if (Transmission) Filters.Transmission = Transmission
    if (Price) Filters.Price = RangeBasedFilter(Price)
    if (KMsDriven) Filters.KMsDriven = RangeBasedFilter(KMsDriven)
    if (ModelYear) Filters.ModelYear = RangeBasedFilter(ModelYear)

    // Sorting Data
    if (SortData === 'CheapestFirst') options.sort = { Price: 1 }
    else if (SortData === 'ExpensiveFirst') options.sort = { Price: -1 }
    else if (SortData === 'OldestFirst') options.sort = { createdAt: 1 }

    // For Search Field Make Model VINum
    if (SearchedCar) {
        const RegExCar = new RegExp(SearchEscapeRegex(SearchedCar), 'gi')
        Filters.$or = [{ Make: RegExCar }, { Model: RegExCar }, { VINum: RegExCar }]
    }

    // Number of Featured Cars to be shown in 1 render = 6
    // Limit of Featured Cars for query = 150
    // Featured Cars Fetched for how many pages => 150/6 = 25 
    const FeaturedCars = (PageNo % 25 === 1)
        ?
        await CarModel.aggregatePaginate(CarModel.aggregate([
            {
                $match: {
                    ...Filters,
                    'Featured.value': !0
                }
            },
            {
                $project: {
                    ...DataToFetch,
                    "LikedBy": {
                        $in: [UserID, "$LikedBy"]
                    }
                }
            }
        ]), { ...options, page: Math.ceil(PageNo / 25), limit: 150 })
        :
        null

    // If no featured cars then 15 normal cars, otherwise 9 normal cars
    options.limit = (FeaturedCars !== null) ? 9 : 15

    const cars =
        await CarModel.aggregatePaginate(CarModel.aggregate([
            {
                $match: {
                    ...Filters,
                    'Featured.value': !1
                }
            },
            {
                $project: {
                    ...DataToFetch,
                    "LikedBy": {
                        $in: [UserID, "$LikedBy"]
                    }
                }
            }
        ]), options)

    res.json({ cars, FeaturedCars })
})

Router.patch('/wish-handle', verifyAccessToken, (req, res, next) => {
    try {
        const { VINum } = req.body

        CarModel.findOne({ VINum })
            .then((doc) => {
                if (!doc) throw createError.NotFound()
                doc.LikedBy.includes(req.payload.aud)
                    ?
                    doc.LikedBy.pull(req.payload.aud)
                    :
                    doc.LikedBy.push(req.payload.aud)

                doc.save(res.sendStatus(200))
            })
    } catch (error) {
        next(error)
    }
})

Router.get('/car/:VINum', (req, res, next) => {
    const { VINum } = req.params
    CarModel.findOne({ VINum }, '-Featured.validTill')
        .then(doc => {
            if (!doc) return next(createError.BadRequest())
            res.json(doc)
        })
})

Router.get('/recommended-cars/:CurrentPrice', (req, res, next) => {
    const { CurrentPrice } = req.params
    const Suggested = { Price: null }

    if (CurrentPrice <= 5000) {
        Suggested.Price = { $lte: 5000 }
    } else if (CurrentPrice <= 10000) {
        Suggested.Price = { $gt: 5000, $lte: 10000 }
    } else {
        Suggested.Price = { $gt: 10000 }
    }

    CarModel.aggregate([
        {
            $match: {
                isActive: true,
                ...Suggested
            }
        },
        {
            $sample: { size: 10 }
        },
        {
            $project: {
                _id: 0,
                Make: 1,
                Model: 1,
                Price: 1,
                ViewsCount: 1,
                VINum: 1
            }
        }
    ], (err, doc) => {
        if (err) return next(createError.ServiceUnavailable())
        res.json(doc)
    })
})

Router.post('/car/leads/submission', verifyAccessToken, (req, res, next) => {
    const { FullName, Phone, WantsToTrade, CallbackQuery, ShipmentQuery, TestDriveQuery, MakeModel, VINum, AuthorID } = req.body;

    const Data = {
        FullName: FullName,
        Email: req.payload.Email,
        Phone: Phone,
        QueryFor: {},
        Author: AuthorID,
        MakeModel: MakeModel,
        VINum: VINum
    }

    Data.QueryFor.TestDrive = (TestDriveQuery) ? true : false
    Data.QueryFor.CallBack = (CallbackQuery) ? true : false
    Data.QueryFor.Shipment = (ShipmentQuery) ? true : false
    Data.WantsToTrade = (WantsToTrade) ? true : false

    new LeadsGeneratedModel(Data).save()
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            return next(createError.ExpectationFailed())
        })
})

module.exports = Router