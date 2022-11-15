const Post=require('../models/post')
const Comment=require("../models/comment")

module.exports.createPost=async function(req,res){
    try{
        let post=await Post.create({content:req.body.content,user:req.user._id})
        post=await post.populate("user")
        if(req.xhr){
            // req.flash("success","Post created! ")
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created !"
            })
        }

        req.flash("success","Post created! ")
    } catch(err){
        req.flash("error",err)
    }
    res.redirect("/")
}

module.exports.deletePost=async function(req,res){

    try{
        let post=await Post.findById(req.params.id)

        if(post.user == req.user.id){    
            await post.deleteOne()
            await Comment.deleteMany({post:post._id})

            if(req.xhr){
                // req.flash("success","Post deleted")
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted !"
                })
            }

            req.flash("success","Post deleted")
        } else{
            req.flash("error","You are not authorized to delete post")
        } 
    } catch(err){
        req.flash("error",err)
    }

    res.redirect("back")
    
}