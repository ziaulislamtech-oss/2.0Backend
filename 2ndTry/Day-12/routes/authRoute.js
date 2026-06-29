const express = require('express')
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { email, username, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({email})
    if (isUserAlreadyExist) {
        return res.status(401).json({
            message: "user already exist"
        })
    }

    const user = userModel.create({
        email,
        username,
        password
    })

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },

        process.env.JWT_KEY
    )

    res.cookie('jwt-token',token)

    res.status(201).json({
        message  : "user registered succcessfully",
        user,
        token 
    })


})

module.exports = authRouter