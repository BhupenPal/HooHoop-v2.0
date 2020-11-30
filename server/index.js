const express = require('express'),
	app = express(),
	createError = require('http-errors'),
	compression = require('compression'),
	helmet = require('helmet'),
	cookieParser = require('cookie-parser'),
	{ csrfProtection } = require('./helper/auth/CSRF_service')

app.use(helmet(), express.json(), compression(), cookieParser(process.env.COOKIE_SECRET))

//CSRF AUTHENTICATION
app.delete('*', csrfProtection)
app.patch('*', csrfProtection)
app.post('*', csrfProtection)
app.put('*', csrfProtection)

require('dotenv').config({
	path: './config/.env.prod'
})

// Initializing Database
require('./config/database')

// Initializing Cron Jobs
require('./helper/CronJobs')

// Request Logging and CORS Handling
if (process.env.NODE_ENV === 'DEV') {
	const morgan = require('morgan'),
		cors = require('cors')
	app.use(
		morgan('dev'),
		cors({ origin: `${process.env.HOST_IP}:${process.env.CLIENT_PORT}` })
	)
}

// WEB APP ROUTES
app.use('/api/', require('./api/Home.controller'))
app.use('/api/user/', require('./api/User.controller'))
app.use('/api/user/dashboard/', require('./api/Dashboard.controller'))
app.use('/api/chatbot', require('./api/Chatbot.controller'))
app.use('/api/transactions', require('./api/Transactions.controller'))

app.use((req, res, next) => {
	next(createError.NotFound())
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.send({
		error: {
			status: err.status || 500,
			message: err.message
		}
	})
})

const PORT = process.env.PORT
app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`))

process.env.NODE_ENV === 'DEV' ? (module.exports = app) : null