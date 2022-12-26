const nodemailer = require("../config/nodemailer")
const resetPassword = require("../models/reset_password")
const crypto = require("crypto")

module.exports.forgetPassword = async (user)=>{
    try{
        console.log(user)
        let resetLink = await resetPassword.create({user: user,isValid: true,accessToken: crypto.randomBytes(20).toString("hex")})

        await nodemailer.transporter.sendMail({
            'from': 'rohitrsaini@outlook.com',
            'to': user.email,
            'subject': 'New Comment Published', 
            'html': nodemailer.renderTemplate({resetLink: resetLink},"/password/forgot_password.ejs")
        })
        console.log("Message Successfully send !")
    } catch(err){
        console.log("error occured in forgetPassword mailer ",err)
    }
}