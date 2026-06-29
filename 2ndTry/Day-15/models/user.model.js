const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,'username is required'],
        unique : [true,'username already exist'],
    },
    email : {
         type : String,
        required : [true,'email is required'],
        unique : [true,'with this email user account already exist'],
    },
    password : {
         type : String,
        required : [true,'password is required'],
    },
    profileImage : {
        type : String,
        default : "https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp?updatedAt=1772251040327"
    },
    bio : String

})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel