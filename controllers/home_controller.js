const Post=require("../models/post")

module.exports.home=function(req,res){

    Post.find({}).populate("user").exec(function(err,posts){
        if(err){
            console.log("error occured in finding post");
            return res.render('home',{
                title:"Home",
                posts:[]
            })
        }
        res.render('home',{
            title:"Home",
            posts:posts
        })
    })
}