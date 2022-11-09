const Comment=require("../models/comment")
const Post=require("../models/post")

module.exports.createComment=async function(req,res){

    try{
        let comment=await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.query.post_id
        })

        let result=await Post.updateOne({"_id":req.query.post_id},{"$push":{"comments":[comment._id]}})

    } catch(err){
        console.log("error occured in creating comment ",err)
    }

    res.redirect("back")
}

module.exports.deleteComment=async function(req,res){

    try{
        let comment=await Comment.findById(req.params.id)
        if(req.user.id == comment.user){
            await comment.deleteOne()
            let result=await Post.updateOne({"_id":comment.post},{"$pull":{"comments":req.params.id}})
        }
    } catch(err){
        console.log("error ocurrend in deleting comment id in post ",err)
    }

    res.redirect("back")
}