const express = require('express')
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middleware/identifyUser.middlewar')

const authRouter = express.Router()

authRouter.post('/register',authController.registerController)
authRouter.post('/login',authController.loginController)
authRouter.get('/getme',identifyUser,authController.getMeController)

module.exports = authRouter