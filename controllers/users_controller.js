const User=require('../models/user')

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(err){console.log("error occured in finding the sign in user(profile");return;}

            if(user){
                res.render('profile',{
                    title:"User_profile",
                    name:user.name,
                    email:user.email
                })
            } else{
                res.redirect('/auth/signin')
            }
        })
    } 
    else res.redirect('/auth/signin')
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
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){console.log("error in finding user (sign in)");return;}

        if(user){
            if(user.password==req.body.password){
                res.cookie('user_id',user.id);
                res.redirect('/users/profile')
            } else{
                res.redirect('back');
            }
        } else{
            res.redirect('back');
        }
    })
}

module.exports.signout=function(req,res){
    res.cookie('user_id','')
    res.redirect('/auth/signin');
}