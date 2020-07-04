const express = require('express')
const Router = express.Router()
const ContactModel = require('../models/Contact.model')
const CarModel = require('../models/Car.model')

Router.get('/', async (req, res, next) => {
    const allcars = await CarModel.find().limit(25)
    console.log(allcars)
    res.json(allcars)
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
    .then(doc => {
        console.log('saved')
    })
})

module.exports = Router