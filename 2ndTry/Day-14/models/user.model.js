const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,'username is required'],
        unique : [true,'username already exist'],

    },
    email : {
        type : String,
        unique : [true,"email already exist"],
        required : [true,'email is required']
    },
    password : {
        type : String,
        required : [true,'password is required'],

    },
    bio : String,
    profileImage : {
        type : String,
        default : "https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp?updatedAt=1772251040327"
    }
})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel