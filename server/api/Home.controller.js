//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),
    mongoose = require('mongoose'),

    //MongoDB Models
    ContactModel = require('../models/Contact.model'),
    CarModel = require('../models/Car.model'),
    LeadsGeneratedModel = require('../models/GeneratedLead.model'),
    UserModel = require('../models/User.model'),

    //Helper and Services
    { GenerateOTP, SearchRegex, RangeBasedFilter } = require('../helper/service'),
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
    const { Price, BodyType, FuelType, SearchedCar, KMsDriven, ModelYear, SortData, Make, Model, Transmission, Color, State } = req.query
    let { PageNo } = req.params,
        UserID = null

    // Decoding authorization to check user and getting ObjectID
    if (req.headers['authorization']) {
        UserID = await decodeToken(req.headers['authorization'])
        UserID = mongoose.Types.ObjectId(UserID.aud)
    }

    // Making Sure Page Number IS NOT LESS THAN OR EQUAL TO 0
    PageNo = Math.max(1, PageNo)

    let options = {
        page: PageNo || 1,
        select: 'Make Model ModelYear Price State BodyType FuelType KMsDriven ViewsCount VINum LikedBy',
        lean: true,
        limit: 15
    }

    // Basic Filter For All Queries
    let Filters = {
        isActive: true
    }

    // Selected Filters
    if (Make) Filters.Make = Make
    if (Color) Filters.Color = Color
    if (Model) Filters.Model = Model
    if (State) Filters.State = State
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
        const RegExCar = new RegExp(SearchRegex(SearchedCar), 'gi')
        Filters.$or = [{ Make: RegExCar }, { Model: RegExCar }, { VINum: RegExCar }]
    }
    
    CarModel.paginate(Filters, options)
        .then(cars => {
            cars.docs.map(vehicle => {
                vehicle.LikedBy = vehicle.LikedBy.some((CurrentObjID) => {
                    return CurrentObjID == UserID ? true : false
                })
            })
            res.json(cars)
        })
})

Router.patch('/wish-handle', verifyAccessToken, async (req, res, next) => {
    try {
        console.log(req.payload)
        const { VINum } = req.body

        const LikedCar = await CarModel.findOne({ VINum })
        const User = await UserModel.findById(req.payload.aud)

        if (!LikedCar || !User) throw createError.NotFound()

        if (LikedCar.LikedBy.includes(req.payload.aud)) {
            LikedCar.LikedBy.pull(req.payload.aud)
            User.WishList.pull(VINum)
        } else {
            LikedCar.LikedBy.push(req.payload.aud)
            User.WishList.push(VINum)
        }

        LikedCar.save()
        User.save()

        res.sendStatus(200)
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