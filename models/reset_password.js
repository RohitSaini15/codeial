const mongoose = require("mongoose")

const resetPasswordSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    accessToken: {
        type:String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
})

const resetPassword = mongoose.model("ResetPassword",resetPasswordSchema)

module.exports = resetPassword