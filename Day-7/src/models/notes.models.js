const mongoose = require('mongoose')

const noteSchema =  new mongoose.Schema({
    title : String,
    description : String,
})

// schema = database ko bata k ker format main ap data store karney walain ho

const noteModel = mongoose.model("notes",noteSchema)

module.exports = noteModel