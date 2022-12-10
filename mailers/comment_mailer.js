const nodemailer = require("../config/nodemailer")

exports.newComment = async (comment) => {
    console.log(`sending mail ${comment}`)
    htmlText = nodemailer.renderTemplate({comment: comment},"/comment/new_comment.ejs")

    if(!htmlText){
        htmlText = "<h1>Your comment is published</h1>"
    }

    try{
        await nodemailer.transporter.sendMail({
            'from': 'rohitrsaini@outlook.com',
            'to': comment.user.email,
            'subject': 'New Comment Published',
            'html': htmlText
        }) 

        console.log("Mail Successfully send ")
    } catch(err){
        console.log(`Mail sending failed ${err}`)
    }
}