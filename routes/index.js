const express=require('express')

const router=express.Router();

const homeController=require("../controllers/home_controller")

router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/auth',require('./auth'))

router.use("/api",require("./api"))
router.use("/post",require("./posts"))
router.use("/comment",require("./comment"))
router.use("/resetpassword",require("./resetPassword"))

module.exports=router;