import 'dotenv/config'
import app from './src/app.js'
import connectToDb from './src/config/database.js'
import { testAi } from './src/services/ai.service.js'

// import { Server } from 'socket.io'
// import http from 'http'

// const httpServer = http.createServer(app)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})


connectToDb()
.catch((err) => {
    console.error(`MongoDB connection failed : ${err}`)
    process.exit(1)
})
testAi()