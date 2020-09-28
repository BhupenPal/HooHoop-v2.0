const { connected } = require("process");

//Dependencies
const express = require("express"),
    Router = express.Router(),
    bcrypt = require('bcrypt'),
    createError = require('http-errors'),
    client = require('../config/redis'),
    axios = require('axios'),
    isMail = require('email-validator'),
    fs = require('fs'),
    ffmpeg = require("ffmpeg"),
    sharp = require("sharp"),

    //MongoDB Models
    UserModel = require('../models/User.model'),
    CarModel = require('../models/Car.model'),

    //Helper and Services
    { PassCheck } = require('../helper/validation'),
    { GenerateOTP, HashSalt, GenerateRandom } = require('../helper/service'),
    { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helper/auth/JWT_service'),
    { SendMail } = require('../helper/mail/config'),
    { AccActivationMail } = require("../helper/mail/content"),
    { SendSMS } = require('../helper/sms/config'),
    { PhoneVerification } = require("../helper/sms/content"),

    //Car media upload manager
    CarUpload = require('../helper/upload manager/carupload');

//Clearing Sharp Cache
sharp.cache(false);

Router.post("/login", async (req, res, next) => {
    try {
        const { Email, Password, LogWithPhone } = req.body;
        let User = null;

        if (!Email || !Password) throw createError.BadRequest('Please fill all the required fields')

        if (LogWithPhone) {
            User = await UserModel.findOne({ Phone: Email })
        } else {
            User = await UserModel.findOne({ Email: Email })
        }

        if (!User) throw createError.NotFound('User does not exist')

        if (!User.EmailVerified) throw createError.BadRequest('Please activate your account.')

        bcrypt.compare(Password, User.Password, async (err, isMatch) => {
            if (!isMatch) return next(createError.Unauthorized('Password does not match'))
            else {
                //For making it compatible with JWT_SERVICES
                User.aud = User.id
                const accessToken = await signAccessToken(User)
                const refreshToken = await signRefreshToken(User)
                res.status(200).json({ accessToken, refreshToken })
            }
        })
    } catch (error) {
        console.log('User Controller Login Catch: ' + error.message)
        next(error)
    }
})

Router.post("/register", (req, res, next) => {
    try {
        let { FirstName, LastName, Email, Password, cPassword, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN } = req.body;

        if (!FirstName || !LastName || !Email || !Password || !cPassword || !Phone || !State) throw createError.BadRequest('Please fill in all the required fields')

        if (!isMail.validate(Email)) throw createError.BadRequest('Invalid Email')

        if (!PassCheck(Password, cPassword)) throw createError.BadRequest('Invalid Password')

        if (Role) {
            Role = 'dealer'
        } else {
            Role = 'user'
            DealershipName = null
            DealershipEmail = null
            DealershipNZBN = null
            DealershipPhone = null
        }

        UserModel.findOne({ Email }, (err, doc) => {
            if (doc) return next(createError.Conflict('Email already exists'))
            UserModel.findOne({ Phone }, async (err, doc) => {
                if (doc) return next(createError.Conflict('Phone number already exists'))
                const SecretToken = GenerateOTP(6)
                const EncryptedCore = await HashSalt(process.env.DEFAULT_CREDIT)
                Password = await HashSalt(Password)
                new UserModel({
                    FirstName, LastName, Email, Password, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, SecretToken, EncryptedCore
                })
                    .save()
                    .then(() => {
                        SendMail(Email, 'HooHoop Account Activation Email', AccActivationMail(FirstName, SecretToken))
                        res.sendStatus(200)
                    })
                    .catch(err => {
                        console.log(err)
                        throw createError.ExpectationFailed()
                    })
            })
        })
    } catch (error) {
        console.log('User Controller Register Catch: ' + error.message)
        next(error)
    }
})

Router.post('/refresh-token', async (req, res, next) => {
    try {
        let { refreshToken } = req.body
        refreshToken = refreshToken.split(' ')[1]

        if (!refreshToken) throw createError.BadRequest()

        const user = await verifyRefreshToken(refreshToken)

        let accessToken = await signAccessToken(user)
        refreshToken = await signRefreshToken(user)

        res.status(200).send({ accessToken, refreshToken })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

Router.delete('/logout', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const user = await verifyRefreshToken(refreshToken.split(' ')[1])
        client.DEL(user.aud, (err, val) => {
            if (err) {
                console.log(err.message)
                throw createError.InternalServerError()
            }
            res.sendStatus(204)
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

Router.patch('/mailactivate', (req, res, next) => {
    try {
        UserModel.findOne({ SecretToken: req.body.value })
            .then(user => {
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

Router.patch('/genphoneotp', verifyAccessToken, (req, res, next) => {
    try {
        const SecretToken = GenerateOTP()
        UserModel.findById(req.payload.aud, '-LastName -Password -GoogleID -FacebookID -Gender -Role -isDeleted -EncryptedCore -updatedAt -PassResetToken')
            .then(user => {
                if (!user) return next(createError.Forbidden())
                user.SecretToken = SecretToken
                user.save()
                //SENDING SMS TO USER
                if (!SendSMS(user.Phone, PhoneVerification(user.FirstName, SecretToken)))
                    return next(createError.BadGateway())
                else
                    res.status(201)
            })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

Router.patch('/phoneactivate', verifyAccessToken, (req, res, next) => {
    try {
        const { Phone, SecretToken } = req.body;
        UserModel.findOne({ SecretToken })
            .then(user => {
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

Router.patch('/forgot-password', async (req, res, next) => {
    try {
        const { Email, FindWithPhone } = req.body;
        let User = null;

        if (!Email) throw createError.BadRequest('Please enter email or phone number registered with hoohoop')

        if (FindWithPhone) {
            User = await UserModel.findOne({ Phone: Email })
        } else {
            User = await UserModel.findOne({ Email: Email })
        }

        if (!User) throw createError.NotFound('This email/phone is not registered')

        User.PassResetToken = GenerateRandom(12)
        User.save()
            .then(() => {
                SendMail('USER KO TOKEN BHEJNA HAI')
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

Router.patch('/forgot-password/confirm', (req, res, next) => {
    const { PassResetToken, Password, cPassword } = req.body

    UserModel.findOne({ PassResetToken }, async (err, doc) => {
        if (!doc) return next(createError.NotFound('Invalid URL'))
        if (!PassCheck(Password, cPassword)) return next(createError.BadRequest('Invalid Password'))
        Password = await HashSalt(Password)
        doc.Password = Password
        doc.save()
            .then(() => {

            })
            .catch(() => {

            })
    })

})

//Sell Form Routes
Router.get('/car-exist-check', verifyAccessToken, (req, res, next) => {
    CarModel.findOne({ VINum: req.body.VINum }, (err, doc) => {
        if (err) return next(createError.ExpectationFailed())
        if (!doc) return res.sendStatus(200)
        if (doc) return next(createError.ExpectationFailed())
    })
})

Router.get('/car-data-fetch/:CarPlate', verifyAccessToken, async (req, res, next) => {
    try {
        const response = await axios.get(`https://carjam.co.nz/a/vehicle:abcd?key=${process.env.CARJAM_API_KEY}&plate=${req.params.CarPlate}`);
        res.send(response.data);
    } catch (error) {
        console.error(error.message);
        next(createError.InternalServerError())
    }
})

Router.post('/sell-form/submit', verifyAccessToken, CarUpload, (req, res, next) => {
    try {
        let { Make, Model, ModelYear, Price, MinPrice, Featured, BodyType, DoorCount, SeatCount, Import, VINum, KMsDriven, Color, EngineSize, FuelType, SafetyStar, WOFExpiry, REGExpiry, DriveWheel4, ONRoadCost, Description, isNewCar, Dealer, isExteriorVideo, isExteriorSlider, is360Images, Transmission } = req.body;

        // Manipulating Data
        VINum = VINum.toUpperCase()
        Make = Make.toUpperCase()
        Model = Model.toUpperCase()

        //Setting up the author
        let ExteriorVideoName = req.files.ExteriorVideo[0].filename,
            Author = req.payload.aud,
            TotalFrames = null;

        const NewCar = new CarModel({
            Author, Make, Model, ModelYear, Price, MinPrice, Featured, BodyType, DoorCount, SeatCount, Import, VINum, KMsDriven, Color, EngineSize, FuelType, SafetyStar, WOFExpiry, REGExpiry, DriveWheel4, ONRoadCost, Description, isNewCar, Dealer, TotalFrames, isExteriorVideo, Transmission, isExteriorSlider, is360Images
        })

        //Checking if Exterior Video is uploaded
        if (isExteriorVideo) {
            new ffmpeg(`./assets/uploads/cars/${VINum}/exterior360/${ExteriorVideoName}`)
                .then((video) => {
                    video.fnExtractFrameToJPG(`./assets/uploads/cars/${VINum}/exterior360/`, {
                        frame_rate: 2,
                        file_name: "Photo%i",
                        keep_pixel_aspect_ratio: true,
                        keep_aspect_ratio: false,
                        size: "1920x1080",
                    }, (err, files) => {
                        if (!err) {
                            fs.unlink(`./assets/uploads/cars/${VINum}/exterior360/${ExteriorVideoName}`, () => {
                                //Checking if discrete images are not uploaded and if not then using video to make thumbnail
                                if (!isExteriorSlider) {
                                    [300, 30].map(async (size) => {
                                        await sharp(`./assets/uploads/cars/${VINum}/exterior360/Photo_1.jpg`)
                                            .resize(size, size)
                                            .jpeg({ quality: 90 })
                                            .toFile(`./assets/uploads/cars/${vinNum}/thumbnail/Photo${size}.jpg`);
                                    })
                                }
                                //Minus 1 as it also counts the video in files.length
                                NewCar.TotalFrames = files.length - 1
                                NewCar.save()
                            })
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (is360Images) {
            fs.readdir(`./assets/uploads/cars/${VINum}/interior360/`, (err, files) => {
                files.forEach(async CurrentFile => {
                    await sharp(`./assets/uploads/cars/${VINum}/interior360/${CurrentFile}`)
                        .resize(3200, 1600)
                        .jpeg({ quality: 100 })
                        .toFile(`./assets/uploads/cars/${VINum}/interior360/${CurrentFile.toLowerCase()}`, () => {
                            fs.unlinkSync(`./assets/uploads/cars/${VINum}/interior360/${CurrentFile}`)
                        })
                })
            })
        }

        if (isExteriorSlider) {
            //Compress Images Here
        }

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = Router;