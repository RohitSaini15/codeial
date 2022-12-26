const express = require("express")
const router = express.Router()

const resetPasswordController = require("../controllers/reset_password_controller")

router.get("/",resetPasswordController.resetPassword)
router.post("/newpassword",resetPasswordController.setNewPassword)
router.get("/newpassword/:accessToken",resetPasswordController.newPassword)

module.exports = router