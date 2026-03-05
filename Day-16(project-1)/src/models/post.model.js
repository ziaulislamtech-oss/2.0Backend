const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        caption: {
            type : String,
            default : ""
        },
        ImgUrl : {
            type : String,
            required : [true, " imgUrl is required for createing post"]
        },
        user:{
            type : mongoose.Schema.ObjectId,
            ref : "users", // es ref main collection k name ata hain users datbase main ek colleciton hain
            required : [true, "user id is required for creating a post"]
        }

    }
)

const postModel = mongoose.model("post",postSchema)

module.exports = postModel