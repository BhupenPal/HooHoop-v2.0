// Dependencies
const { OAuth2Client } = require('google-auth-library'),
    createError = require('http-errors'),
    axios = require('axios');

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
                console.log(response)
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

    },

    ValidateFacebook: (req, res, next) => {
        const { accessToken, userID } = req.body,
            FBGraphURI = `https://graph.facebook.com/v2.11/${userID}/?fields=id,first_name,last_name,email,gender,birthday,location&access_token=${accessToken}`;

        axios.get(FBGraphURI)
            .then(response => {
                if (!response.data.id) throw new Error('Facebook OAuth Invalidated')
                const payload = {
                    Email: response.data.email,
                    FirstName: response.data.first_name,
                    LastName: response.data.last_name,
                    FacebookID: response.payload.id,
                    DOB: response.payload.birthday,

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