module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    res.render('signup',{title:"sign up"})
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    res.render('signin',{title:"sign in"})
}

module.exports.signout=function(req,res){
    req.logout((err)=>{
        if(err){
            console.log("error in logout")
            return res.redirect('/');
        }
        req.flash("success","You have logged out! ")
        return res.redirect("/auth/signin")
    });
}