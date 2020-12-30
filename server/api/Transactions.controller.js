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

Router.use(verifyAccessToken)

Router.get('/latest-five', (req, res, next) => {
	TxnModel.find({ User: mongoose.Types.ObjectId(req.payload.aud) })
		.sort({ $natural: -1 })
		.limit(5)
		.select('Type Amount createdAt')
		.lean()
		.then((doc) => {
			return res.json(doc)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

Router.get('/all/:PageNo/:size', (req, res, next) => {
	const { SortData } = req.query
	let { PageNo, size } = req.params,

	// Making Sure Page Number IS NOT LESS THAN OR EQUAL TO 0
	const PageNo = Math.max(1, PageNo)

	let options = {
		page: PageNo || 1,
		select: 'TID Type Amount Status createdAt',
		lean: true,
		limit: size || 15,
		sort: { $natural: -1 }
	}

	// Basic Filter For All Queries
	let Filters = {
		User: mongoose.Types.ObjectId(req.payload.aud)
	}

	// Sorting Data
	if (SortData === 'LatestFirst') options.sort = { createdAt: -1 }
	else if (SortData === 'OldestFirst') options.sort = { createdAt: 1 }

	TxnModel.paginate(Filters, options)
		.then((doc) => {
			return res.json(doc)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

Router.post('/addcredits', async (req, res, next) => {
	const { Amount, UserID, OrderID } = req.body

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
		const request = new checkoutNodeJssdk.orders.OrdersGetRequest(OrderID),
			order = await PaypalClient.client().execute(request);

		// 5. Validate the transaction details are as expected
		if (order.result.purchase_units[0].amount.value !== Amount.toFixed(2).toString()) {
			PayLoad.Status = 'Not verified by Paypal then declined by Hoohoop'
			res.json(createError.Conflict('Transaction declined by HooHoop'))
		}
	}

	new TxnModel(PayLoad)
		.save()
		.then(() => {
			if (PayLoad.Status !== 'Not verified by Paypal then declined by Hoohoop') {
				UserModel
					.findByIdAndUpdate(UserID, { $inc: { Credits: Amount } })
					.then(() => {
						return res.sendStatus(200)
					})
			}
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError('Please contact HooHoop'))
		})
})

module.exports = Router