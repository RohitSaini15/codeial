const queue = require("../config/kue")
const forgotPasswordMailer = require("../mailers/forgot_password_mailer")

queue.process("resetPassword",(job,done)=>{
    console.log("user data = ",job.data)
    forgotPasswordMailer.forgetPassword(job.data)
    done()
})