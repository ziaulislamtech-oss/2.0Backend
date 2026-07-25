const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({

    url : {
        type : String,
        required : true
    },
    
    coverImage : {
        type :String,
        // default : "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg"
    },
    title : {
        type : String,
        required : true,
        default : "nasheed"
    },
    artist : {

        type : String,
        required : true
    },


    mood : {
        type : String,
        enum : {
            values : ["Sad","Happy","Surprised"],
            message : "mood can Sad,Happy or Surprised"
        }
    },
    language : {
        type : String,
        enum : {
            values : ["english","urdu","arabic"],
            message : ['language can be only english,urdu or arabic']
        }
    },
    description : {
        type  : String,
        required : [true,'description is required']
    }
})

const songModel = mongoose.model('songs',songSchema)

module.exports = songModel