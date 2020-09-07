const express = require('express')
const Router = express.Router()
const ContactModel = require('../models/Contact.model')
const CarModel = require('../models/Car.model')

Router.get('/', async (req, res, next) => {
    const currentYear = (new Date).getFullYear()
    const usedCars = await CarModel.find({ ModelYear: {$lte: currentYear - 1} }).limit(10)
    const recentCars = await CarModel.find({ ModelYear: currentYear }).limit(10)
    const sedanType = await CarModel.find({ BodyType: 'Sedan' }).limit(10)
    const hatchbackType = await CarModel.find({ BodyType: 'Hatchback' }).limit(10)
    const suvType = await CarModel.find({ BodyType: 'SUV' }).limit(10)
    const under5K = await CarModel.find({ Price: {$lte: 5000} }).limit(10)
    const under10K = await CarModel.find({ Price: {$lte: 10000} }).limit(10)
    const above10K = await CarModel.find({ Price: {$gt: 10000} }).limit(10)

    res.send({ usedCars, recentCars, sedanType, hatchbackType, suvType, under5K, under10K, above10K })
})

Router.post('/contact-us', (req, res, next) => {
    const {FullName, Email, Subject, Message} = req.body
    new ContactModel({
        FullName,
        Email,
        Subject,
        Message
    })
    .save()
    .then( () => {
        res.statusCode(201)
    })
})

module.exports = Router