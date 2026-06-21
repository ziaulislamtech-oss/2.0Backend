const app = require('./app')
const port = 3000;
const mongoose = require('mongoose')
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

const connectToDb =  async()=>{
    mongoose.connect('mongodb+srv://ziaulislamtech_db_user:fIeh9dOMHnGT5mYb@cluster0.zlwn7fd.mongodb.net/cohort2ndTry')
    .then(()=>{
        console.log('connected to db')
    })
}
connectToDb()