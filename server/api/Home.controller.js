const express = require('express')
const Router = express.Router()

module.exports = (Router) => {

    Router.get('/api/home', (req, res, next) => {
        console.log('Hello')
    })

}