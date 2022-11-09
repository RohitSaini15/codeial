const express=require('express')
const passport=require("../config/passport-local-strategy")

const router=express.Router();
const userController=require('../controllers/users_controller')

router.get('/profile/:id',passport.checkAuthentication,userController.profile)
router.get('/posts',passport.checkAuthentication,userController.posts)
router.post('/create',userController.create)
router.post('/createSession',passport.authenticate('local',{failureRedirect:"/auth/signin"}),userController.createSession)
router.post('/update/:id',passport.checkAuthentication,userController.updateUser)

module.exports=router