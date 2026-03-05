const express = require('express')
const multer = require('multer')
const upload = multer ({storage : multer.memoryStorage()})
const postController = require("../controller/post.controller")

const postRouter = express.Router()


postRouter.post("/",upload.single("image"),postController.createPostController)


module.exports = postRouter