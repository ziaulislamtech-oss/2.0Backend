const userModel = require("../models/user.model")
const crypto = require('crypto')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    // const isUserExistByEmail = userModel.findOne({email})

    // if(isUserExistByEmail){
    //    return res.statu(409).json({
    //         message : "user already exist with this email"
    //     })
    // }

    // const isUserExistByusername = userModel.findOne({username})

    // if(isUserExistByusername){
    //    return res.statu(409).json({
    //         message : "user already exist by username"
    //     })
    // }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "user already exist" + ((isUserAlreadyExist.email === email) ? "Email already exist"
                : "username already exist")
        })

    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex')
    const  hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,

        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: 'user register successfully',
        user: {
            email: user.email,
            username: user.name,
            bio: user.bio,
            profileImage: user.profileImage

        }
    })


}

async function loginController(req, res){
    const { username, email, password } = req.body

    /*

      *username
      *passowrd
      *
      *email
      *password

    */

    const user = await userModel.findOne({

        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]

    })

    // const hash = crypto.createHash("sha256").update(password).digest("hex")
    // const isPasswordValid = hash === user.password

    const isPasswordValid = await bcrypt.compare(password,user.password)  // ye line automaticly login wale passwod ko hash main convert kar k database wale password se matc karta hain
   


    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'invalid password',
        })
    }

    const token = jwt.sign(
        { id: user._id },

        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie('jwt_token',token)

    res.status(200).json({
        message : "user loggedIn successfully" ,
    
        user: {
            username: user.username,
            email: user.email,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })

}

module.exports = {
    registerController,
    loginController
}