import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userschema = new mongoose.Schema({
    username : {
        type : String,
       required : true,
       trim : true,
       unique : true  
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type  : String,
        required : true,
        minlength : 6,
    },
    verified : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

userschema.pre('save',async function () {

    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password,10)
})

userschema.methods.comparePassword =  function (candidatePassword){

    return bcrypt.compare(candidatePassword,this.password)
}

const userModel = mongoose.model('Users',userschema)

export default userModel