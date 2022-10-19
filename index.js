const express=require('express')
const app=express();

const expressLayouts=require('express-ejs-layouts')
const cookieParser=require('cookie-parser')
require('./config/mongoose')

const port=8000;

app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.static("./assets"))
// app.use(expressLayouts)

// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);

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