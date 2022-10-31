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
