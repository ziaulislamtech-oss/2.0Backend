const mongoose = require('mongoose')

const connectToDb = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Database')
    }catch(error){
        console.log(`Database connecting error ${error}`)
    }
}

module.exports = connectToDb
