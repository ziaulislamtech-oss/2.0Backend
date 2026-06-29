const jwt = require('jsonwebtoken')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require("@imagekit/nodejs")
const postModel = require('../models/post.model')

const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
})

async function postCreateController(req, res) {
    console.log(req.body,req.file)

    const token = req.cookies['jwt-token'];
    if (!token) {
       return res.status(401).json({
            message: "token not provided. Unauthorised access"
        })
    }

    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {

        return res.status(401).json({
            message: "invalid token.Unauthorized access"
        })
    }
    
    if (!req.file) {
        return res.status(400).json({
            message: "please upload an image file"
        })
    }

    try {
        const file = await imagekit.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), 'file'),
            fileName: `post_${Date.now()}`,
            folder: "cohort-2-insta-clone-posts"


        })

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: decoded.id
        })

        return res.status(201).json({
            message: "post created successfully",
            post
        })

    } catch (error) {
        console.log("upload/Database Error : ", error)
        return res.status(500).json({
            message: "something went wrong while creating the post",
            error: error.message
        })

    }


}

async function getPostsController(req,res){

    const token  = req.cookies['jwt-token']

    if(!token){
        return res.status(401).json({
            message : 'token not found.Unauthorized access'
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){

        res.status(401).json({
            message : "invalid token.Unauthorized access"
        })
    }

    const userId = decoded.id
    console.log(userId)

    const posts = await postModel.find(
        {user : userId}
    )

    res.status(200).json({
        message : "Posts fetched successfully",
        posts
    })

}

module.exports = {
    postCreateController,
    getPostsController
}