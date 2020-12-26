const JWT = require('jsonwebtoken'),
    createError = require('http-errors'),
    client = require('../../config/redis')

module.exports = {

    signAccessToken: (USER) => {
        return new Promise((resolve, reject) => {
            const Payload = {
                FirstName: USER.FirstName,
                LastName: USER.LastName,
                Email: USER.Email,
                Role: USER.Role,
                DP: USER.DisplayPic
            }
            const secret = process.env.JWT_ACCESS_TOKEN
            const options = {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
                issuer: 'hoohoop.co.nz',
                audience: USER.aud
            }
            JWT.sign(Payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                // There's a space after Bearer
                resolve('Bearer ' + token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.cookies['accessToken']) return next(createError.Unauthorized())

        const BearerToken = req.cookies['accessToken']
        const Token = BearerToken.split(' ')[1]

        JWT.verify(Token, process.env.JWT_ACCESS_TOKEN, (err, payload) => {
            if (err) {
                let message = (err.name === 'JsonWebTokenError') ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken: (USER) => {
        return new Promise((resolve, reject) => {
            const Payload = {
                FirstName: USER.FirstName,
                LastName: USER.LastName,
                Email: USER.Email,
                Role: USER.Role,
                DP: USER.DisplayPic
            }
            const secret = process.env.JWT_REFRESH_TOKEN
            const options = {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
                issuer: 'hoohoop.co.nz',
                audience: USER.aud
            }
            JWT.sign(Payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                client.SET(USER.aud, token, 'EX', process.env.REFRESH_TOKEN_EXPIRE_IN, (err, reply) => {
                    if (err) {
                        console.log(err.message)
                        reject(createError.InternalServerError())
                        return
                    }
                    // There's a space after Bearer
                    resolve('Bearer ' + token)
                })
            })
        })
    },

    verifyRefreshToken: (req, res, next) => {
        if (!req.cookies['refreshToken']) return next(createError.BadRequest())

        const BearerToken = req.cookies['refreshToken']
        const Token = BearerToken.split(' ')[1]

        JWT.verify(Token, process.env.JWT_REFRESH_TOKEN, (err, payload) => {
            if (err) {
                const message = 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.BadRequest(message))
            }
            client.GET(payload.aud, (err, result) => {
                if (err) {
                    console.log(err.message)
                    next(createError.InternalServerError())
                }
                if (Token !== result) return next(createError.BadRequest())
                req.payload = payload
                next()
            })
        })
    },

    decodeTrustedToken: BearerToken => {
        const Token = BearerToken.split(' ')[1]
        return JWT.decode(Token)
    }

}