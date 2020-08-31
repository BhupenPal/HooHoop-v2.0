const express = require("express")
const Router = express.Router()
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const passport = require('passport')

//Redis and JWT
const client = require('../config/redis')
const jwt = require('jsonwebtoken')

const Nexmo = require('nexmo')
const axios = require('axios')

//Car media upload manager
const CarUpload = require('../helper/upload manager/carupload')

//Pilot is sent to client with status
let Pilot = { status: 'failed', news: [] };

const { PassCheck } = require('../helper/validation')
const { GenerateOTP, HashSalt, FlightReset } = require('../helper/service')
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helper/auth/JWT_service')
const { SendMail } = require('../helper/mail/config')

Router.post("/login", async (req, res, next) => {
    const { Email, Password, LogWithPhone } = req.body;
    let User = null;

    if (!Email || !Password) {
        return res.status(400).json({ news: 'Please fill in all the required fields' })
    }

    if (LogWithPhone) {
        User = await UserModel.findOne({ Phone: Email })
    } else {
        User = await UserModel.findOne({ Email: Email })
    }

    if (!User) {
        return res.status(400).json({ news: 'User does not exist' })
    }

    bcrypt.compare(Password, User.Password, async (err, isMatch) => {
        if (isMatch) {
            const accessToken = await signAccessToken(User)
            const refreshToken = await signRefreshToken(User)
            res.status(200).json({ accessToken, refreshToken })
        } else {
            return res.status(400).json({ news: 'Password does not match' })
        }
    });
});

Router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken)
            return next({ message: 'Bad Request' })
        
        const userId = await verifyRefreshToken(refreshToken)
        const newAccessToken = await signAccessToken(user)
        const newRefreshToken = await signRefreshToken()
    } catch (err) {
        console.log(err)
        next(err)
    }
})

Router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email']
    }
))

Router.get('/auth/google/confirm', passport.authenticate(
    'google',
    {
        failureRedirect: '/user/register'
    }),
    (req, res) => {
        res.redirect('/api');
    }
)

Router.get('/auth/facebook', passport.authenticate(
    'facebook',
    {
        scope: "email"
    }
))

Router.get('/auth/facebook/confirm', passport.authenticate(
    'facebook',
    {
        successRedirect: '/api/',
        failureRedirect: '/api/'
    }
))

Router.post('/logout', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw "EEEROOOR"
        const userId = await verifyRefreshToken(refreshToken.split(' ')[1])
        client.DEL(userId, (err, val) => {
            console.log(userId)
            if (err) {
                console.log(err.message)
                throw 'dont know'
            }
            console.log(val)
            res.sendStatus(200)
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

Router.post("/register", (req, res, next) => {
    FlightReset(Pilot)
    let { FirstName, LastName, Email, Password, cPassword, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN } = req.body;

    if (!FirstName || !LastName || !Email || !Password || !cPassword || !Phone || !State) {
        return res.status(400).json({ news: 'Please fill in all the required fields' })
    }

    if (Pilot.news.length == 0) {
        PassCheck(Password, cPassword, Pilot);
    }

    if (Role) {
        Role = 'dealer'
    } else {
        Role = 'user'
        DealershipName = null
        DealershipEmail = null
        DealershipNZBN = null
        DealershipPhone = null
    }

    if (Pilot.news.length > 0) {
        res.json(Pilot)
    }
    else {
        UserModel.findOne({ Email }, (err, doc) => {
            if (doc) {
                return res.status(409).json({ news: 'Email already exists' })
            } else {
                UserModel.findOne({ Phone }, async (err, doc) => {
                    if (doc) {
                        return res.status(409).json({ news: 'Phone number already exists' })
                    } else {
                        const SecretToken = GenerateOTP(6)
                        const EncryptedCore = await HashSalt(process.env.DEFAULT_CREDIT)
                        Password = await HashSalt(Password)
                        console.log()
                        new UserModel({
                            FirstName, LastName, Email, Password, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, SecretToken, EncryptedCore
                        })
                            .save()
                            .then(async user => {
                                SendMail(Email, 'HooHoop Account Activation Email', 'MSG', Pilot.news)
                                if (Pilot.news > 0) {
                                    return res.json(Pilot)
                                }
                                const accessToken = await signAccessToken(user)
                                const refreshToken = await signRefreshToken(user)
                                res.status(200).json({accessToken, refreshToken})
                            })
                            .catch(err => {
                                console.log(err)
                                Pilot.news.push(err)
                                return res.json(Pilot)
                            })
                    }
                })
            }
        })
    }
});

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