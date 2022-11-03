const Post=require('../models/post')

module.exports.createPost=function(req,res){
    Post.create({content:req.body.content,user:req.user._id},(err,post)=>{
        if(err){
            console.log("error occured in creating post ",err);
        } else console.log(post);

        res.redirect("/")
    })
}