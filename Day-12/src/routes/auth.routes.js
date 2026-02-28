const express = require("express")
const userModel = require("../models/user.model")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const { decode } = require("punycode")

const authRouter = express.Router()

/*   /api/auth/register    */
authRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user already exist with this email address"
        })

    }

    const user = await userModel.create({
        email,
        name,
        // password : crypto.createHash('sha256').update(password).digest('hex')
        password : crypto.createHash('sha256').update(password).digest('hex')

    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,{expiresIn : "1h"}
    )
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: " user created successfully",
        user,
        token
    })
})

/* /api/auth/protected   */
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies)
    res.status(200).json({
        message: "This is protected route"
    })
})

/* /api/auth/login               */
authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(404).json({
            message: "user not found with this email address"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordValid = hash === user.password
    if(!isPasswordValid){
        return res.status(401).json({
            message : "invalid password"
        })
    }
    const token = jwt.sign({
        id : user._id,

    },process.evn.JWT_SECRET)

    res.cookie('token',token)
    
    res.json({
        message : "user loged in"
    })
})

authRouter.post("/get-me",async(req,res)=>{
    const token = req.cookies.jwt_token

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    const user  = await userModel.findById(decoded.id)
    console.log(user)
    res.status(200).json({
        message : "user decoded",
       user
    })
})

module.exports = authRouter