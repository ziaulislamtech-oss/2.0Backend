const mongoose = require('mongoose')
const connectToDb = async()=>{
    mongoose.connect('mongodb+srv://ziaulislamtech_db_user:fIeh9dOMHnGT5mYb@cluster0.zlwn7fd.mongodb.net/Notes')
    .then(()=>{
        console.log('Database is connected')
    })
    
}

module.exports = connectToDb