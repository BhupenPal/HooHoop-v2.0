const JWT = require('jsonwebtoken')
const client = require('../../config/redis')

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
                    reject("Internal Server Error")
                }
                resolve('Bearer ' + token)
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization'])
            return next({
                status: 500,
                message: 'Unauthorized Request'
            })
        
        const authHeader = req.headers['authorization']
        const Token = authHeader.split(' ')[1]
        
        JWT.verify(Token, process.env.JWT_ACCESS_TOKEN, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError')
                    return next({
                        status: 500,
                        message: 'Unauthorized Request'
                    })
                else
                    return next({
                        status: 500,
                        message: err.message
                    })
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
                Email: USER.Email
            }
            const secret = process.env.JWT_REFRESH_TOKEN
            const options = {
                expiresIn: '1y',
                issuer: 'hoohoop.co.nz',
                audience: USER.id
            }
            JWT.sign(Payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject("Internal Server Error")
                }
                client.SET(USER.id, token, 'EX', 31536000, (err, reply) => {
                    if (err) {
                        console.log(err)
                        reject('Internal server error')
                        return
                    }
                    resolve('Bearer ' + token)
                })
            })
        }) 
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, payload) => {
                console.log(err)
                if (err) return reject('Unautorized')
                const userId = payload.aud
                client.GET(userId, (err, result) => {
                    console.log(userId)
                    if (err) {
                        console.log(err.message)
                        reject('Internal Server Error')
                        return
                    }

                    if (refreshToken === result) return resolve(userId)
                    reject('Unauthorized')
                })
            })
        })
    }

}