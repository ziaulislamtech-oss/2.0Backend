const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username already exist'],
        required: [true, 'username is required']
    },
    email: {
        type: String,
        unique: [true, 'email already exist'],
        required: [true, 'email is required']
    },
    password: {
        type: String,
       
        required: [true, 'password is required']
    },
    bio : String,
    profileImage : {
        type : String,
        default : 'https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp?updatedAt=1772251040327'
    }

})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel



