//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),
    bcrypt = require('bcrypt'),

    //MongoDB Models
    UserModel = require('../models/User.model'),
    CarModel = require('../models/Car.model'),
    LeadsGeneratedModel = require('../models/GeneratedLead.model'),

    //Helper and Services
    { verifyAccessToken } = require('../helper/auth/JWT_service'),
    { PassCheck } = require('../helper/validation'),
    { HashSalt } = require('../helper/service');

Router.use(verifyAccessToken)

Router.get('/profile', (req, res, next) => {
    UserModel.findById(req.payload.aud, 'FirstName LastName Email Phone DOB Address EmailVerified PhoneVerified Credits Role -_id')
        .then(user => {
            if (!user) return next(createError.Forbidden())
            res.status(201).json(user)
        })
})

Router.put('/update/profile', (req, res, next) => {
    let { FirstName, LastName, Address, State, Gender, DOB } = req.body;
    if (!FirstName && !LastName && !Address && !State && !Gender) return next(createError.BadRequest())
    UserModel.findById(req.payload.aud, 'FirstName LastName Address Gender State Role DOB')
        .then(user => {
            if (!user) return next(createError.Forbidden())
            if (user._id == req.payload.aud || user.Role === 'admin') {
                FirstName = (!FirstName) ? user.FirstName : FirstName
                LastName = (!LastName) ? user.LastName : LastName
                Address = (!Address) ? user.Address : Address
                Gender = (!Gender) ? user.Gender : Gender
                State = (!State) ? user.State : State
                DOB = (!DOB) ? user.DOB : DOB
                UserModel.updateOne(
                    { _id: req.payload.aud },
                    {
                        $set: { FirstName, LastName, Address, State, Gender },
                    },
                    (err, user) => {
                        if (err) return next(createError.ExpectationFailed())
                        res.sendStatus(200)
                    }
                )
            } else {
                return next(createError.Forbidden())
            }
        })
})

Router.put('/update/password', (req, res, next) => {
    try {
        let { originalPass, Password, cPassword } = req.body
        if (!originalPass || !Password || !cPassword) throw createError.BadRequest('Please fill in all the required fields')
        if (!PassCheck(Password, cPassword)) throw createError.BadRequest('Invalid Password')
        UserModel.findById(req.payload.aud, 'Password')
            .then(user => {
                if (!user) return next(createError.Forbidden())
                bcrypt.compare(originalPass, user.Password, async (err, isMatch) => {
                    if (!isMatch) return next(createError.Unauthorized('Password does not match'))
                    if (user._id == req.payload.aud || user.Role === 'admin') {
                        Password = await HashSalt(Password)
                        user.Password = Password
                        user.save()
                        res.status(201).send()
                    } else {
                        return next(createError.Forbidden())
                    }
                })
            })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

/* Listing Handles */
Router.get('/listings', (req, res, next) => {
    CarModel.find({ Author: req.payload.aud }, 'Make Model Price isNewCar VINum ViewsCount createdAt')
        .then(cars => {
            if (!cars) return res.sendStatus(204)
            res.json(cars)
        })
})

Router.get('/admin/listings', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (user.Role !== 'admin') return next(createError.NotFound())
            CarModel.find({}, 'Make Model Price isNewCar Featured VINum ViewsCount')
                .populate('Author', 'FirstName LastName Email Phone DealershipEmail DealershipPhone Role _id')
                .then(cars => {
                    if (!cars) return res.sendStatus(204)
                    res.status(200).json(cars)
                })
        })
})

Router.delete('/delete/listing', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(async user => {
            if (!user) return next(createError.Forbidden())
            if (user._id == req.payload.aud || user.payload.admin === true) {
                CarModel.deleteOne({ VINum: req.body.value }, () => {
                    res.sendStatus(200)
                })
            } else {
                return next(createError.BadRequest())
            }
        })
})

Router.patch('/update/listing/status', (req, res, next) => {
    CarModel.findOneAndUpdate({ VINum: req.body.value }, { $set: { isActive: !req.body.isActive } }, () => {
        res.sendStatus(200)
    })
})

Router.post('/edit/listing', (req, res, next) => {
    try {
        // Edit APUI to be set here
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})
/* Listing Handle */

/* User Handles */
Router.get('/all-users', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (user.Role !== 'admin') return next(createError.NotFound())
            UserModel.find({ _id: { $nin: user._id } }, 'FirstName LastName Email Phone EmailVerified PhoneVerified Role State')
                .then(users => {
                    if (!users) return res.sendStatus(204)
                    res.json(users)
                })
        })
})

Router.delete('/delete/user', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(async user => {
            if (!user) return next(createError.Forbidden())
            if (user.Role !== 'admin') return next(createError.Forbidden())
            await UserModel.findByIdAndRemove(req.body.value, () => {
                res.sendStatus(200)
            })
        })
})
/* User Handles */

/* Client Management */
Router.get('/test-drives', (req, res, next) => {
    LeadsGeneratedModel.find({ $and: [{ Author: req.payload.aud }, { 'QueryFor.TestDrive': true }] }, 'createdAt FullName Email Phone VINum Status MakeModel')
        .then(docs => {
            if (!docs) return res.sendStatus(204)
            res.json(docs)
        })
})

Router.get('/callback-requests', (req, res, next) => {
    LeadsGeneratedModel.find({ $and: [{ Author: req.payload.aud }, { 'QueryFor.CallBack': true }] }, 'createdAt FullName Email Phone VINum Status MakeModel')
        .then(docs => {
            if (!docs) return res.sendStatus(204)
            res.json(docs)
        })
})

Router.get('/shipments', (req, res, next) => {
    LeadsGeneratedModel.find({ $and: [{ Author: req.payload.aud }, { 'QueryFor.CallBack': true }] }, 'createdAt FullName Email Phone CarID Status MakeModel')
        .then(docs => {
            if (!docs) return res.sendStatus(204)
            res.json(docs)
        })
})

Router.get('/admin/test-drives', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (!user || user.Role !== 'admin') return next(createError.Forbidden())
            LeadsGeneratedModel.find({ 'QueryFor.TestDrive': true }, 'createdAt FullName Email Phone VINum Status MakeModel')
                .populate('Author', 'FirstName LastName Email Phone DealershipEmail DealershipPhone DealershipName _id')
                .then(docs => {
                    if (!docs) return res.sendStatus(204)
                    res.json(docs)
                })
        })
})

Router.get('/admin/callback-requests', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (!user || user.Role !== 'admin') return next(createError.Forbidden())
            LeadsGeneratedModel.find({ 'QueryFor.CallBack': true }, 'createdAt FullName Email Phone VINum Status MakeModel')
                .populate('Author', 'FirstName LastName Email Phone DealershipEmail DealershipPhone DealershipName _id')
                .then(docs => {
                    if (!docs) return res.sendStatus(204)
                    res.json(docs)
                })
        })
})

Router.get('/admin/shipments', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (!user || user.Role !== 'admin') return next(createError.Forbidden())
            LeadsGeneratedModel.find({ 'QueryFor.Shipment': true }, 'createdAt FullName Email Phone CarID Status MakeModel')
                .populate('Author', 'FirstName LastName Email Phone DealershipEmail DealershipPhone DealershipName _id')
                .then(docs => {
                    if (!docs) return res.sendStatus(204)
                    res.json(docs)
                })
        })
})
/* Client Management */

module.exports = Router