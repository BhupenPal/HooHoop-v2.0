const express = require('express'),
    app = express(),
    createError = require('http-errors'),
    compression = require('compression'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors')

app.use(helmet(), express.json(), compression(), morgan('dev'))

require('dotenv').config({
    path: './config/.env'
})

require('./config/database')

app.use('/api/', require('./api/Home.controller'))
app.use('/api/user/', require('./api/User.controller'))
app.use('/api/user/dashboard/', require('./api/Dashboard.controller'))

if (process.env.NODE_ENV === 'DEV') {
    app.use(cors({ origin: '192.168.1.8:8080' }))
} else {
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

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`))