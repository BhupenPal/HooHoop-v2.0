const express = require("express");
const Router = express.Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Nexmo = require('nexmo')

//Pilot is sent to client with status
let Pilot = { status: 'failed', news: [] };

const { PassCheck } = require('../helper/validation')
const { GenerateOTP, HashSalt, FlightReset } = require('../helper/service')
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

    bcrypt.compare(Password, User.Password, (err, isMatch) => {
        if (isMatch) {
            const Payload = {
                id: User._id,
                FirstName: User.FirstName,
                LastName: User.LastName,
                Email: User.Email
            }
            jwt.sign(
                Payload,
                process.env.JWTSECRET,
                {
                    expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                    res.status(200).json({
                        token: 'Bearer ' + token,
                        user: Payload
                    })
                }
            )
        } else {
            return res.status(400).json({ news: 'Incorrect Password' })
        }
    });
});

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
        UserModel.findOne({ Email: Email }, (err, doc) => {
            if (doc) {
                return res.status(400).json({ news: 'Email already exists' })
            } else {
                UserModel.findOne({ Phone: Phone }, async (err, doc) => {
                    if (doc) {
                        return res.status(400).json({ news: 'Phone number already exists' })
                    } else {
                        const SecretToken = GenerateOTP(6)
                        Password = await HashSalt(Password)
                        new UserModel({
                            FirstName, LastName, Email, Password, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, SecretToken
                        })
                            .save()
                            .then(user => {
                                SendMail(Email, 'HooHoop Account Activation Email', Pilot.news)
                                if (Pilot.news > 0) {
                                    return res.json(Pilot)
                                }
                                const Payload = {
                                    id: user._id,
                                    FirstName: user.FirstName,
                                    LastName: user.LastName,
                                    Email: user.Email
                                }
                                jwt.sign(
                                    Payload,
                                    process.env.JWTSECRET,
                                    {
                                        expiresIn: 31556926, // 1 year in seconds
                                    },
                                    (err, token) => {
                                        res.status(200).json({
                                            token: 'Bearer ' + token,
                                            user: Payload
                                        })
                                    }
                                )
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

Router.patch('/genmailotp', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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

Router.patch('/mailactivate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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

Router.patch('/genphoneotp', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    FlightReset(Pilot)
    const SecretToken = GenerateOTP()
    UserModel.findById(req.user._id)
        .then(user => {
            if (user) {
                user.SecretToken = SecretToken
                user.save()

                //SENDING SMS TO USER
                const nexmo = new Nexmo({
                    apiKey: '1042695d',
                    apiSecret: 'ihmMDCYkK6oAlhD9',
                });
                const from = 'HooHoop NZ';
                const to = '64211143347';
                const text = `Thank you for using HooHoop. You phone verification code is ${SecretToken}`;
                nexmo.message.sendSms(from, to, text, (err, responseData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if(responseData.messages[0]['status'] === "0") {
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

Router.patch('/phoneactivate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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

module.exports = Router;