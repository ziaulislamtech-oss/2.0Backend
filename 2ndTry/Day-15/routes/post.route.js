const express = require('express')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

const postController = require('../controllers/post.controller')


const postRouter = express.Router()

postRouter.post('/create',upload.single('file'),postController.postCreateController)
postRouter.get('/get',postController.getPostsController)


module.exports = postRouter