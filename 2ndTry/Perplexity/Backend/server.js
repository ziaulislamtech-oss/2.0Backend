import dns from 'node:dns'
dns.setDefaultResultOrder('ipv4first') // Render (aur kai hosts) pe outbound IPv6 nahi hota —
                                        // ye Gmail SMTP jaisi services ke IPv6-first resolution
                                        // ki wajah se ENETUNREACH errors ko rokta hai

import 'dotenv/config'
import app from './src/app.js'
import connectToDb from './src/config/database.js'




// const httpServer = http.createServer(app)
import {Server} from 'socket.io'
import http from  'http'
import { initSocket } from './src/sockets/server.socket.js'

const httpServer = http.createServer(app)



initSocket(httpServer)

const PORT = process.env.PORT || 3000

httpServer.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

connectToDb()
.catch((err) => {
    console.error(`MongoDB connection failed : ${err}`)
    process.exit(1)
})