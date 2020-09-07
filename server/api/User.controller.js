const express = require("express"),
    Router = express.Router(),
    UserModel = require('../models/User.model'),
    bcrypt = require('bcrypt'),
    createError = require('http-errors'),
    client = require('../config/redis'),
    jwt = require('jsonwebtoken'),
    Nexmo = require('nexmo'),
    axios = require('axios'),
    isMailValid = require('email-validator')

//Car media upload manager
const CarUpload = require('../helper/upload manager/carupload')

const { PassCheck } = require('../helper/validation')
const { GenerateOTP, HashSalt } = require('../helper/service')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helper/auth/JWT_service')
const { SendMail } = require('../helper/mail/config')

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

        bcrypt.compare(Password, User.Password, async (err, isMatch) => {
            if (!isMatch) throw createError.Unauthorized('Password does not match')
            else {
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

        if (!isMailValid(Email)) throw createError.BadRequest('Invalid Email')

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
            if (doc) throw createError.conflict('Email already exists')
            UserModel.findOne({ Phone }, async (err, doc) => {
                if (doc) throw createError.conflict('Phone number already exists')
                const SecretToken = GenerateOTP(6)
                const EncryptedCore = await HashSalt(process.env.DEFAULT_CREDIT)
                Password = await HashSalt(Password)
                new UserModel({
                    FirstName, LastName, Email, Password, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, SecretToken, EncryptedCore
                })
                    .save()
                    .then(async user => {
                        SendMail(Email, 'HooHoop Account Activation Email', 'MSG')
                        const accessToken = await signAccessToken(user)
                        const refreshToken = await signRefreshToken(user)
                        res.status(200).json({ accessToken, refreshToken })
                    })
                    .catch(err => {
                        throw createError.ExpectationFailed()
                    })

            })
        })

    } catch (error) {
        console.log('User Controller Register Catch: ' + error.message)
        next(error)
    }
});

Router.post('/refresh-token', async (req, res, next) => {
    try {
        let { refreshToken } = req.body
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
            console.log(val)
            res.sendStatus(204)
        })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

Router.patch('/genmailotp', verifyAccessToken, (req, res, next) => {
    FlightReset(Pilot)
    const SecretToken = GenerateOTP(6)
    UserModel.findById(req.user._id)
        .then(user => {
            if (user) {
                user.SecretToken = SecretToken
                user.save()

                SendMail(Email, 'HooHoop Account Activation Email', Pilot.news)

                if (Pilot.news > 0) {
                    return res.json(Pilot)
                } else {
                    Pilot.status = 'success'
                    res.json(Pilot)
                }
            } else {
                Pilot.news.push('No user found')
                res.json(Pilot)
            }
        })
})

Router.patch('/mailactivate', verifyAccessToken, (req, res, next) => {
    FlightReset(Pilot)
    UserModel.findOne({ SecretToken: req.body.value })
        .then(user => {
            if (!user) {
                Pilot.news.push('Token Not Valid')
                return res.json(Pilot)
            }
            user.SecretToken = null
            user.EmailVerified = true
            user.save()
            Pilot.status = 'success'
            return res.json(Pilot)
        })
})

Router.patch('/genphoneotp', verifyAccessToken, (req, res, next) => {
    FlightReset(Pilot)
    const SecretToken = GenerateOTP()
    UserModel.findById(req.user._id)
        .then(user => {
            if (user) {
                user.SecretToken = SecretToken
                user.save()

                //SENDING SMS TO USER
                const nexmo = new Nexmo({
                    apiKey: process.env.NEXMO_KEY,
                    apiSecret: process.env.NEXMO_SECRET
                });
                const from = 'HooHoop NZ';
                const to = '919587551153';
                const text = `Thank you for using HooHoop. You phone verification code is ${SecretToken}`;
                nexmo.message.sendSms(from, to, text, (err, responseData) => {
                    console.log(responseData)
                    if (err) {
                        console.log(err);
                    } else {
                        if (responseData.messages[0]['status'] === "0") {
                            console.log("Message sent successfully.");
                        } else {
                            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                        }
                    }
                });

                Pilot.status = 'success'
                res.json(Pilot)
            } else {
                Pilot.news.push('No user found')
                res.json(Pilot)
            }
        })
})

Router.patch('/phoneactivate', verifyAccessToken, (req, res, next) => {
    FlightReset(Pilot)
    UserModel.findOne({ SecretToken: req.body.value })
        .then(user => {
            if (!user) {
                Pilot.news.push('Token Not Valid')
                return res.json(Pilot)
            }
            user.SecretToken = null
            user.PhoneVerified = true
            user.save()
            Pilot.status = 'success'
            return res.json(Pilot)
        })
})


//Sell Form Routes
Router.get('/car-data-fetch/:CarPlate', async (req, res, next) => {
    try {
        const response = await axios.get(`https://carjam.co.nz/a/vehicle:abcd?key=${process.env.CARJAM_API_KEY}&plate=${req.params.CarPlate}`);
        res.status(200).send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error')
    }
})

Router.post('/sell-form/submit', CarUpload, (req, res, next) => {

})

module.exports = Router;