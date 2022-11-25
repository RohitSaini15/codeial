const Post=require("../../../models/post")

module.exports.index=async function(req,res){

    const posts = await Post.find({}).sort("-createdAt").populate("user").populate({path:"comments",populate:{path:"user"}})

    res.json(200,{
        "message":"Post received",
        "posts":posts
    })
}

module.exports.delete=async function(req,res){
    try{
        const post = await Post.findById(req.params.id)

        if(post.user != req.user.id){
            return res.json(401,{
                message:"You are unauthorized to delete "
            })
        }

        await Post.deleteOne({id:req.params.id})
        await Comment.deleteMany({post:req.params.id})

        res.json(200,{
            message:"Post deleted"
        })

    } catch(err){
        console.log(err)
        res.json(500,{
            "message":"Internal Server Error"
        })
    }
}