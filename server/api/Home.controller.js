//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),

    //MongoDB Models
    ContactModel = require('../models/Contact.model'),
    CarModel = require('../models/Car.model'),

    //Helper and Services
    { GenerateOTP, EscapeRegex } = require('../helper/service'),
    { SendMail } = require('../helper/mail/config')

Router.get('/', (req, res, next) => {
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
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
                }
            },
            recentCars: {
                $push: {
                    $cond: [{
                        $eq: ['$ModelYear', 2020]
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
                }
            },
            suvType: {
                $push: {
                    $cond: [{
                        $eq: ['$BodyType', 'SUV']
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
                }
            },
            hatchbackType: {
                $push: {
                    $cond: [{
                        $eq: ['$BodyType', 'Hatchback']
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
                }
            },
            sedanType: {
                $push: {
                    $cond: [{
                        $eq: ['$BodyType', 'Sedan']
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
                }
            },
            under5K: {
                $push: {
                    $cond: [{
                        $lt: ['$Price', 5000]
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
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
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
                }
            },
            above10K: {
                $push: {
                    $cond: [{
                        $gt: ['$Price', 10000]
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        Price: '$Price',
                        ViewsCount: '$ViewsCount'
                    }, '$$REMOVE']
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
            SendMail(Email, `HooHoop #${ComplaintNum}: ${Subject}`, Message)
            SendMail('contact@hoohoop.co.nz', `HooHoop #${ComplaintNum}: ${Subject}`, Message)
            res.sendStatus(200)
        })
})

Router.get('/buy-car', (req, res, next) => {
    //No. of cars to show on every call
    const size = 15

    //Handling Filter
    let { Filters, PageNo } = req.body

    if (Filters.SearchedCar) {
        const RegExCar = new RegExp(EscapeRegex(Filters.SearchedCar), 'gi')
        Filters = {
            $or: [{ Make: RegExCar }, { Model: RegExCar }, { VINum: RegExCar }]
        }
    }

    CarModel.aggregate([{
        $match: {
            ...Filters,
            isActive: true
        }
    },
    {
        $group: {
            _id: null,
            FeaturedCars: {
                $push: {
                    $cond: [{
                        $eq: ['$Featured.value', false]
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        ModelYear: '$ModelYear',
                        Price: '$Price',
                        State: '$State',
                        BodyType: '$BodyType',
                        FuelType: '$FuelType',
                        KMsDriven: '$KMsDriven'
                    }, '$$REMOVE']
                }
            },
            Cars: {
                $push: {
                    $cond: [{
                        $eq: ['$Featured.value', false]
                    }, {
                        Make: '$Make',
                        Model: '$Model',
                        ModelYear: '$ModelYear',
                        Price: '$Price',
                        State: '$State',
                        BodyType: '$BodyType',
                        FuelType: '$FuelType',
                        KMsDriven: '$KMsDriven'
                    }, '$$REMOVE']
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            FeaturedCars: 1,
            Cars: 1
        }
    }
    ], (err, doc) => {
        if (err) return next(createError.ServiceUnavailable())
        res.json(...doc)
    })
})

Router.get('/car/:VINum', (req, res, next) => {
    CarModel.findOne({ VINum: req.body.VINum }, '-Featured.validTill')
        .then(doc => {
            if (!doc) return next(createError.BadRequest())
            res.json(doc)
        })
})

module.exports = Router