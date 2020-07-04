const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

require('./config/database')()

require('dotenv').config({
    path: './config/.env'
})

const morgan = require('morgan')
app.use(morgan('dev'))

const passport = require('passport')
app.use(passport.initialize())
require('./helper/auth/passport')(passport);

app.use('/api/', require('./api/Home.controller'))
app.use('/api/user/', require('./api/User.controller'))
app.use('/api/user/dashboard/', require('./api/Dashboard.controller'))

//Serving Client Side
if(process.env.NODE_ENV === 'DEV') {
    app.use(cors({
        origin: 'localhost:8080'
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