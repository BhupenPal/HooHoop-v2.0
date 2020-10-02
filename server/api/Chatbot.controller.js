//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),

    //MongoDB Models
    ChatbotModel = require('../models/Chatbot.model'),

    //Helper and Services
    { GenerateOTP } = require('../helper/service'),
    { verifyAccessToken } = require('../helper/auth/JWT_service'),
    { SendMail } = require('../helper/mail/config'),
    { SendSMS } = require('../helper/sms/config'),
    { ChatBotOffer } = require("../helper/sms/content");

Router.post('/chatbot/genphoneotp', (req, res, next) => {
    try {
        const { MakeModel, VINum, SecretToken, Phone } = req.body
        const SecretToken = GenerateOTP()
        if (SendSMS(Phone, ChatBotOffer(MakeModel, VINum, SecretToken))) {
            //Using Discount to store OTP until the deal is done 
            new ChatbotModel({ Discount: SecretToken, 'NotRegisteredUser.Phone': Phone, isTemp: true })
                .save()
                .then(doc => {
                    res.status(200).send(doc._id)
                })
        } else {
            return next(createError.BadGateway())
        }
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

module.exports = Router;