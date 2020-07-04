const express = require('express')
const Router = express.Router()
const ContactModel = require('../models/Contact.model')

Router.get('/', (req, res, next) => {
    res.json({ Successful: true })
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