const express = require('express')
const multer = require('multer')
const postController = require("../controllers/post.controller")
const identifyUser = require('../middleware/identifyUser.middleware')
const upload = multer({storage : multer.memoryStorage()})

const postRouter = express.Router()

postRouter.use('/create',upload.single('file'),identifyUser,postController.createPostController)
postRouter.use('/get',identifyUser,postController.getAllPostsControllers)
postRouter.use('/getonepost/:id',identifyUser,postController.getOnePost)


module.exports = postRouter