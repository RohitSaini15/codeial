const passport = require("passport")
const User = require("../models/user")
const passportJwt = require("passport-jwt").Strategy
const extractJwt = require("passport-jwt").ExtractJwt

var opts={
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "codial"
}

passport.use(new passportJwt(opts,async function(jwtPayload,done){
    try{
        let user = await User.findById(jwtPayload._id)
    
        if ( user ){
            return done(null,user)
        }
        
        return done(null,false)
    } catch(err){
        return done(err,false)
    }
}))

module.exports = passport
