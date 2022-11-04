const Comment=require("../models/comment")
const Post=require("../models/post")

module.exports.createComment=function(req,res){
    Comment.create({
        content:req.body.content,
        user:req.user._id,
        post:req.query.post_id
    },(err,comment)=>{
        if(err){
            console.log("error occured in creating comment ",err)
            res.redirect("back")
        }
        else{
            Post.updateOne({"_id":req.query.post_id},{"$push":{"comments":[comment._id]}},(err,result)=>{
                if(err){
                    console.log("error ocurrend in putting comment id in post")
                } else{
                    console.log(result);
                }
                res.redirect("back")
            })
        }
    })
}