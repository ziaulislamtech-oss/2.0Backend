const express = require('express')
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage : multer.memoryStorage()})

const postRotuer = express.Router()

postRotuer.post('/create',upload.single('file'),postController.createPostController)
postRotuer.get('/get',postController.getAllPostControllers)

module.exports = postRotuer