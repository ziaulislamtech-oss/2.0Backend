// server ko start karna 
// database se connect karna
const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect('mongodb+srv://Zia:8fjDkmW8iRIe25Av@cluster0.bqlaokm.mongodb.net/day-6')
    .then(()=>{
        console.log('Connected To Database')
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log('server is running at port 3000')
})