const express = require('express'),
    Router = express.Router(),
    ContactModel = require('../models/Contact.model'),
    CarModel = require('../models/Car.model')

const { RandomChar, GenerateOTP } = require('../helper/service')
const { SendMail } = require('../helper/mail/config')

Router.get('/', async (req, res, next) => {
    const currentYear = (new Date).getFullYear()
    const usedCars = await CarModel.find({ ModelYear: {$lte: currentYear - 1} }).limit(10)
    const recentCars = await CarModel.find({ ModelYear: currentYear }).limit(10)
    const sedanType = await CarModel.find({ BodyType: 'Sedan' }).limit(10)
    const hatchbackType = await CarModel.find({ BodyType: 'Hatchback' }).limit(10)
    const suvType = await CarModel.find({ BodyType: 'SUV' }).limit(10)
    const under5K = await CarModel.find({ Price: {$lte: 5000} }).limit(10)
    const under10K = await CarModel.find({ Price: {$gt: 5000, $lte: 10000} }).limit(10)
    const above10K = await CarModel.find({ Price: {$gt: 10000} }).limit(10)

    res.send({ usedCars, recentCars, sedanType, hatchbackType, suvType, under5K, under10K, above10K })
})

Router.post('/contact-us', async (req, res, next) => {
    const { FullName, Email, Subject, Message } = req.body
    const ComplaintNum = 'HHC' + RandomChar() + GenerateOTP()
    new ContactModel({
        ComplaintNum,
        FullName,
        Email,
        Subject,
        Message
    })
    .save()
    .then( () => {
        SendMail(Email, 'Your query has been registered with hoohoop', 'MAILHTML HERE')
        res.statusCode(201)
    })
})

module.exports = Router