//Dependencies
const express = require('express'),
	Router = express.Router(),
	createError = require('http-errors'),
	axios = require('axios'),
	mongoose = require('mongoose'),
	checkoutNodeJssdk = require('@paypal/checkout-server-sdk'),

	//MongoDB Models
	TxnModel = require('../models/Transaction.model.js'),
	UserModel = require('../models/User.model.js'),

	//Helper and Services
	{ verifyAccessToken } = require('../helper/auth/JWT_service'),
	{ PaypalClient } = require('../helper/payment/paypal')

Router.post('/addcredits', verifyAccessToken, (req, res, next) => {
	const { Amount, UserID, OrderID } = req.body;

	const PayLoad = {
		Type: 'Credits added to account',
		Amount: Amount,
		User: mongoose.Types.ObjectId(UserID)
	}

	if (Amount < 0) {
		PayLoad.Type = 'Deducted by Hoohoop NZ'
	}

	if (req.payload.Role !== 'admin') {
		// Call PayPal to get the transaction details of incoming OrderID
		let request = new checkoutNodeJssdk.orders.OrdersGetRequest(OrderID);

		let order;
		try {
			order = await payPalClient.client().execute(request);
		} catch (err) {
			console.error(err);
			return res.send(500);
		}

		// 5. Validate the transaction details are as expected
		if (order.result.purchase_units[0].amount.value !== Amount.toFixed(2).toString()) {
			PayLoad.Status = 'Not verified by Paypal then declined by Hoohoop'
			res.json(createError.Conflict('Transaction declined by HooHoop'))
		}
	}

	new TxnModel(PayLoad)
		.save()
		.then(() => {
			if (PayLoad.Status == 'Not verified by Paypal then declined by Hoohoop') {
				return res.json(createError.Conflict('Payment rejected by server'))
			}
			UserModel
				.findByIdAndUpdate(UserID, { $inc: { Credits: Amount } })
				.then(() => {
					res.sendStatus(200)
				})
		})
		.catch((error) => {
			console.log(error)
			res.sendStatus(200)
		})
})

Router.post('/txn_result/:TransactID', (req, res, next) => {

})

module.exports = Router;