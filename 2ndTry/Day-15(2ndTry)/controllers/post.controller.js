
const jwt = require('jsonwebtoken')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const postModel = require('../models/post.model')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT

})



async function createPostController(req, res) {

    console.log(req.file)
    const token = req.cookies['jwt-token']

    if (!token) {
        return res.status(401).json({
            message: "token not found. Unauthorized access"
        })
    }
    console.log(token)

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "invalid token unauthorized access"
        })
    }

    const user = decoded.id;
    console.log(user, 'heyyyy')

    if (!req.file) {
        return res.status(400).json({
            message: "no file provided for upload"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'insta-file',
        folder: "cohort-2"
    })



    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })


}

async function getAllPostControllers(req,res){

    console.log('request detected ')
    let token = req.cookies['jwt-token']

    if(!token){
        return res.status(401).json({
            message : "Token not found.Unauthorized access"
        })
    }
    console.log('token',token)

    let decoded = null
    try{
        decoded = jwt.verify(token , process.env.JWT_SECRET)
    }catch(error){
        return res.status(401).json({
            message : "Invalid token. Unauthorized access"
        })
    }

    console.log('decoded',decoded)

    let user = decoded.id
    console.log(user,'hhhh')

    const allPosts = await postModel.find({
        user : user
    })

    res.status(200).json({
        message : "posts fetch successfully",
        allPosts
    })
}

module.exports = {
    createPostController,
    getAllPostControllers
}