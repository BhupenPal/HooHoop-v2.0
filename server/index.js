const express = require('express'),
    app = express(),
    createError = require('http-errors'),
    compression = require('compression'),
    helmet = require('helmet')

app.use(helmet(), express.json(), compression())

require('dotenv').config({
    path: './config/.env'
})

require('./config/database')

app.use('/api/', require('./api/Home.controller'))
app.use('/api/user/', require('./api/User.controller'))
app.use('/api/user/dashboard/', require('./api/Dashboard.controller'))
app.use('/api/chatbot', require('./api/Chatbot.controller'))

if (process.env.NODE_ENV === 'DEV') {
    const morgan = require('morgan'),
        cors = require('cors')
    app.use(morgan('dev'), cors({ origin: `${process.env.HOST_IP}:8080` }))
} 

if (process.env.NODE_ENV === 'PROD') {
    const { resolve } = require('path')
    app.use(express.static(resolve(__dirname, '..', 'dist')))
    app.use('*', (req, res) => {
        res.sendFile(resolve(__dirname, '..', 'dist', 'index.html'))
    })
}

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`))