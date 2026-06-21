const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    }
})

const noteModel = mongoose.model('Note',noteSchema)

module.exports  = noteModel