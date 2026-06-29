const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {

    const { username, email, password, bio, profileImage } = req.body
    console.log(username, email, password, bio, profileImage)

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: isUserAlreadyExist.email === email
                ? "email already exist"
                : "username already exist"
        })
    }


    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage

    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('jwt-token', token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
            Id: user._id
        }
    })
}

async function loginController(req, res) {

    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!isUserAlreadyExist) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isUserValid = await bcrypt.compare(password,isUserAlreadyExist.password)

    if (!isUserValid) {
        return res.status(401).json({
            message: "invalid password."
        })
    }

    const token = jwt.sign({
        email,
        id: isUserAlreadyExist._id
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('jwt-token',token)

    res.status(200).json({
        message : "user logged In successfully",
        user : {
            username : isUserAlreadyExist.username,
            email : isUserAlreadyExist.email,
            bio : isUserAlreadyExist.bio,
            profileImage : isUserAlreadyExist.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}