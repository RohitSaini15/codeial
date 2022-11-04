const Post=require("../models/post");

module.exports.home=function(req,res){

                  // populate user populate comments    // populate user inside comments                 
    Post.find({}).populate("user").populate("comments").populate({path:"comments",populate:{path:"user"}}).exec(function(err,posts){
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