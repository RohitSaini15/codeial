const passport=require('passport')
const LocalStrategy=require('passport-local')
const Post=require("../models/post")

const User=require('../models/user')

passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true
    },
    (req,email,password,done)=>{
        User.findOne({"email":email},(err,user)=>{
            if(err){ 
                req.flash("error",err)
                return done(err,false);
            }
            
            if(!user || user.password!=password){
                req.flash("error","Invalid username/password !")
                return done(null,false)
            }

            return done(null,user)
        })
    })
)

passport.serializeUser((user,done)=>{
    console.log("serialize User")
    // console.log(user.id,user._id)
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    console.log("deserialize User")
     User.findById(id,(err,user)=>{
        if(err){
            console.log("error occured in deserialzing ")
            return done(err,false);
        }
        return done(null,user)
     })
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/auth/signin')
}

passport.setAuthenticatedUser=function(req,res,next){
    // console.log(req.session,req.user)
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next()
}

module.exports=passport
