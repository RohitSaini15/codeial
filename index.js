const express=require('express')
const app=express();

const expressLayouts=require('express-ejs-layouts')
const cookieParser=require('cookie-parser')
const session=require("express-session");
const passport=require("./config/passport-local-strategy")
const mongoose=require('./config/mongoose')
const MongoStore=require("connect-mongo")
const middleware=require("./config/middleware")

const sassMiddleware=require("node-sass-middleware") //for sass or scss
const flash=require("connect-flash")

const port=8000;

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true, // to show the error if error occured in compiling
    outputStyle:"extended", // show the output in line by line format not in a one line(in css file)
    prefix:"/css" //// Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}))

// function middle(req,res,next){
//     console.log(req.session)
//     next()
// }

// function printFlash(req,res,next){
//     // req.flash("success","hello")
//     console.log(req.flash("success"))
//     next()
// }

app.use(express.urlencoded())
// app.use(cookieParser())
app.use(express.static("./assets"))

//for layout.js
app.use(expressLayouts)
app.set('layout extractStyles',true); // we can include the style in partials
app.set('layout extractScripts',true);// we can include the script in partials

// mongostore is use to store session
app.use(session({
    name:"codeial",
    secret:"abc",
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

// app.use(middle)
app.use(flash())
// app.use(printFlash)

app.use(passport.initialize())
// app.use(middleware)
app.use(passport.session())

// app.use(middleware)

app.use(passport.setAuthenticatedUser);
app.use(middleware.setFlash)
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
