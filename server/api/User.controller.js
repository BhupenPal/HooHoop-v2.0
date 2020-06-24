const express = require("express");
const Router = express.Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Pilot is sent to client with status
let Pilot = { status: 'failed', news: [] };

const { PassCheck } = require('../helper/validation')
const { GenerateRandom, HashSalt, FlightReset } = require('../helper/service')
const { SendMail } = require('../helper/mail/config')

Router.post("/login", async (req, res, next) => {
    FlightReset(Pilot)

    try {
        const { Email, Password, LogWithPhone } = req.body;
        let User = null;

        if (LogWithPhone) {
            User = await UserModel.findOne({ Phone: Email })
        } else {
            User = await UserModel.findOne({ Email: Email })
        }

        if (!User) {
            Pilot.news.push('Email does not exist')
            return res.json(Pilot)
        }

        if (User.isActive !== true) {
            Pilot.news.push('Please activate your account first')
            return res.json(Pilot)
        }

        bcrypt.compare(Password, User.Password, (err, isMatch) => {
            if (isMatch) {
                const PayLoad = {
                    id: User._id,
                    name: User.FirstName
                }
                jwt.sign(
                    PayLoad,
                    'THIS_IS_A_SUPERSECRET',
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                )
            } else {
                Pilot.news.push('Password Incorrect')
                return res.json(Pilot);
            }
        });

    } catch (err) {
        Pilot.news.push(err)
        res.json(Pilot)
    }
});

Router.post("/register", (req, res, next) => {
    FlightReset(Pilot)

    try {
        let { FirstName, LastName, Email, Password, cPassword, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN } = req.body;

        if (!FirstName || !LastName || !Email || !Password || !cPassword || !Phone || !State) {
            Pilot.news.push("Please fill in all the required fields");
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
                    Pilot.news.push("Email already exists")
                    res.json(Pilot)
                } else {
                    UserModel.findOne({ Phone: Phone }, async (err, doc) => {
                        if (doc) {
                            Pilot.news.push("Phone number already exists")
                            res.json(Pilot)
                        } else {
                            const SeceretToken = GenerateRandom(32)
                            Password = await HashSalt(Password)
                            new UserModel({
                                FirstName, LastName, Email, Password, Phone, Address, State, Role, DealershipName, DealershipEmail, DealershipPhone, DealershipNZBN, SeceretToken
                            })
                                .save()
                                .then(user => {
                                    SendMail(Email, 'HooHoop Account Activation Email', Pilot.news)
                                    if (Pilot.news > 0) {
                                        res.json(Pilot)
                                        return
                                    }
                                    Pilot.status = 'success'
                                    res.json(Pilot)
                                })
                                .catch(err => {
                                    Pilot.news.push(err)
                                    res.json(Pilot)
                                })
                        }
                    })
                }
            })
        }

    } catch (err) {
        Pilot.news.push(err)
        res.json(Pilot)
    }
});

module.exports = Router;
