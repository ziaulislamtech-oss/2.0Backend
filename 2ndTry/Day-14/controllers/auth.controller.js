const userModel = require("../models/user.model")
const crypto = require('crypto')
const jwt = require('jsonwebtoken')


async function resgisterController(req, res) {

    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {

        return res.status(409).json({
            message: isUserAlreadyExist.email === email
                ? "Email already exist"
                : "Username already exist"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

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
        message: 'user registered successfully',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage

        }
    })

}

async function loginController(req, res) {

    const { email, password, username } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    

    const isPasswordCorrect = user.password === crypto.createHash('sha256').update(password).digest('hex')

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: 'invalid password'
        })
    }

    const token = jwt.sign({
        email: user.email,
        id: user._id
    },
    process.env.JWT_SECRET,
    {expiresIn : '1d'}
    )

    res.cookie('jwt-token',token)

    res.status(200).json({
        message : 'user logged in successfully',
        user:{
            username: user.username,
            email : user.email,
            bio : user.bio,
            id : user._id,
            profileImage : user.profileImage

        }
        
    })
}


module.exports = {
    resgisterController,
    loginController
}