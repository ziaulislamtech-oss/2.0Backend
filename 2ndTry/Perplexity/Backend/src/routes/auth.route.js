import express from 'express'
import { loginValidator, registerValidator } from '../../src/validators/auth.validator.js'
import { getMe, loginController, registerController, verifyEmailController } from '../controllers/auth.controller.js'
import { authUser } from '../middleware/auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/register',registerValidator,registerController)

authRouter.get('/verify-email',verifyEmailController)

authRouter.post('/login',loginValidator,loginController)

authRouter.get('/getme',authUser,getMe)

export default authRouter