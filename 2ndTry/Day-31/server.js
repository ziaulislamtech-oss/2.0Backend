
import app from "./src/app.js";
import {createServer} from "http"
import { Server } from "socket.io";

const httpServer = createServer(app)
const io = new Server(httpServer,{})

io.on("connection",(socket)=>{

    console.log('connection established')

    socket.on('message',(msg)=>{
        console.log('user fired message event')

        console.log(msg)
        io.emit('abc')
    })

})

httpServer.listen(3000,()=>{

    console.log("server is running on port 3000")
})

// Task 
// socket.emit()
// socket.emit().broadcast()
// io.emit()