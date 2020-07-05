const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const UserModel = require('../../models/User.model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            UserModel.findById(jwt_payload.id, '-Password')
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    )

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/user/auth/google/confirm"
        },
            (accessToken, refreshToken, profile, done) => {
                UserModel.findOne({ Email: profile._json.email })
                    .then(doc => {
                        if (doc) {
                            if (doc.GoogleID === null) {
                                doc.SecretToken = null
                                doc.EmailVerified = true
                                doc.GoogleID = profile._json.sub
                                doc.save()
                            }
                            return done(null, doc)
                        } else {
                            new UserModel({
                                Email: profile._json.email,
                                FirstName: profile._json.given_name,
                                LastName: profile._json.family_name,
                                GoogleID: profile._json.sub,
                                EmailVerified: true
                            })
                                .save()
                                .then(user => {
                                    return done(null, user)
                                })
                        }
                    })
                    .catch(err => console.log(err));
            })
    )

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FB_CLIENT_ID,
                clientSecret: process.env.FB_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/api/user/auth/facebook/confirm",
                profileFields: ["id", "displayName", "photos", "email", "gender", "name"]
            },
            (accessToken, refreshToken, profile, done) => {
                UserModel.findOne({ Email: profile._json.email })
                .then(doc => {
                    if(doc) {
                        if (doc.FacebookID === null) {
                            doc.SecretToken = null
                            doc.EmailVerified = true
                            doc.FacebookID = profile._json.id
                            doc.save()
                        }
                        return done(null, doc)
                    } else {
                        new UserModel({
                            Email: profile._json.email,
                            FirstName: profile._json.first_name,
                            LastName: profile._json.last_name,
                            GoogleID: profile._json.id,
                            EmailVerified: true
                        })
                            .save()
                            .then(user => {
                                return done(null, user)
                            })
                    }
                })
                .catch(err => console.log(err));
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        UserModel.findById(id).then((user) => {
            user.Password = null
            user.DealershipNZBN = null
            done(null, user)
        })
    })
}