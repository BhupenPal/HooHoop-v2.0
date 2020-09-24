//Dependencies
const express = require("express"),
    Router = express.Router(),
    bcrypt = require('bcrypt'),
    createError = require('http-errors'),
    client = require('../config/redis'),
    axios = require('axios'),
    isMail = require('email-validator'),

    //MongoDB Models
    UserModel = require('../models/User.model'),

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
                console.log(User.Password)
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
Router.get('/car-data-fetch/:CarPlate', async (req, res, next) => {
    try {
        const response = await axios.get(`https://carjam.co.nz/a/vehicle:abcd?key=${process.env.CARJAM_API_KEY}&plate=${req.params.CarPlate}`);
        res.statusCode(200).send(response.data);
    } catch (error) {
        console.error(error.message);
        next(createError.InternalServerError())
    }
})

Router.post('/sell-form/submit', CarUpload, (req, res, next) => {

})

module.exports = Router;