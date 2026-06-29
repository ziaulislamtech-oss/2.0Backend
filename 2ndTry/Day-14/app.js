const express = require('express')
const app = express()

app.use(express.json())

const crypto = require('crypto')
const authRouter = require('./routes/auth.routes')

require('dotenv').config()


app.use('/api/auth',authRouter)

module.exports = app