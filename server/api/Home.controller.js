//Dependencies
const express = require('express'),
	Router = express.Router(),
	createError = require('http-errors'),
	mongoose = require('mongoose'),

	//MongoDB Models
	ContactModel = require('../models/Contact.model'),
	CarModel = require('../models/Car.model'),
	LeadsGeneratedModel = require('../models/GeneratedLead.model'),
	UserModel = require('../models/User.model'),
	VirtualTour = require('../models/VirtualTour.model'),

	//Helper and Services
	{ GenerateOTP, SearchRegex, RangeBasedFilter } = require('../helper/service'),
	{ verifyAccessToken, decodeTrustedToken } = require('../helper/auth/JWT_service'),
	{ csrfProtection } = require('../helper/auth/CSRF_service'),
	{ SendMail } = require('../helper/mail/config'),
	{ ContactMail } = require('../helper/mail/content');

Router.get('/', (req, res, next) => {
	const DataToFetch = {
		Make: '$Make',
		Model: '$Model',
		Price: '$Price',
		ViewsCount: '$ViewsCount',
		VINum: '$VINum'
	}
	CarModel.aggregate([
		{
			$sort: {
				'createdAt': -1
			}
		},
		{
			$match: {
				isActive: true
			}
		},
		{
			$group: {
				_id: null,
				usedCars: {
					$push: {
						$cond: [{
							$lte: ['$ModelYear', 2019]
						},
							DataToFetch, '$$REMOVE'
						]
					}
				},
				recentCars: {
					$push: {
						$cond: [{
							$eq: ['$ModelYear', 2020]
						}, DataToFetch, '$$REMOVE']
					}
				},
				suvType: {
					$push: {
						$cond: [{
							$eq: ['$BodyType', 'SUV']
						}, DataToFetch, '$$REMOVE']
					}
				},
				hatchbackType: {
					$push: {
						$cond: [{
							$eq: ['$BodyType', 'Hatchback']
						}, DataToFetch, '$$REMOVE']
					}
				},
				sedanType: {
					$push: {
						$cond: [{
							$eq: ['$BodyType', 'Sedan']
						}, DataToFetch, '$$REMOVE']
					}
				},
				under5K: {
					$push: {
						$cond: [{
							$lt: ['$Price', 5000]
						}, DataToFetch, '$$REMOVE']
					}
				},
				under10K: {
					$push: {
						$cond: [{
							$and: [{
								$gt: ['$Price', 5000]
							}, {
								$lte: ['$Price', 10000]
							}]
						}, DataToFetch, '$$REMOVE']
					}
				},
				above10K: {
					$push: {
						$cond: [{
							$gt: ['$Price', 10000]
						}, DataToFetch, '$$REMOVE']
					}
				}
			}
		},
		{
			$project: {
				_id: 0,
				usedCars: {
					"$slice": ["$usedCars", 10]
				},
				recentCars: {
					"$slice": ["$recentCars", 10]
				},
				suvType: {
					"$slice": ["$suvType", 10]
				},
				hatchbackType: {
					"$slice": ["$hatchbackType", 10]
				},
				sedanType: {
					"$slice": ["$sedanType", 10]
				},
				under5K: {
					"$slice": ["$under5K", 10]
				},
				under10K: {
					"$slice": ["$under10K", 10]
				},
				above10K: {
					"$slice": ["$above10K", 10]
				}
			}
		}
	])
		.then((doc) => { return res.json(...doc) })
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

Router.get('/csrf-token', csrfProtection, (req, res, next) => {
	res.cookie('X-XSRF-Token', req.csrfToken(), { sameSite: true, secure: process.env.COOKIE_MODE === 'PROD' })
	return res.sendStatus(200)
})

Router.post('/contact', (req, res, next) => {
	const { FullName, Email, Subject, Message } = req.body
	const ComplaintNum = GenerateOTP()
	new ContactModel({
		ComplaintNum,
		FullName,
		Email,
		Subject,
		Message
	})
		.save()
		.then(() => {
			SendMail('contact@hoohoop.co.nz', `#${ComplaintNum}: ${Subject}`, ContactMail(Email, Subject, FullName, Message))
			return res.sendStatus(200)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

// TO BE CHECKED FOR IMPROVIZATIONS
// Currently assuming that token is trusted
Router.get('/buy-car/:PageNo/:size?', async (req, res, next) => {
	const { Price, BodyType, FuelType, SearchedCar, KMsDriven, ModelYear, SortData, Make, Model, Transmission, Color, State } = req.query
	let { PageNo, size } = req.params,
		UserID = null

	// Decoding authorization to check user and getting ObjectID
	if (req.cookies['accessToken']) {
		UserID = decodeTrustedToken(req.cookies['accessToken'])
		UserID = mongoose.Types.ObjectId(UserID.aud)
	}

	// Making Sure Page Number IS NOT LESS THAN OR EQUAL TO 0
	PageNo = Math.max(1, PageNo)

	let options = {
		page: PageNo || 1,
		select: 'Make Model ModelYear Price State BodyType FuelType KMsDriven ViewsCount VINum LikedBy',
		lean: true,
		limit: size || 15,
		sort: { $natural: -1 }
	}

	// Basic Filter For All Queries
	let Filters = {
		isActive: true
	}

	// Selected Filters
	if (Make) Filters.Make = Make
	if (Color) Filters.Color = Color
	if (Model) Filters.Model = Model
	if (State) Filters.State = State
	if (FuelType) Filters.FuelType = FuelType
	if (BodyType) Filters.BodyType = BodyType
	if (Transmission) Filters.Transmission = Transmission
	if (Price) Filters.Price = RangeBasedFilter(Price)
	if (KMsDriven) Filters.KMsDriven = RangeBasedFilter(KMsDriven)
	if (ModelYear) Filters.ModelYear = RangeBasedFilter(ModelYear)

	// Sorting Data
	if (SortData === 'CheapestFirst') options.sort = { Price: 1 }
	else if (SortData === 'ExpensiveFirst') options.sort = { Price: -1 }
	else if (SortData === 'OldestFirst') options.sort = { createdAt: 1 }

	// For Search Field Make Model VINum
	if (SearchedCar) {
		const RegExCar = new RegExp(SearchRegex(SearchedCar), 'gi')
		Filters.$or = [{ VINum: RegExCar }, { MakeModel: RegExCar }]
	}

	CarModel.paginate(Filters, options)
		.then((cars) => {
			cars.docs.map(vehicle => {
				vehicle.LikedBy = vehicle.LikedBy.some(CurrentObjID => {
					return CurrentObjID == UserID ? true : false
				})
			})
			return res.json(cars)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

// TO CHECKED. It adds a 'false' value to the array
Router.patch('/wish-handle', verifyAccessToken, async (req, res, next) => {
	try {
		const { VINum } = req.body

		const LikedCar = await CarModel.findOne({ VINum })
		const User = await UserModel.findById(req.payload.aud)

		if (!LikedCar || !User) throw createError.BadRequest()

		if (LikedCar.LikedBy.includes(req.payload.aud)) {
			LikedCar.LikedBy.pull(req.payload.aud)
			User.WishList.pull(VINum)
		} else {
			LikedCar.LikedBy.push(req.payload.aud)
			User.WishList.push(VINum)
		}

		LikedCar.save()
		User.save()

		return res.sendStatus(200)
	} catch (error) {
		console.log(error)
		next(error)
	}
})

Router.get('/car/:VINum', (req, res, next) => {
	const { VINum } = req.params
	let UserID = null

	// Decoding authorization to check user and getting ObjectID
	if (req.cookies['accessToken']) {
		UserID = decodeTrustedToken(req.cookies['accessToken'])
		UserID = mongoose.Types.ObjectId(UserID.aud)
	}

	const RemovedData = '-Featured.validTill -Featured.transactiondId ' + ((!UserID) ? '-Author' : '-Featured.validTill')

	CarModel.findOneAndUpdate({ VINum }, { $inc: { ViewsCount: 1 } }, { upsert: true })
		.select(RemovedData)
		.populate('Author', 'FirstName LastName Phone Email')
		.lean()
		.exec()
		.then(doc => {
			if (!doc) return next(createError.BadRequest())

			// Checking if user has liked that car or not
			const LikedBy = doc.LikedBy.some(CurrentObjID => {
				return CurrentObjID == UserID ? true : false
			})

			return res.json({ ...doc, LikedBy })
		})
})

Router.get('/recommended-cars/:CurrentPrice', (req, res, next) => {
	const { CurrentPrice } = req.params
	const Suggested = { Price: null }

	if (CurrentPrice <= 5000) {
		Suggested.Price = { $lte: 5000 }
	} else if (CurrentPrice <= 10000) {
		Suggested.Price = { $gt: 5000, $lte: 10000 }
	} else {
		Suggested.Price = { $gt: 10000 }
	}

	CarModel.aggregate([
		{
			$sort: {
				'createdAt': -1
			}
		},
		{
			$match: {
				isActive: true,
				...Suggested
			}
		},
		{
			$sample: { size: 10 }
		},
		{
			$project: {
				_id: 0,
				Make: 1,
				Model: 1,
				Price: 1,
				ViewsCount: 1,
				VINum: 1
			}
		}
	])
		.then((doc) => {
			return res.json(doc)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

Router.post('/car/leads/submission', verifyAccessToken, (req, res, next) => {
	const { FullName, Phone, WantsToTrade, CallbackQuery, ShipmentQuery, TestDriveQuery, MakeModel, VINum } = req.body;

	const Data = {
		FullName: FullName,
		Email: req.payload.Email,
		Phone: Phone,
		QueryFor: {},
		Author: mongoose.Types.ObjectId(req.payload.aud),
		MakeModel: MakeModel,
		VINum: VINum
	}

	Data.QueryFor.TestDrive = (TestDriveQuery) ? true : false
	Data.QueryFor.CallBack = (CallbackQuery) ? true : false
	Data.QueryFor.Shipment = (ShipmentQuery) ? true : false
	Data.WantsToTrade = (WantsToTrade) ? true : false

	new LeadsGeneratedModel(Data)
		.save()
		.then(() => {
			return res.sendStatus(200)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

Router.get('/virtual-tours/:PageNo/:size?', async (req, res, next) => {
	const { SortData, State, SearchedTour } = req.query
	let { PageNo, size } = req.params

	// Making Sure Page Number IS NOT LESS THAN OR EQUAL TO 0
	PageNo = Math.max(1, PageNo)

	let options = {
		page: PageNo || 1,
		select: 'Name State Partner isActive State Brand APID',
		lean: true,
		limit: size || 15,
		sort: { $natural: -1 }
	}

	// Basic Filter For All Queries
	let Filters = {
		isActive: true
	}

	// Selected Filters
	if (State) Filters.State = State

	// Sorting Data
	if (SortData === 'CheapestFirst') options.sort = { Price: 1 }
	else if (SortData === 'ExpensiveFirst') options.sort = { Price: -1 }
	else if (SortData === 'OldestFirst') options.sort = { createdAt: 1 }

	// For Search Field Make Model VINum
	if (SearchedTour) {
		const RegExTour = new RegExp(SearchRegex(SearchedTour), 'gi')
		Filters.$or = [{ Name: RegExTour }]
	}

	VirtualTour.paginate(Filters, options)
		.then((tours) => {
			console.log(tours)
			return res.json(tours)
		})
		.catch((error) => {
			console.log(error)
			return next(createError.InternalServerError())
		})
})

module.exports = Router