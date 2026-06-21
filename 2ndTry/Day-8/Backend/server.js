const app = require('./app')
const port = 3000;
require('dotenv').config()
const connectToDb = require('./config/database')

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

connectToDb()

