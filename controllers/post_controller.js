const Post=require('../models/post')
const Comment=require("../models/comment")

module.exports.createPost=async function(req,res){
    try{
        let post=await Post.create({content:req.body.content,user:req.user._id})
        console.log(post)
    } catch(err){
        console.log("error occured in creating post ",err);
    }
    res.redirect("/")
   
}

module.exports.deletePost=async function(req,res){

    try{
        let post=await Post.findById(req.params.id)

        if(post.user == req.user.id){    
            await post.deleteOne()
            await Comment.deleteMany({post:post._id})
        } 
    } catch(err){
        console.log("error in deleting post ",err)
    }

    res.redirect("back")
    
}