const express = require('express')
const cors = require('cors')

const app = express()
const authRouter = require('./routes/auth.route')
const songsRouter = require("./routes/songs.route")

const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

app.use('/api/auth',authRouter)
app.use('/api/song',songsRouter)



module.exports = app