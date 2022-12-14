const mongoose=require("mongoose")

postSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comments:[
        {   
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{
    timestamps:true
})

Post=mongoose.model("Post",postSchema)

module.exports=Post