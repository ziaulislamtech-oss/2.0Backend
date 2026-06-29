const mongoose = require('mongoose')

const connectToDb = async()=>{
   await mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log('connect to database')
   })
}

module.exports = connectToDb