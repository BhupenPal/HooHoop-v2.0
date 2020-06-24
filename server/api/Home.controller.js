const express = require('express')
const Router = express.Router()

Router.get('/home', (req, res, next) => {
    console.log('accessed')
    res.json({ Successful: true })
})

module.exports = Router