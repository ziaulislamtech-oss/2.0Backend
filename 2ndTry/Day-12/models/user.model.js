const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : [true,'username is required'],

    },
    email : {
        type : String,
        unique : true,
        required  : [true,'email is required']

    }
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel