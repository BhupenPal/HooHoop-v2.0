const csurf = require('csurf')

module.exports = {

    csrfProtection: csurf({
        cookie: {
            key: 'X-CSRF-Token',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PROD',
            sameSite: process.env.NODE_ENV === 'PROD'
        }
    }),

    // For making AUTH Cookies (mainly) secure
    SecureCookieObj: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: process.env.NODE_ENV === 'PROD',
        signed: process.env.NODE_ENV === 'PROD'
    }

}