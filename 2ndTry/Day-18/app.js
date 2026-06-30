const express = require('express')
const cookieParser = require('cookie-parser')

require('dotenv').config()
const app = express()
app.use(cookieParser())
const authRouter = require('./routes/auth.route')


app.use(express.json())
app.use('/api/auth',authRouter)




module.exports = app