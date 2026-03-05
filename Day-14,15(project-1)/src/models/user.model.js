const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exist "],
        required: [true, "user name is required"]

    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, " remail is required"]
    },
    password: {
        type: String,
        required: [true, " password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: 'https://ik.imagekit.io/18kjj0yy3/default_user_profile_image.webp'
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel