const express = require("express")
const postController = require('../controllers/post.controller')
const identifyUser = require('../middleware/identifyUser.middlewar')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()


postRouter.post('/create',upload.single('file'),identifyUser,postController.createPostController)
postRouter.get('/get',identifyUser,postController.getAllPostController)
postRouter.get('/getonepost/:id',identifyUser,postController.getOnePost)

module.exports = postRouter