require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/auth.route')
const cookieParser = require('cookie-parser')
const postRouter = require('./routes/post.route')

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/post',postRouter)





module.exports = app