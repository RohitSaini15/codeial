const express=require('express')
const app=express();

const expressLayouts=require('express-ejs-layouts')

const port=8000;

app.use(expressLayouts)

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