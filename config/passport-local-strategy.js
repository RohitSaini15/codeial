const passport=require('passport')
const LocalStrategy=require('passport-local')

const User=require('../models/user')

passport.use(new LocalStrategy({
    usernameField:"email",
    },
    (email,password,done)=>{
        console.log(email,password)
        User.findOne({"email":email},(err,user)=>{
            if(err){ 
                console.log("error in authentication ",err);
                return done(err,false);
            }

            if(!user || user.password!=password){
                console.log("Invalid username and password")
                return done(null,false)
            }

            return done(null,user)
        })
    })
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
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
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }

    next();
}

module.exports=passport
