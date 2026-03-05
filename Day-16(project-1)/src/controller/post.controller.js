const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")

const { toFile } = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })

    res.send(file)
}

async function getPostController(req, res) {
    const token = req.cookies.token

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message : "Inavlid Token"
        })
    }

    const userId = decoded.id

    postModel.findOne({
        user : userId
    })

    res.status(200).json({
        message : "Posts fetched successfully",
        posts
    })
}


module.exports = { createPostController,getPostController }