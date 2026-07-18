const {Router} = require('express')

const router = Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware.js')


router.post('/register',authController.registerController)
router.post('/login',authController.loginController)
router.get('/getme',authMiddleware.authUser,authController.getMe)
router.post('/logout',authMiddleware.authUser,authController.logOut)


module.exports = router

