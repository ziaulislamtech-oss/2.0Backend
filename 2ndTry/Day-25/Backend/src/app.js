const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const authRouter = require('./routes/auth.route')
const songsRouter = require("./routes/songs.route")

const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : true,
    credentials : true
}))

app.use('/api/auth',authRouter)
app.use('/api/song',songsRouter)

app.use(express.static(path.join(__dirname, "../public")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});



module.exports = app