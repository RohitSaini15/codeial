const queue = require("../config/kue")
const commentMailer = require("../mailers/comment_mailer")

queue.process("emails",(job,done)=>{
    console.log(`email worker is processing a job ${job.data}`)

    commentMailer.newComment(job.data)

    done()
})