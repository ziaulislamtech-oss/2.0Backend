const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const authRouter = require('./routes/auth.route')
const postRotuer = require('./routes/post.route')

app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/post',postRotuer)



module.exports = app