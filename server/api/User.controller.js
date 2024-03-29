//Dependencies
const express = require("express"),
	Router = express.Router(),
	bcrypt = require("bcrypt"),
	createError = require("http-errors"),
	client = require("../config/redis"),
	axios = require("axios"),
	isMail = require("email-validator"),
	fs = require("fs"),
	ffmpeg = require("ffmpeg"),
	sharp = require("sharp"),

	//MongoDB Models
	UserModel = require("../models/User.model"),
	CarModel = require("../models/Car.model"),

	//Helper and Services
	{ GenerateOTP, HashSalt, GenerateRandom, PassCheck, FormDataBoolCheck, NameWithoutExt } = require("../helper/service"),
	{ signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken, decodeTrustedToken } = require("../helper/auth/JWT_service"),
	{ ValidateGoogle, ValidateFacebook } = require("../helper/auth/OAuth_service"),
	{ SendMail } = require("../helper/mail/config"),
	{ AccActivationMail } = require("../helper/mail/content"),
	{ SendSMS } = require("../helper/sms/config"),
	{ PhoneVerification } = require("../helper/sms/content"),
	{ SecureCookieObj } = require("../helper/auth/CSRF_service"),
	{ uploadFolder } = require("../helper/DigitalOcean/spaces"),

	//Car media upload manager
	CarUpload = require("../helper/upload manager/carupload"),
	UploadValidateFields = require("../helper/upload manager/uploadvalidate")

//Clearing Sharp Cache
sharp.cache(false)

Router.post("/login", async (req, res, next) => {
	try {
		const { Email, Password, LogWithPhone } = req.body
		let User = null

		if (!Email || !Password)
			throw createError.BadRequest("Please fill all the required fields")

		if (LogWithPhone) {
			User = await UserModel.findOne({ Phone: Email })
		} else {
			User = await UserModel.findOne({ Email: Email })
		}

		if (!User) throw createError.NotFound("User does not exist")

		if (!User.EmailVerified)
			throw createError.BadRequest("Please activate your account.")

		if (!User.isActive)
			throw createError.BadRequest("Your account is temporarily deactivated. Please contact HooHoop NZ")

		const isMatch = await bcrypt.compare(Password, User.Password)

		if (!isMatch) throw createError.Forbidden('Password does not match')

		//For making it compatible with JWT_SERVICES
		User.aud = User.id

		const accessToken = await signAccessToken(User)
		const refreshToken = await signRefreshToken(User)

		res.cookie("accessToken", accessToken, { ...SecureCookieObj, maxAge: process.env.ACCESS_TOKEN_EXPIRE_IN })
		res.cookie("refreshToken", refreshToken, { ...SecureCookieObj, maxAge: process.env.REFRESH_TOKEN_EXPIRE_IN })

		const PayLoad = decodeTrustedToken(accessToken)

		return res.status(200).json(PayLoad)
	} catch (error) {
		console.log(error)
		return next(error)
	}
})

Router.post("/googlelogin", ValidateGoogle, (req, res, next) => {
	try {
		const { Email, FirstName, LastName, GoogleID } = req.payload

		UserModel.findOne({ Email })
			.then(async (User) => {
				if (User) {
					if (User.GoogleID === null) {
						User.GoogleID = GoogleID
						User.save()
					}
					//For making it compatible with JWT_SERVICES
					User.aud = User.id
					const accessToken = await signAccessToken(User)
					const refreshToken = await signRefreshToken(User)

					res.cookie("accessToken", accessToken, { ...SecureCookieObj, maxAge: process.env.ACCESS_TOKEN_EXPIRE_IN })
					res.cookie("refreshToken", refreshToken, { ...SecureCookieObj, maxAge: process.env.REFRESH_TOKEN_EXPIRE_IN })

					const PayLoad = decodeTrustedToken(accessToken)

					return res.status(200).json(PayLoad)
				} else {
					return res.status(201).json({ FirstGoogleLogin: true, Email, FirstName, LastName, GoogleID })
				}
			})
	} catch (error) {
		console.log("User Controller Google Login Catch: " + error.message)
		return next(error)
	}
})

Router.post("/facebooklogin", ValidateFacebook, (req, res, next) => {
	try {
		const { Email, FirstName, LastName, FacebookID } = req.payload

		UserModel.findOne({ Email })
			.then(async (User) => {
				if (User) {
					if (User.FacebookID === null) {
						User.FacebookID = FacebookID
						User.save()
					}

					//For making it compatible with JWT_SERVICES
					User.aud = User.id
					const accessToken = await signAccessToken(User)
					const refreshToken = await signRefreshToken(User)

					res.cookie("accessToken", accessToken, { ...SecureCookieObj, maxAge: process.env.ACCESS_TOKEN_EXPIRE_IN })
					res.cookie("refreshToken", refreshToken, { ...SecureCookieObj, maxAge: process.env.REFRESH_TOKEN_EXPIRE_IN })

					const PayLoad = decodeTrustedToken(accessToken)

					return res.status(200).json(PayLoad)
				} else {
					return res.status(201).json({ FirstFacebookLogin: true, Email, FirstName, LastName, GoogleID })
				}
			})
	} catch (error) {
		console.log("User Controller Google Login Catch: " + error.message)
		return next(error)
	}
})

Router.post("/register", async (req, res, next) => {
	try {

		let { FirstName, LastName, Email, Password, cPassword, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, DOB, Gender, GoogleID, FacebookID } = req.body

		if (!FirstName || !LastName || !Email || !Password || !cPassword || !Phone || !State) throw createError.BadRequest("Please fill in all the required fields")

		if (!isMail.validate(Email)) throw createError.BadRequest("Invalid Email")

		if (!PassCheck(Password, cPassword))
			throw createError.BadRequest("Invalid Password")

		if (Role) {
			Role = "dealer"
		} else {
			Role = "user"
			DealershipName = null
			DealershipEmail = null
			DealershipNZBN = null
			DealershipPhone = null
		}

		// Social Media Authentication
		if (!GoogleID) GoogleID = null
		if (FacebookID) FacebookID = null
		if (!Gender) Gender = null
		if (!DOB) DOB = null

		const User = await UserModel.findOne({ $or: [{ Email }, { Phone }] })

		if (User) {
			if (User.Email === Email) throw createError.Conflict('Email already exists')
			if (User.Phone === Phone) throw createError.Conflict('Username already exists')
		}

		const SecretToken = GenerateOTP()
		Password = await HashSalt(Password)

		await new UserModel({ FirstName, LastName, Email, Password, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, SecretToken, GoogleID, FacebookID, Gender, DOB })
			.save()

		SendMail(Email, "HooHoop Account Activation Email", AccActivationMail(FirstName, SecretToken))
		res.sendStatus(200)

	} catch (error) {
		console.log("User Controller Register Catch: " + error.message)
		next(error)
	}
})

Router.get("/refresh-token", verifyRefreshToken, async (req, res, next) => {
	try {
		let accessToken = await signAccessToken(req.payload)
		refreshToken = await signRefreshToken(req.payload)

		res.cookie("accessToken", accessToken, { ...SecureCookieObj, maxAge: process.env.ACCESS_TOKEN_EXPIRE_IN })
		res.cookie("refreshToken", refreshToken, { ...SecureCookieObj, maxAge: process.env.REFRESH_TOKEN_EXPIRE_IN })

		const PayLoad = decodeTrustedToken(accessToken)

		res.status(200).json(PayLoad)
	} catch (err) {
		console.log(err)
		next(err)
	}
})

Router.delete("/logout", verifyRefreshToken, async (req, res, next) => {
	try {
		res.clearCookie("accessToken", SecureCookieObj)
		res.clearCookie("refreshToken", SecureCookieObj)
		client.DEL(req.payload.aud, (err, val) => {
			if (err) {
				console.log(err)
				throw createError.InternalServerError()
			}
			res.sendStatus(204)
		})
	} catch (error) {
		console.log(error)
		next(error)
	}
})

Router.patch("/genmailotp", async (req, res, next) => {
	try {
		const SecretToken = GenerateOTP()
		UserModel.findOne({ Email: req.body.Email }, "-LastName -Password -GoogleID -FacebookID -Gender -Role -isDeleted -updatedAt -PassResetToken")
			.then((user) => {
				if (!user) return next(createError.NotFound("No matching email found"))
				if (user.EmailVerified) return next(createError.Conflict("Email already verified"))
				user.SecretToken = SecretToken
				user.save().then((User) => {
					SendMail(User.Email, "HooHoop Account Activation Email", AccActivationMail(User.FirstName, SecretToken))
					res.sendStatus(200)
				})
			})
	} catch (error) {
		console.log(error.message)
		next(error)
	}
})

Router.patch("/mailactivate", (req, res, next) => {
	try {
		UserModel.findOne({ SecretToken: req.body.value })
			.then((user) => {
				if (!user) {
					return next(createError.BadRequest())
				}
				user.SecretToken = null
				user.EmailVerified = true
				user.save()
				res.sendStatus(201)
			})
	} catch (error) {
		console.log(error.message)
		next(error)
	}
})

Router.patch("/genphoneotp", verifyAccessToken, (req, res, next) => {
	try {
		const SecretToken = GenerateOTP()
		UserModel.findById(req.payload.aud, "-LastName -Password -GoogleID -FacebookID -Gender -Role -isDeleted -updatedAt -PassResetToken")
			.then((user) => {
				if (!user) return next(createError.Forbidden())
				user.SecretToken = SecretToken
				user.save()
				//SENDING SMS TO USER
				if (!SendSMS(user.Phone, PhoneVerification(user.FirstName, SecretToken)))
					return next(createError.BadGateway())
				else res.status(201)
			})
	} catch (error) {
		console.log(error.message)
		next(error)
	}
})

Router.patch("/phoneactivate", verifyAccessToken, (req, res, next) => {
	try {
		const { Phone, SecretToken } = req.body
		UserModel.findOne({ SecretToken }).then((user) => {
			if (!user) {
				throw createError.BadRequest()
			}
			user.Phone = Phone
			user.SecretToken = null
			user.PhoneVerified = true
			user.save()
			res.sendStatus(201)
		})
	} catch (error) {
		console.log(error.message)
		next(error)
	}
})

Router.patch("/forgot-password", async (req, res, next) => {
	try {
		const { Email, FindWithPhone } = req.body
		let User = null

		if (!Email) throw createError.BadRequest("Please enter email or phone number registered with hoohoop")

		if (FindWithPhone) {
			User = await UserModel.findOne({ Phone: Email })
		} else {
			User = await UserModel.findOne({ Email: Email })
		}

		if (!User) throw createError.NotFound("This email/phone is not registered")

		User.PassResetToken = GenerateRandom(12)
		User.save()
			.then(() => {
				SendMail("USER KO TOKEN BHEJNA HAI")
				res.sendStatus(201)
			})
			.catch(() => {
				throw createError.ExpectationFailed()
			})
	} catch (error) {
		console.log(error.message)
		next(error)
	}
})

Router.patch("/forgot-password/confirm", (req, res, next) => {
	const { PassResetToken, Password, cPassword } = req.body

	UserModel.findOne({ PassResetToken }, async (err, doc) => {
		if (!doc) return next(createError.NotFound("Invalid URL"))
		if (!PassCheck(Password, cPassword))
			return next(createError.BadRequest("Invalid Password"))
		Password = await HashSalt(Password)
		doc.Password = Password
		doc.save((err, doc) => {

		})
	})
})

Router.post('/add-user', verifyAccessToken, async (req, res, next) => {
	try {
		if (req.payload.Role !== 'admin') throw createError.Unauthorized()

		const { FirstName, LastName, Email, Password, cPassword, Phone, Address, State, DOB, Gender, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, PhoneVerified, EmailVerified, Credits } = req.body

		const success = await new UserModel({
			FirstName, LastName, Email, Password, cPassword, Phone, Address, State, DOB, Gender, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, PhoneVerified, EmailVerified, Credits
		}).save()


		if (success) {
			return res.sendStatus(200)
		} else {
			throw createError.ExpectationFailed()
		}
	} catch (error) {
		console.log(error)
		return next(error)
	}
})

//Sell Form Routes
Router.get("/car-data-fetch/:CarPlate", verifyAccessToken, async (req, res, next) => {
	try {
		const response = await axios.get(
			`https://carjam.co.nz/a/vehicle:abcd?key=${process.env.CARJAM_API_KEY}&plate=${req.params.CarPlate}`
		)
		res.status(200).send(response.data)
	} catch (error) {
		console.error(error.message)
		next(createError.InternalServerError())
	}
})

Router.post("/sell-form/submit", verifyAccessToken, UploadValidateFields, CarUpload, (req, res, next) => {
	try {
		// FormData can only store USVString or Blobs, .'. no Booleans
		let { Make, Model, ModelYear, Price, MinPrice, Featured, BodyType, DoorCount, SeatCount, Import, VINum, KMsDriven, Color, EngineSize, FuelType, FuelStar, SafetyStar, WOFExpiry, REGExpiry, DriveWheel4, ONRoadCost, Description, isNewCar, Dealer, isExteriorVideo, isExteriorSlider, is360Image, Transmission, Accessories, State } = req.body

		// Booleans to check which data is processed
		const Processed = {
			Interior360: !FormDataBoolCheck(is360Image),
			ExteriorVideo: !FormDataBoolCheck(isExteriorVideo),
			ExteriorSlider: !FormDataBoolCheck(isExteriorSlider),
		}

		// Manipulating Data
		VINum = VINum.toUpperCase()
		Make = Make.toUpperCase()
		Model = Model.toUpperCase()
		DriveWheel4 = FormDataBoolCheck(DriveWheel4)
		ONRoadCost = FormDataBoolCheck(ONRoadCost)

		//Setting up the author
		let Author = req.payload.aud

		const NewCar = new CarModel({ Author, Make, Model, ModelYear, State, Price, MinPrice, Featured, BodyType, DoorCount, SeatCount, Import, VINum, KMsDriven, Color, EngineSize, FuelType, FuelStar, SafetyStar, WOFExpiry, REGExpiry, DriveWheel4, ONRoadCost, Description, isNewCar, Dealer, Transmission, Accessories })

		// Setting Make & Model For Search Box Queries
		NewCar.MakeModel = `${Make} ${Model}`

		// Checking if discrete slider images are present
		if (FormDataBoolCheck(isExteriorSlider)) {
			NewCar.ImageData.SliderCount = req.ExteriorSliderCount

			fs.promises.readdir(`./assets/uploads/cars/${VINum}/exterior/`)
				.then(async files => {
					try {
						return Promise.all(
							files.map(async (CurrentFile, CurrentIndex) => {
								await sharp(`./assets/uploads/cars/${VINum}/exterior/${CurrentFile}`)
									.resize(3200, 1600)
									.jpeg({ quality: 90 })
									.toFile(`./assets/uploads/cars/${VINum}/exterior/Photo_${CurrentIndex + 1}.jpg`)
									.then(() => {
										if (NameWithoutExt(CurrentFile) !== "PHOTO_1") fs.unlinkSync(`./assets/uploads/cars/${VINum}/exterior/${CurrentFile}`)
									})

								// Generating thumbnail using Photo_1
								if (NameWithoutExt(CurrentFile) === "PHOTO_1") {
									await Promise.all([300, 30].map(size => {
										sharp(`./assets/uploads/cars/${VINum}/exterior/${CurrentFile}`)
											.resize(size, size)
											.jpeg({ quality: 90 })
											.toFile(`./assets/uploads/cars/${VINum}/thumbnail/Photo${size}.jpg`)
											.then(() => {
												if (size === 30)
													fs.unlinkSync(`./assets/uploads/cars/${VINum}/exterior/${CurrentFile}`)
											})
									}))
								}
							})
						)
					} catch (err) {
						res.json(createError.InternalServerError())
						console.log(err)
					}
				})
				.then(() => {
					Processed.ExteriorSlider = true

					if (Processed.ExteriorSlider && Processed.ExteriorVideo && Processed.Interior360) {
						// Upload and save car
						NewCar.save()
						uploadFolder(`assets/uploads/cars/${VINum}`, `uploads/cars/${VINum}`)
					}
				})
				.catch((err) => {
					res.json(createError.InternalServerError())
					console.log(err)
				})
		}

		// Checking if Interior 360 Images are present
		if (FormDataBoolCheck(is360Image)) {
			fs.readdir(`./assets/uploads/cars/${VINum}/interior360/`, async (err, CurrentFile) => {
				if (err) {
					res.json(createError.InternalServerError())
					console.log(err)
				}

				NewCar.ImageData.Interior = true

				await sharp(`./assets/uploads/cars/${VINum}/interior360/${CurrentFile[0]}`)
					.resize(3200, 1800)
					.jpeg({ quality: 100 })
					.toFile(`./assets/uploads/cars/${VINum}/interior360/${CurrentFile[0].toLowerCase()}`)
					.then(() => {
						fs.unlinkSync(`./assets/uploads/cars/${VINum}/interior360/${CurrentFile[0]}`)
					})

				Processed.Interior360 = true

				if (Processed.ExteriorSlider && Processed.ExteriorVideo && Processed.Interior360) {
					// Upload and save car
					NewCar.save()

					uploadFolder(`assets/uploads/cars/${VINum}`, `uploads/cars/${VINum}`)
				}
			})
		}

		//Checking if Exterior Video is uploaded
		if (FormDataBoolCheck(isExteriorVideo)) {
			const ExteriorVideoName = req.files.ExteriorVideo[0].filename
			new ffmpeg(`./assets/uploads/cars/${VINum}/exterior360/${ExteriorVideoName}`)
				.then((video) => {
					video.fnExtractFrameToJPG(`./assets/uploads/cars/${VINum}/exterior360/`, {
						frame_rate: 2,
						file_name: "Photo%i",
						keep_pixel_aspect_ratio: true,
						keep_aspect_ratio: false,
						size: "1920x1080",
					},
						(err, files) => {
							if (!err) {
								fs.unlink(`./assets/uploads/cars/${VINum}/exterior360/${ExteriorVideoName}`, async () => {
									//Minus 1 as it also counts the video in files.length
									NewCar.ImageData.VideoFrames = files.length - 1

									// Saving The Car
									NewCar.save()

									//Checking if discrete images are not uploaded and if not then using video to make thumbnail
									if (!FormDataBoolCheck(isExteriorSlider)) {
										await Promise.all([300, 30].map(async (size) => {
											await sharp(`./assets/uploads/cars/${VINum}/exterior360/Photo_1.jpg`)
												.resize(size, size)
												.jpeg({ quality: 90 })
												.toFile(`./assets/uploads/cars/${VINum}/thumbnail/Photo${size}.jpg`)
										}))
											.then(() => {
												// Uploading Entire Frame Folder to Digital Ocean
												uploadFolder(`assets/uploads/cars/${VINum}`, `uploads/cars/${VINum}`)
											})
									} else {
										// Uploading Entire Frame Folder to Digital Ocean
										uploadFolder(`assets/uploads/cars/${VINum}`, `uploads/cars/${VINum}`)
									}
								})
							}
						}
					)
				})
		}

		res.status(200).send("Car upload successful")
	} catch (error) {
		console.log(error)
		next(error)
	}
})

module.exports = Router