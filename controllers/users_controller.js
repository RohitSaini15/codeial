const User=require('../models/user')

module.exports.profile=function(req,res){
    res.end('<h1>User Profile Page</h1>')
}

module.exports.posts=function(req,res){
    res.end("<h1>User posts</h1>")
}

module.exports.create=function(req,res){

    if(req.body.password!=req.body.confirm_password) res.redirect('back')

    User.findOne({email:req.body.email},(err,user)=>{
        if(err){console.log("error occured in finding the user(sign up)");return;}

        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log("error occured in creating the user");return;}
                res.redirect('/auth/signin')
            })
        } else{
            res.redirect('back');
        }
    })
}

module.exports.createSession=function(req,res){
    res.redirect('/')
}

