//Dependencies
const express = require('express'),
    Router = express.Router(),
    createError = require('http-errors'),
    axios = require('axios'),
    mongoose = require('mongoose'),

    //MongoDB Models
    TxnModel = require('../models/Transaction.model.js'),
    //Helper and Services
    { verifyAccessToken } = require('../helper/auth/JWT_service')

Router.post('/addcredits', verifyAccessToken, (req, res, next) => {
    try {
        const { Amount, CardDetails, Address, SavedCard } = req.body;

        const PayLoad = {
            type: 'purchase',
            amount: Amount,
            amountSurcharge: 0,
            currency: 'NZD',
            clientType: 'internet'
        }

        new TxnModel({
            Type: 'Credits Added To User Account',
            Amount: Amount,
            User: mongoose.Types.ObjectId(req.payload.aud),

        })
            .save()
            .then((doc) => {

                PayLoad.merchantReference = doc._id
                PayLoad.notificationUrl = `/txn_result/${doc._id}`

                if (!!CardDetails) {
                    PayLoad.Card = CardDetails
                }

                if (!!Address) {
                    PayLoad.avs = {
                        ...Address,
                        avsAction: 0
                    }
                }

                if (!!SavedCard) {

                }

                axios.post(`https://${process.env.WINDCAVE_ENV}.windcave.com/api/v1/transactions`, PayLoad)
                    .then()
                    .catch()
            })
            .catch()
    } catch (error) {

    }
})

Router.post('/txn_result/:TransactID', (req, res, next) => {

})

module.exports = Router;