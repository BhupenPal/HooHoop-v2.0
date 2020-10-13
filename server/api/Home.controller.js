//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),

    //MongoDB Models
    ContactModel = require('../models/Contact.model'),
    CarModel = require('../models/Car.model'),
    LeadsGeneratedModel = require('../models/GeneratedLead.model'),

    //Helper and Services
    { GenerateOTP, EscapeRegex } = require('../helper/service'),
    { verifyAccessToken } = require('../helper/auth/JWT_service'),
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
    CarModel.aggregate([{
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

Router.get('/buy-car/:PageNo?', (req, res, next) => {
    let options = {
        page: req.params.PageNo || 1,
        select: 'Make, Model, ModelYear, Price, State, BodyType, FuelType, KMsDriven',
        lean: true,
        limit: req.query.SetLimit || 15
    }

    // Basic Filter For All Queries
    let Filters = {
        isActive: true
    }

    // Show all results - REMOVE PAGINATION
    // if (!req.query.Pagination) {
    //     options.pagination = false
    //     delete options.limit
    // }

    // Sorting Data
    if (req.query.SortData) {
        options.sort = req.query.SortData
    }

    // For Search Field Make Model VINum
    if (req.query.SearchedCar) {
        const RegExCar = new RegExp(EscapeRegex(req.body.SearchedCar), 'gi')
        Filters.$or = [{ Make: RegExCar }, { Model: RegExCar }, { VINum: RegExCar }]
    }

    CarModel.paginate({
        ...Filters
    }, options)
        .then(cars => {
            if (!cars) return res.sendStatus(204)
            res.json(cars)
        })
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

    CarModel.find({
        isActive: true,
        ...Suggested
    })
        .limit(10)
        .then(doc => { res.json(doc) })
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