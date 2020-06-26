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

    if (User.isActive !== true) {
        return res.status(400).json({ news: 'Please activate your account first' })
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
                    console.log(token)
                    res.status(200).json({ 
                        token: 'Bearer ' + token,
                        user: Payload
                    })
                }
            )
        } else {
            return res.status(400).json({ news: 'Incorrect Password'})
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
                                console.log(err)
                                Pilot.news.push(err)
                                res.json(Pilot)
                            })
                    }
                })
            }
        })
    }
});

module.exports = Router;
