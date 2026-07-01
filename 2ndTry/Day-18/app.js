const express = require('express')
const cookieParser = require('cookie-parser')

require('dotenv').config()
const app = express()
app.use(cookieParser())
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
const userRouter = require('./routes/user.route')


app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/post',postRouter)
app.use('/api/user',userRouter)



module.exports = app