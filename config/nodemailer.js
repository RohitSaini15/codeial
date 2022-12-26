const nodemailer = require("nodemailer")
const ejs = require("ejs")
const path = require("path")
//xtzDFCzTiXey
let transporter = nodemailer.createTransport({
    service: "Outlook365",
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASS
    }
})

let renderTemplate = (data,relativePath)=>{
    console.log("renderTemplate ",data)
    let mailHTML
    ejs.renderFile(path.join(__dirname,"../views/mailers",relativePath),data,(err,str)=>{
        if(err){console.log(`error occured in rendering new comment template ${err}`);return;}
        mailHTML = str
    })
    return mailHTML
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}