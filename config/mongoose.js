const mongoose=require('mongoose')

async function main(){
    var data=await mongoose.connect("mongodb://localhost:27017/codial_development")
    return data
}

main().then(()=>console.log("successfully connected mongo db")).catch(err=>console.log(err))

module.exports=mongoose