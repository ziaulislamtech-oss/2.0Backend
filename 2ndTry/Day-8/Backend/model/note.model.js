const mongoose  = require('mongoose')

const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        require : [true,'title is required']
    },
    description : {
        type : String,
        require : [true,'description is required']
    }
})

const noteModel = mongoose.model('notes',noteSchema)

module.exports = noteModel