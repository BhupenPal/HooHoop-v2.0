//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),
    bcrypt = require('bcrypt'),

    //MongoDB Models
    UserModel = require('../models/User.model'),
    CarModel = require('../models/Car.model'),

    //Helper and Services
    { verifyAccessToken } = require('../helper/auth/JWT_service'),
    { PassCheck } = require('../helper/validation'),
    { HashSalt } = require('../helper/service');

Router.get('/profile', verifyAccessToken, (req, res, next) => {
    UserModel.findById(req.payload.aud, 'FirstName LastName Email Phone DOB DisplayPic Address EmailVerified PhoneVerified Credits Role -_id')
        .then(user => {
            if (!user) return next(createError.Forbidden())
            res.status(201).json(user)
        })
})

Router.put('/update/profile', verifyAccessToken, (req, res, next) => {
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

Router.put('/update/password', verifyAccessToken, (req, res, next) => {
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
Router.get('/listings', verifyAccessToken, (req, res, next) => {
    CarModel.find({ 'Author': req.payload.aud })
        .populate('Author', 'FirstName LastName Phone Email DealershipEmail Role')
        .then(cars => {
            if (!cars) return res.sendStatus(204)
            res.json(cars)
        })
})

Router.get('/admin/listings', verifyAccessToken, (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (user.Role !== 'admin') return next(createError.NotFound())
            CarModel.find({}, 'Make Model Price isNewCar Featured VINum Author.Name Author.Email Author.Phone ViewsCount')
                .populate('Author', 'FirstName LastName Phone Email DealershipEmail Role')
                .then(cars => {
                    if (!cars) return res.sendStatus(204)
                    res.status(200).json(cars)
                })
        })
})

Router.delete('/delete/listing', verifyAccessToken, (req, res, next) => {
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

Router.patch('/update/listing/status', verifyAccessToken, (req, res, next) => {
    CarModel.findOneAndUpdate({ VINum: req.body.value }, { $set: { isActive: !req.body.isActive } }, () => {
        res.sendStatus(200)
    })
})

Router.post('/edit/listing', verifyAccessToken, (req, res, next) => {
    try {
        // Edit APUI to be set here
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})
/* Listing Handle */

/* User Handles */
Router.get('/all-users', verifyAccessToken, (req, res, next) => {
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

Router.delete('/delete/user', verifyAccessToken, (req, res, next) => {
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

module.exports = Router