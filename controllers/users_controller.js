const User=require('../models/user')
const path=require("path")
const fs=require("fs")

module.exports.profile=async function(req,res){
    try{
        let user=await User.findById(req.params.id)
        res.render("profile",{individual_user:user})
    } catch(err){
        console.log("error occured in loading user in profile ",err)
        return res.redirect("/")
    }
}

module.exports.posts=function(req,res){
    res.end("<h1>User posts</h1>")
}

module.exports.create=async function(req,res){

    if(req.body.password!=req.body.confirm_password) res.redirect('back')

    try{
        let user=await User.findOne({email:req.body.email})

        if(!user){
            await User.create(req.body)
            return res.redirect('/auth/signin')
        }
    } catch(err){
        console.log("error occured in finding the user(sign up)")
    }

    res.redirect("back")
}

module.exports.createSession=function(req,res){
    req.flash("success","Logged in Succesfully")
    res.redirect('/')
}

module.exports.updateUser=async function(req,res){
    if(req.user.id == req.params.id){
        try{
            // let user=await User.findByIdAndUpdate(req.params.id,req.body)
            let user=await User.findById(req.params.id)

            User.uploadedAvatar(req,res,async(err)=>{
                if(err){
                    console.log("Multer error ",err);
                } else{
                    user.name = req.body.name
                    user.email = req.body.email

                    if(req.file){
                        
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,"..",user.avatar))
                        }

                        user.avatar = path.join(User.AVATAR_PATH,req.file.filename)
                    }

                    await user.save()
                }
            })
        } catch(err){
            console.log("error ocurred in updating user ",err)
        }
        res.redirect("back")
    } else{
        res.status(401).send("Unauthorised")
    }
}