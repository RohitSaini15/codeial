const e = require("connect-flash")
const Comment=require("../models/comment")
const Post=require("../models/post")

// const commentMailer = require("../mailers/comment_mailer")
const queue = require("../config/kue")
const commentEmailWorker = require("../workers/comment_email_worker")

module.exports.createComment=async function(req,res){

    try{
        let comment=await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.query.post_id
        })

        await comment.populate("user")

        let result=await Post.updateOne({"_id":req.query.post_id},{"$push":{"comments":[comment._id]}})

        // commentMailer.newComment(comment)

        let job = queue.create("emails",comment).save((err)=>{
            if(err){
                console.log(`error occured in creating job ${err}`)
                return
            }

            console.log(`job id is ${job.id}`)
        })

        if(req.xhr){
            // req.flash("success","Comment created !")
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"Comment created !"
            })
        }

        req.flash("success","Comment created !")

    } catch(err){
        console.log(err)
        req.flash("error",err)
    }

    res.redirect("back")
}

module.exports.deleteComment=async function(req,res){

    try{
        let comment=await Comment.findById(req.params.id)
        if(req.user.id == comment.user){
            await comment.deleteOne()
            let result=await Post.updateOne({"_id":comment.post},{"$pull":{"comments":req.params.id}})

            if(req.xhr){
                // req.flash("success","Comment deleted !")
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"Comment deleted !"
                })
            }

            req.flash("success","Comment deleted !")
        } else{
            req.flash("error","You are not authorized to delete comment !")
        }
    } catch(err){
        req.flash("error",err)
    }

    res.redirect("back")
}