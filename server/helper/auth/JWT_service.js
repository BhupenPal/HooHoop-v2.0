const JWT = require('jsonwebtoken'),
    createError = require('http-errors'),
    client = require('../../config/redis')

module.exports = {

    signAccessToken: (USER) => {
        return new Promise((resolve, reject) => {
            const Payload = {
                FirstName: USER.FirstName,
                LastName: USER.LastName,
                Email: USER.Email
            }
            const secret = process.env.JWT_ACCESS_TOKEN
            const options = {
                expiresIn: '1h',
                issuer: 'hoohoop.co.nz',
                audience: USER.id
            }
            JWT.sign(Payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized())
        
        const authHeader = req.headers['authorization']
        const Token = authHeader.split(' ')[1]
        
        JWT.verify(Token, process.env.JWT_ACCESS_TOKEN, (err, payload) => {
            if (err) {
                const message = 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken: (USER) => {
        return new Promise((resolve, reject) => {
            const Payload = {}
            const secret = process.env.JWT_REFRESH_TOKEN
            const options = {
                expiresIn: '1y',
                issuer: 'hoohoop.co.nz',
                audience: USER.id
            }
            JWT.sign(Payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                client.SET(USER.id, token, 'EX', 31536000, (err, reply) => {
                    if (err) {
                        console.log(err.message)
                        reject(createError.InternalServerError())
                        return
                    }
                    resolve(token)
                })
            })
        }) 
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            const secret = process.env.JWT_REFRESH_TOKEN
            JWT.verify(refreshToken, secret, (err, payload) => {
                if (err) return reject(createError.Unauthorized())
                const userId = payload.aud
                client.GET(userId, (err, result) => {
                    if (err) {
                        console.log(err.message)
                        reject('Internal Server Error')
                        return
                    }
                    if (refreshToken === result) return resolve(payload)
                    reject(createError.Unauthorized())
                })
            })
        })
    }

}