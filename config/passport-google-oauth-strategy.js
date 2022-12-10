const passport = require("passport")
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user")
const crypto = require("crypto")

const opts = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}

passport.use(new googleStrategy(opts,async function(accessToken,refreshToken,profile,done){

    console.log(profile)

    const user = await User.findOne({"email":profile.emails[0].value})

    if( user ){
        return done(null,user)
    } else{
        const user = await User.create({
            email: profile.emails[0],
            name: profile.displayName,
            password: crypto.randomBytes(20).toString("hex")
        })

        return done(null,user)
    }
}))

module.exports = passport