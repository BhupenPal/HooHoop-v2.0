const express = require('express')
const Router = express.Router()
const passport = require('passport')

//Protecting all dashboard routes
Router.use(passport.authenticate('jwt', { session: false }))

Router.get('/', (req, res, next) => {
    FlightReset(Pilot)
    res.json(req.user)
})

module.exports = Router