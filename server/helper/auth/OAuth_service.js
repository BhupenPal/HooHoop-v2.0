// Dependencies
const { OAuth2Client } = require('google-auth-library'),
    createError = require('http-errors');

const Google_Client = new OAuth2Client(
    process.env.Google_Client_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
)

module.exports = {

    ValidateGoogle: (req, res, next) => {
        const { tokenId } = req.body

        Google_Client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
            .then(response => {
                if (!response.payload.email_verified) throw new Error('Google OAuth Invalidated')
                if (response.payload.aud !== process.env.GOOGLE_CLIENT_ID) throw new Error('Google OAuth Invalidated')
                const payload = {
                    Email: response.payload.email,
                    FirstName: response.payload.given_name,
                    LastName: response.payload.family_name,
                    GoogleID: response.payload.sub
                }
                req.payload = payload
                next()
            })
            .catch(error => {
                console.log(error)
                next(createError.Unauthorized(error.message))
            })

    }

}