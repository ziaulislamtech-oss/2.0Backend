import 'dotenv/config'
import app from './src/app.js'
import connectToDb from './src/config/database.js'




// const httpServer = http.createServer(app)
import {Server} from 'socket.io'
import http from  'http'
import { initSocket } from './src/sockets/server.socket.js'

const httpServer = http.createServer(app)



initSocket(httpServer)

const port = process.env.PORT || 3000

httpServer.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

connectToDb()
.catch((err) => {
    console.error(`MongoDB connection failed : ${err}`)
    process.exit(1)
})


