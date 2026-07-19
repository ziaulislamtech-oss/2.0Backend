const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({

    url : {
        type : String,
        required : true
    },
    
    posterUrl : {
        type :String,
        default : "https://ik.imagekit.io/18kjj0yy3/songs/nasheedDefaultPoster.jpg"
    },
    title : {
        type : String,
        required : true,
        default : "nasheed"
    },
    mood : {
        type : String,
        enum : {
            values : ["sad","happy","surprised"],
            message : "mood can sad,happy or surprised"
        }
    }
})

const songModel = mongoose.model('songs',songSchema)

module.exports = songModel