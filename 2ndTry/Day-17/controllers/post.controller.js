const jwt = require('jsonwebtoken')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const postModel = require('../models/post.model')
const imagekit= new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async(req,res)=>{
    
    

    const user = req.user

    if(!req.file){
        return res.status(404).json({
            message : "no file provided"
        })
    }

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : `day17-${Date.now()}`,
        folder : 'cohor2'
    })

    const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : user 
    })

    return res.status(201).json({
        message : "post created successfully",
        post,
        file
    })






}

const getAllPostsControllers = async(req,res)=>{
   

    const userId = req.user
    

    const allPosts =await postModel.find(
        {user : userId}
    )

    if(!allPosts){
        return res.status(404).json({
            message :"no post found"
        })
    }

    return res.status(200).json({
        message : 'posts fetch successfully',
        allPosts
    })
}

const getOnePost = async(req,res)=>{
    
    const userId = req.user
    const postId = req.params.id

    const post = await postModel.findById(postId)

    console.log(`userId : ${userId}  postUser : ${post.user}`)
    let postUser = String(post.user)

    if(userId!==postUser){
        return res.status(401).json({
            message : "forbidden access.you are not allowed to access this post"
        })
    }


    if(!post){
        return res.status(404).json({
            message : "post not found"
        })
    }

    res.status(200).json({
        message : "post fetch succcessfully",
        post,
        postUser
    })
}

module.exports = {
    createPostController,
    getAllPostsControllers,
    getOnePost
}

