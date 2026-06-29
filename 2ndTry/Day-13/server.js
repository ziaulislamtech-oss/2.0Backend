const app = require('./app')
const connectToDb = require('./config/database')
const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})

connectToDb()