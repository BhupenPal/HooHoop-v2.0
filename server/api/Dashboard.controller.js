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
    { HashSalt, PassCheck } = require('../helper/service');

Router.use(verifyAccessToken)

Router.get('/profile', (req, res, next) => {
    UserModel.findById(req.payload.aud, 'FirstName LastName Email Phone DOB Address EmailVerified PhoneVerified DisplayPic Credits Role -_id')
        .then(user => {
            if (!user) return next(createError.Forbidden())
            res.status(201).json(user)
        })
})

Router.put('/update/profile', (req, res, next) => {
    let { FirstName, LastName, Address, State, Gender, DOB, UserID } = req.body;
    if (!FirstName && !LastName && !Address && !State && !Gender) return next(createError.BadRequest())
    UserModel.findById(UserID, 'FirstName LastName Address Gender State Role DOB')
        .then(user => {
            if (!user) return next(createError.Forbidden())
            if (user._id == req.payload.aud || req.payload.Role === 'admin') {
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
                    if (!isMatch) return next(createError.Forbidden('Password does not match'))
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

Router.get('/my-favourites', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(doc => {
            if (!doc) return next(createError.Forbidden())
            CarModel.find({ VINum: { $in: doc.WishList }, isActive: true }, 'Make Model ModelYear Price State BodyType FuelType KMsDriven ViewsCount VINum')
                .then(data => {
                    res.status(201).json(data)
                })
        })
})

/* Listing Handles */
Router.get('/listings/', (req, res, next) => {
    let options = {
        page: req.body.PageNo || 1,
        select: 'Make Model Price isNewCar VINum ViewsCount createdAt LeadsGenerated',
        lean: true,
		limit: req.body.SetLimit || 10,
		sort: { $natural: -1 }
    }

    if (!req.body.Pagination) {
        options.pagination = false
        delete options.limit
    }

    if (req.body.SortData) {
        options.sort = req.body.SortData
    }

    CarModel.paginate({ Author: req.payload.aud }, options)
        .then(cars => {
            if (!cars) return res.sendStatus(204)
            res.json(cars)
        })
})

Router.get('/admin/listings', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (user.Role !== 'admin') return next(createError.NotFound())
            let options = {
                page: req.body.PageNo || 1,
                select: 'Make Model Price isNewCar Featured VINum ViewsCount createdAt LeadsGenerated',
                lean: true,
                limit: req.body.SetLimit || 10,
                populate: { path: 'Author', select: 'FirstName LastName Email Phone DealershipEmail DealershipPhone Role _id' }
            }

            if (!req.body.Pagination) {
                options.pagination = false
                delete options.limit
            }

            if (req.body.SortData) {
                options.sort = req.body.SortData
            }

            CarModel.paginate({}, options)
                .then(cars => {
                    if (!cars) return res.sendStatus(204)
                    res.json(cars)
                })
        })
})

Router.delete('/delete/listing', (req, res, next) => {
    CarModel.findOne({ VINum: req.body.value })
        .then(car => {
            if (car.Auhtor == req.payload.aud) {
                car.remove(() => { res.sendStatus(200) })
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        car.remove(() => { res.sendStatus(200) })
                    })
            }
        })
})

Router.patch('/update/listing/status', (req, res, next) => {
    CarModel.findOne({ VINum: req.body.value })
        .then(car => {
            if (car.Author == req.payload.aud) {
                car.isActive = !req.body.isActive
                car.save(() => { res.sendStatus(200) })
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        car.isActive = !req.body.isActive
                        car.save(() => { res.sendStatus(200) })
                    })
            }
        })
})

Router.post('/edit/listing', (req, res, next) => {
    try {
        // Edit API to be set here
        CarModel.findOneAndUpdate({ VINum: req.body.VINum }, req.body)
            .then(() => {
                res.sendStatus(200)
            })
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
            let options = {
                page: req.body.PageNo || 1,
                select: 'FirstName LastName Email Phone EmailVerified PhoneVerified Role State isActive _id',
                lean: true,
                limit: req.body.SetLimit || 10,
				sort: { $natural: -1 }
            }

            if (!req.body.Pagination) {
                options.pagination = false
                delete options.limit
            }

            if (req.body.SortData) {
                options.sort = req.body.SortData
            }

            UserModel.paginate({ _id: { $nin: user._id } }, options)
                .then(users => {
                    res.json(users)
                })
        })
})

Router.patch('/update/userstatus', (req, res, next) => {
	const { UserID } = req.body
    UserModel.findById(UserID)
        .then(user => {
            if (req.payload.Role !== 'admin') return next(createError.NotFound())
            UserModel.findByIdAndUpdate(req.body.value, { $set: { isActive: req.body.SetStatus } })
                .then(() => {
                    res.sendStatus(200)
                })
        })
})

Router.delete('/delete/user', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (user.Role !== 'admin') return next(createError.NotFound())
            UserModel.findByIdAndRemove(req.body.value, () => {
                CarModel.deleteMany({ Author: req.body.value }, () => {
                    res.sendStatus(200)
                })
            })
        })
})
/* User Handles */

/* Client Management */
Router.get('/test-drives', (req, res, next) => {
    let options = {
        page: req.body.PageNo || 1,
        select: 'createdAt FullName Email Phone VINum Status MakeModel',
        lean: true,
        limit: req.body.SetLimit || 10,
		sort: { $natural: -1 }
    }

    if (!req.body.Pagination) {
        options.pagination = false
        delete options.limit
    }

    if (req.body.SortData) {
        options.sort = req.body.SortData
    }

    LeadsGeneratedModel.paginate({ $and: [{ Author: req.payload.aud }, { 'QueryFor.TestDrive': true }] }, options)
        .then(docs => {
            res.json(docs)
        })
})

Router.get('/callback-requests', (req, res, next) => {
    let options = {
        page: req.body.PageNo || 1,
        select: 'createdAt FullName Email Phone VINum Status MakeModel',
        lean: true,
        limit: req.body.SetLimit || 10,
		sort: { $natural: -1 }
    }

    if (!req.body.Pagination) {
        options.pagination = false
        delete options.limit
    }

    if (req.body.SortData) {
        options.sort = req.body.SortData
    }

    LeadsGeneratedModel.paginate({ $and: [{ Author: req.payload.aud }, { 'QueryFor.CallBack': true }] }, options)
        .then(docs => {
            res.json(docs)
        })
})

Router.get('/shipments', (req, res, next) => {
    let options = {
        page: req.body.PageNo || 1,
        select: 'createdAt FullName Email Phone VINum Status MakeModel',
        lean: true,
        limit: req.body.SetLimit || 10,
		sort: { $natural: -1 }
    }

    if (!req.body.Pagination) {
        options.pagination = false
        delete options.limit
    }

    if (req.body.SortData) {
        options.sort = req.body.SortData
    }

    LeadsGeneratedModel.paginate({ $and: [{ Author: req.payload.aud }, { 'QueryFor.CallBack': true }] }, options)
        .then(docs => {
            res.json(docs)
        })
})

Router.patch('/update/test-drive/status', (req, res, next) => {
    LeadsGeneratedModel.findById(req.body.value)
        .then(doc => {
            if (doc.Author == req.payload.aud) {
                doc.QueryFor.TestDriveStatus = !req.body.isActive
                doc.save(() => { res.sendStatus(200) })
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        doc.QueryFor.TestDriveStatus = !req.body.isActive
                        doc.save(() => { res.sendStatus(200) })
                    })
            }
        })
})

Router.patch('/update/callback-request/status', (req, res, next) => {
    LeadsGeneratedModel.findById(req.body.value)
        .then(doc => {
            if (doc.Author == req.payload.aud) {
                doc.QueryFor.CallBackstatus = !req.body.isActive
                doc.save(() => { res.sendStatus(200) })
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        doc.QueryFor.CallBackstatus = !req.body.isActive
                        doc.save(() => { res.sendStatus(200) })
                    })
            }
        })
})

Router.patch('/update/shipment/status', (req, res, next) => {
    LeadsGeneratedModel.findById(req.body.value)
        .then(doc => {
            if (doc.Author == req.payload.aud) {
                doc.QueryFor.ShipmentStatus = !req.body.isActive
                doc.save(() => { res.sendStatus(200) })
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        doc.QueryFor.ShipmentStatus = !req.body.isActive
                        doc.save(() => { res.sendStatus(200) })
                    })
            }
        })
})

Router.delete('/delete/test-drive', (req, res, next) => {
    LeadsGeneratedModel.findById(req.body.value)
        .then(doc => {
            if (doc.Author != req.payload.aud) {
                doc.QueryFor.TestDrive = !req.body.isActive
                if (doc.QueryFor.TestDrive || doc.QueryFor.CallBack || doc.QueryFor.Shipment) {
                    doc.save(() => { return res.sendStatus(200) })
                } else {
                    doc.remove(() => { res.sendStatus(200) })
                }
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        doc.QueryFor.TestDrive = !req.body.isActive
                        if (doc.QueryFor.TestDrive || doc.QueryFor.CallBack || doc.QueryFor.Shipment) {
                            doc.save(() => { return res.sendStatus(200) })
                        } else {
                            doc.remove(() => { res.sendStatus(200) })
                        }
                    })
            }
        })
})

Router.delete('/delete/callback-request', (req, res, next) => {
    LeadsGeneratedModel.findById(req.body.value)
        .then(doc => {
            if (doc.Author != req.payload.aud) {
                doc.QueryFor.CallBack = !req.body.isActive
                if (doc.QueryFor.TestDrive || doc.QueryFor.CallBack || doc.QueryFor.Shipment) {
                    doc.save(() => { return res.sendStatus(200) })
                } else {
                    doc.remove(() => { res.sendStatus(200) })
                }
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        doc.QueryFor.CallBack = !req.body.isActive
                        if (doc.QueryFor.TestDrive || doc.QueryFor.CallBack || doc.QueryFor.Shipment) {
                            doc.save(() => { return res.sendStatus(200) })
                        } else {
                            doc.remove(() => { res.sendStatus(200) })
                        }
                    })
            }
        })
})

Router.delete('/delete/shipment', (req, res, next) => {
    LeadsGeneratedModel.findById(req.body.value)
        .then(doc => {
            if (doc.Author != req.payload.aud) {
                doc.QueryFor.Shipment = !req.body.isActive
                if (doc.QueryFor.TestDrive || doc.QueryFor.CallBack || doc.QueryFor.Shipment) {
                    doc.save(() => { return res.sendStatus(200) })
                } else {
                    doc.remove(() => { res.sendStatus(200) })
                }
            } else {
                UserModel.findById(req.payload.aud)
                    .then(user => {
                        if (user.Role !== 'admin') return next(createError.Forbidden())
                        doc.QueryFor.Shipment = !req.body.isActive
                        if (doc.QueryFor.TestDrive || doc.QueryFor.CallBack || doc.QueryFor.Shipment) {
                            doc.save(() => { return res.sendStatus(200) })
                        } else {
                            doc.remove(() => { res.sendStatus(200) })
                        }
                    })
            }
        })
})

Router.get('/admin/test-drives', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (!user || user.Role !== 'admin') return next(createError.Forbidden())
            let options = {
                page: req.body.PageNo || 1,
                select: 'createdAt FullName Email Phone VINum Status MakeModel',
                lean: true,
                limit: req.body.SetLimit || 10,
                populate: { path: 'Author', select: 'FirstName LastName Email Phone DealershipEmail DealershipPhone DealershipName _id' },
				sort: { $natural: -1 }
            }

            if (!req.body.Pagination) {
                options.pagination = false
                delete options.limit
            }

            if (req.body.SortData) {
                options.sort = req.body.SortData
            }

            LeadsGeneratedModel.paginate({ 'QueryFor.TestDrive': true }, options)
                .then(docs => {
                    res.json(docs)
                })
        })
})

Router.get('/admin/callback-requests', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (!user || user.Role !== 'admin') return next(createError.Forbidden())
            let options = {
                page: req.body.PageNo || 1,
                select: 'createdAt FullName Email Phone VINum Status MakeModel',
                lean: true,
                limit: req.body.SetLimit || 10,
                populate: { path: 'Author', select: 'FirstName LastName Email Phone DealershipEmail DealershipPhone DealershipName _id' },
				sort: { $natural: -1 }
            }

            if (!req.body.Pagination) {
                options.pagination = false
                delete options.limit
            }

            if (req.body.SortData) {
                options.sort = req.body.SortData
            }

            LeadsGeneratedModel.paginate({ 'QueryFor.CallBack': true }, options)
                .then(docs => {
                    res.json(docs)
                })
        })
})

Router.get('/admin/shipments', (req, res, next) => {
    UserModel.findById(req.payload.aud)
        .then(user => {
            if (!user || user.Role !== 'admin') return next(createError.Forbidden())
            let options = {
                page: req.body.PageNo || 1,
                select: 'createdAt FullName Email Phone VINum Status MakeModel',
                lean: true,
                limit: req.body.SetLimit || 10,
                populate: { path: 'Author', select: 'FirstName LastName Email Phone DealershipEmail DealershipPhone DealershipName _id' },
				sort: { $natural: -1 }
            }

            if (!req.body.Pagination) {
                options.pagination = false
                delete options.limit
            }

            if (req.body.SortData) {
                options.sort = req.body.SortData
            }

            LeadsGeneratedModel.paginate({ 'QueryFor.Shipment': true }, options)
                .then(docs => {
                    res.json(docs)
                })
        })
})
/* Client Management */

module.exports = Router