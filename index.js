const express=require('express')
const app=express();

const expressLayouts=require('express-ejs-layouts')
const cookieParser=require('cookie-parser')
const session=require("express-session");
const passport=require("./config/passport-local-strategy")
const mongoose=require('./config/mongoose')
const MongoStore=require("connect-mongo")

const port=8000;

app.use(express.urlencoded())
// app.use(cookieParser())
app.use(express.static("./assets"))

//for layout.js
app.use(expressLayouts)
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// mongostore is use to store session
app.use(session({
    name:"codeial",
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        client:mongoose.connection.getClient(),
        autoRemove:'disabled'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'))

app.set('view engine','ejs')
app.set('views','./views')

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running at port: ${port}`);
}) 