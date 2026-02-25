const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

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
        email, name, password
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET
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

    const isPasswordMatched = user.password === password

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message : "user loged in",
        user
    })
})

module.exports = authRouter