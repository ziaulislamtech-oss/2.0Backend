const express = require("express")
const userModel = require("../models/user.model")

const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: 'with this email user already exist',


        })
    }

    const hashedPassword = crypto.createHash('md5').update(password).digest("hex")


    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,

    })

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_KEY
    )

    res.cookie('jwt-token', token)

    res.status(201).json({
        message: 'user created successfully',
        user, token
    })
})


// login api

authRouter.post('/login', async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "with this email user not found"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: 'invalid password'
        })
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email
    },
        process.env.JWT_KEY
    )
    res.cookie('jwt-token',token)

    res.status(200).json({
        message : 'user logged in successfully',
        user,
        token
    })
})


module.exports = authRouter