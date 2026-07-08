const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerController(req, res) {
    console.log('register tak request araha hain')

    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email },
            { username }
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
        username,
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage,
            id: user._id
        }
    })

}

async function loginController(req, res) {

    console.log('login tak request araha hain')
    const { username, email, password } = req.body


    const isUser = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    

    if (!isUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isUserValid = await bcrypt.compare(password, isUser.password)

    if (!isUserValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        username,
        id: isUser._id
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('token',token)

    res.status(200).json({
        message : 'User logged In successfully',
        user :{
            username : isUser.email,
            email : isUser.email,
            bio : isUser.bio,
            profileImage : isUser.profileImage
        }
    })

}

module.exports = {
    registerController,
    loginController
}