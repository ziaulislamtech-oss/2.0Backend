const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const registerController = async (req, res) => {

    const { username, email, password, bio, profileImage } = req.body
    console.log("email", email)
    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })


    if (user) {
        return res.status(409).json({
            message: user.email === email
                ? "email already exist"
                : "username already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        email,
        id: newUser._id,
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: newUser.username,
            email: newUser.email,
            bio: newUser.bio,
            profileImage: newUser.profileImage,
            id: newUser._id
        }
    })

}

const loginController = async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid =await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message : "incorrect password"
        })
    }

    const token = jwt.sign({
        email,
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('token',token)

    res.status(200).json({
        message : "user logged In successfull",
         user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
    })

}



module.exports = {
    registerController,
    loginController
}