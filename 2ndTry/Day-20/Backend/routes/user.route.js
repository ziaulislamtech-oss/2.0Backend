const express = require('express')
const userController = require('../controllers/user.controller')
const identifyUser = require('../middleware/identifyUser.middlewar')

const userRouter = express.Router()

userRouter.post('/follow/:username',identifyUser,userController.followController)
userRouter.post('/unfollow/:username',identifyUser,userController.unfollowController)
userRouter.post('/status/:id',identifyUser,userController.updateFollowStatusController)
userRouter.get('/followedusers',identifyUser,userController.getFollowingUserController)
userRouter.get('/suggestedusers',identifyUser,userController.getSuggestedUsersController)
userRouter.get('/profile',identifyUser,userController.getProfileController)

module.exports = userRouter