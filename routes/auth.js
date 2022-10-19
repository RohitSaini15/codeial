const express=require('express')

const router=express.Router();

const authController=require('../controllers/auth_controller');

router.get('/signup',authController.signup);
router.get('/signin',authController.signin);

module.exports=router;