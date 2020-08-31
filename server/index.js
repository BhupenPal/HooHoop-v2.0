const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')

app.use(helmet());
app.use(express.json())

require('./config/database')()

require('dotenv').config({
    path: './config/.env'
})

const morgan = require('morgan')
app.use(morgan('dev'))

app.use('/api/', require('./api/Home.controller'))
app.use('/api/user/', require('./api/User.controller'))
app.use('/api/user/dashboard/', require('./api/Dashboard.controller'))

//Error Handling
app.use(async (req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
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

//Serving Client Side
if (process.env.NODE_ENV === 'DEV') {
    app.use(cors({
        origin: '192.168.1.13:8080'
    }))
} else {
    const path = require('path')
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')))
    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
    })
}

//Heating up the PORT
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`))