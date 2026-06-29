const { response } = require("../app")
const userModel = require("../models/user.model")
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const salrounds = 10;


async function registerController(req, res) {

    const { username, email, password, profileImage, bio } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]

    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: isUserAlreadyExist.email === email
                ? "email already exist"
                : "username already exist"
        })
    }

    const hash = await bcrypt.hash(password, salrounds)

    const user = await userModel.create({
        username,
        password: hash,
        email,
        profileImage,
        bio
    })

    const token = jwt.sign({
        email: user.email,
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('jwt-token', token)

    res.status(201).json({
        message: 'user registered successfully',
        user: {
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
            bio: user.bio,
            id: user._id
        }
    })

}


async function loginController(req, res) {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        email,
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('jwt-token', token)

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            bio: user.bio,
            id: user._id
        }
    })

}


module.exports = {
    registerController,
    loginController
}
