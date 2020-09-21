const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),
    UserModel = require('../models/User.model'),
    CarModel = require('../models/Car.model'),
    { verifyAccessToken } = require('../helper/auth/JWT_service')

Router.get('/profile', verifyAccessToken, (req, res, next) => {
    try {
        UserModel.findById(req.payload.aud, '-Password -GoogleID -FacebookID -Gender -Role -_id -isDeleted -EncryptedCore -updatedAt -SecretToken -PassResetToken')
            .then(user => {
                if (!user) return next(createError.Forbidden())
                res.status(201).json(user)
            })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

Router.get('/listings', verifyAccessToken, (req, res, next) => {
    try {
        CarModel.find({ 'Author.ID': req.payload.aud })
            .then(cars => {
                if (!cars) return res.status(204).send()
                res.json(cars)
            })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

// Complete Car Listing For Admin
Router.get('/all-listings', verifyAccessToken, (req, res, next) => {
    try {
        UserModel.findById(req.payload.aud, '-Password -GoogleID -FacebookID -Gender -Role -_id -isDeleted -EncryptedCore -updatedAt -SecretToken -PassResetToken')
            .then(user => {
                if (user.Role !== 'admin') return next(createError.NotFound())
                CarModel.find({ 'Author.ID': req.payload.aud })
                    .then(cars => {
                        if (!cars) return res.status(204).send()
                        res.json(cars)
                    })
            })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

//Complete User Listing For Admin 
Router.get('/all-users', verifyAccessToken, (req, res, next) => {
    try {
        UserModel.findById(req.payload.aud, '-Password -GoogleID -FacebookID -Gender -Role -_id -isDeleted -EncryptedCore -updatedAt -SecretToken -PassResetToken')
            .then(user => {
                if (user.Role !== 'admin') return next(createError.NotFound())
                UserModel.find()
                    .then(users => {
                        if (!users) return res.status(204).send()
                        res.json(users)
                    })
            })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})



module.exports = Router