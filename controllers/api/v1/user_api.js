const User=require("../../../models/user")
const jwtWebToken=require("jsonwebtoken")

module.exports.createSession =async function(req,res){
    try{
        let user = await User.findOne({"email":req.body.email})

        if( user && user.password == req.body.password ){
            return res.json(200,{
                message:"Your token is here",
                data:{
                    token:jwtWebToken.sign(user.toJSON(),"codial",{expiresIn:100000})
                }
            }) 
        }

        res.json(422,{
            message : "Invalid Username and Password"
        })

    } catch(err){
        console.log(err)
        res.json(500,{
            "message":"Internal Server Error"
        })
    }
}