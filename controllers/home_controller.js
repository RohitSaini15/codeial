const Post=require("../models/post");
const User=require("../models/user")

module.exports.home=async function(req,res){
    try{
                      // populate user populate comments    // populate user inside comments                 
        let posts=await Post.find({}).sort("-createdAt").populate("user").populate({path:"comments",populate:{path:"user"}})
        let users=await User.find({})
        
        // render sends the html page in the string form
        res.render('home',{
            title:"Home",
            posts:posts,
            profile_users:users
        })                 
    } catch(err){
        console.log("error ocurred in home_controller ",err)
        res.render('home',{
            title:"Home",
            posts:[],
            profile_users:[]
        })
    }
}