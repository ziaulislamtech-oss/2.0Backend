const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackListModel = require("../models/blacklist.model")
const redis = require("../config/cache")


async function registerController(req, res) {

    console.log('request is comming to register controller')

    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    console.log(isUserAlreadyExist)

    if (isUserAlreadyExist) {
        const resMessage = isUserAlreadyExist.email === email ? "email already exist" : "username already exist"
        return res.status(400).json({
            message: resMessage
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: 'user created successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

async function loginController(req, res) {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    console.log(user)

    if (!user) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )

    res.cookie('token', token)

    res.status(200).json({
        message: "User loggedin successfully",
        user
    })

}

async function getMe(req,res){

    const userId = req.user.id
    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }

    return res.status(200).json({
        message : "user fetched successfully",
        user
    })


}

async function logOut(req,res){

    const token = req.cookies.token

   

    res.clearCookie('token')

    redis.set(token, Date.now().toString(),"EX",60 * 60)

    res.status(200).json({
        message : "Logout successfully",

    })
}

module.exports = {
    registerController,
    loginController,
    getMe,
    logOut
}