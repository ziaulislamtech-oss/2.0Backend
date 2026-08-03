
import userModel from '../models/user.model.js'
import { sendEmail } from '../services/mail.service.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const registerController = async (req, res) => {

    const { username, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserAlreadyExist) {

        return res.status(400).json({
            message: `User already exist with this username or email`,
            success: false,
            err: `User already exist`
        })
    }

    const user = await userModel.create({ username, email, password })

    const emailVerificationToken = jwt.sign({
        email: user.email,

    }, process.env.JWT_SECRET_KEY)

    await sendEmail(
        email,
        "Welcome to Perplexity!",
        `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    )

    res.status(201).json({
        message: "User register successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


export const verifyEmailController = async (req, res) => {

    const { token } = req.query

    try {
        let decoded;
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await userModel.findOne({ email: decoded.email })

        if (!user) {

            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }

        user.verified = true

        await user.save();

        const html = `
           <h1>Email Verified Successfully!</h1>
           <p>Your email has been verified. You can now log in to your account.</p>
           <a href="http://localhost:3000/login">Go to Login</a>
        `

        return res.send(html)
    }
    catch (err) {

        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }

}

export const loginController = async (req,res)=>{

    const {email,password} = req.body

    const user = await userModel.findOne({email})
    
    if(!user){

        return res.status(403).json({
            message : 'User not found'
        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid){

        return res.status(401).json({
            message : "Invalid credentials"
        }) 
    }

    const token = jwt.sign({
        email : user.email
    },process.env.JWT_SECRET_KEY,{expiresIn:"7d"})

    res.cookie('token',token)

    res.status(200).json({

        message : "User loggedin successfully",
        user : user
    })
}