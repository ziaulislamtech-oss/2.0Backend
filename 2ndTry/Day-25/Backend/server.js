require('dotenv').config()
const app = require('./src/app');
const connectToDb = require('./src/config/database');
const port = 3000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

connectToDb()