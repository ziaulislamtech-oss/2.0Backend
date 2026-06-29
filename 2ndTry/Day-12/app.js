const express = require('express')

const app = express()
app.use(express.json())

const authRouter = require('./routes/authRoute')

require('dotenv').config()

app.use('/api/auth',authRouter)




module.exports = app