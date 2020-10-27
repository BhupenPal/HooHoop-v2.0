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
                expiresIn: 5,
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
                audience: USER.aud
            }
            JWT.sign(Payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                    return
                }
                client.SET(USER.aud, token, 'EX', 31536000, (err, reply) => {
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
        if (!req.cookies['refreshToken']) return next(createError.Unauthorized())

        const BearerToken = req.cookies['refreshToken']
        const Token = BearerToken.split(' ')[1]

        JWT.verify(Token, process.env.JWT_REFRESH_TOKEN, (err, payload) => {
            if (err) {
                const message = 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            client.GET(payload.aud, (err, result) => {
                if (err) {
                    console.log(err.message)
                    next(createError.InternalServerError())
                }
                if (Token !== result) return next(createError.Unauthorized(message))
                req.payload = payload
                next()
            })
        })
    },

    decodeToken: (authHeader) => {
        return new Promise((resolve, reject) => {
            if (!authHeader) {
                resolve(false)
                return
            }
            const secret = process.env.JWT_ACCESS_TOKEN
            const Token = authHeader.split(' ')[1]
            JWT.verify(Token, secret, (err, payload) => {
                if (err) resolve(false)
                resolve(payload)
            })
        })
    },

    decodeTrustedToken: BearerToken => {
        const Token = BearerToken.split(' ')[1]
        return JWT.decode(Token)
    }

}