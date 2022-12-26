const User = require("../models/user")
const queue = require("../config/kue")
const resetPasswordWorker = require("../workers/reset_password_worker")
const resetPassword = require("../models/reset_password")

module.exports.resetPassword = async function(req,res){
    try{
        const user = await User.findOne({"email": req.query.email})
        if(user){
            let job = queue.create("resetPassword",user).save(function(err){
                if(err){
                    console.log(`error occured in creating job for forgot password ${err}`)
                    return
                }
                console.log(`job id is ${job.id}`)
            })
        }
    } catch(err){
        console.log("error in forget password ",err)
    }

    res.redirect("/")
}

module.exports.newPassword = function(req,res){
    req.flash("accessToken",req.params.accessToken)
    return res.render("reset_password_view")
}

module.exports.setNewPassword = async function(req,res){

    if(req.body.password != req.body.confirm_password){
        console.log("password unmatched")
        return res.redirect("back")
    }

    // console.log("accessToken = ",req.flash("accessToken")[0])

    accessToken = req.flash("accessToken")[0]
    try{
        let tokenfile = await resetPassword.findOne({"accessToken": accessToken})

        console.log("tokenfile = ",tokenfile)

        if(tokenfile){
            let user = await User.findById(tokenfile.user)
            user.password = req.body.password
            await user.save()
            console.log("password changed ")
        } else{
            console.log("token file couldn't find ")
        }
    } catch(err){
        console.log("error occured in setNewPassword ",err)
    }

    res.redirect("/")
}
