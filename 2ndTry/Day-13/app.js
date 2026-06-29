const express = require('express')
const authRouter = require('./routes/authRoute')
const app = express()

require('dotenv').config()

app.use(express.json())

app.use('/auth/api',authRouter)




module.exports = app