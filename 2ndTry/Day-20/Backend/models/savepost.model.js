const mongoose = require("mongoose")

const savePostSchema  = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'users',
        required : [true,'user id is required for saving a post'],
    },
    post :{
        type : mongoose.Types.ObjectId,
        ref : 'posts',
        required : [true,'post id is required for saving a post']
    }
})

savePostSchema.index({user : 1,post : 1},{unique : true });

const savePostModel = mongoose.model('savedPosts',savePostSchema)

module.exports = savePostModel