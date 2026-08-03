import express from 'express'
import { loginValidator, registerValidator } from '../../src/validators/auth.validator.js'
import { loginController, registerController, verifyEmailController } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/register',registerValidator,registerController)

authRouter.get('/verify-email',verifyEmailController)

authRouter.post('/login',loginValidator,loginController)


export default authRouter