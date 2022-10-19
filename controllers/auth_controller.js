module.exports.signup=function(req,res){
    res.render('signup',{
        title:"SIGNUP"
    })
}

module.exports.signin=function(req,res){
    res.render('signin',{
        title:'SIGNIN'
    })
}
