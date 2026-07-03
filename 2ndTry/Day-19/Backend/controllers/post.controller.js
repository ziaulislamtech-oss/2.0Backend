const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const postModel = require('../models/post.model')

const imagekit = new ImageKit({
    privateKey : process.env.IMAGE_KIT_PRIVATE_KEY
})


async function createPostController(req,res){

    const user = req.user.id

    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : "test",
        folder : 'cohort-2-insta-clone-posts'
    })

    const post = await postModel.create({
        caption : req.body.caption,
        imgUrl : file.url,
        user : user
    }) 

    res.status(201).json({
        message : "post created successfully",
        post,
        file
    })

}

async function getAllPostController(req,res) {
    const userId = req.user.id

    const allPosts = await postModel.find({user :userId})

    if(!allPosts){
        return res.status(404).json({
            message : "Post not found"
        })
    }

    return res.status(200).json({
        message : "All posts fectch successfully",
        allPosts,
        userId
    })

}

async function getOnePost(req,res){

    const userId = req.user.id

    const postId = req.params.id

    console.log(`userId type : ${typeof(userId)}  postId type : ${typeof(postId)}`)

    const post = await postModel.findById(postId)

    if(!post){
        res.status(404).json({
            message : "Post not found"
        })
    }

    const isPostValid = post.user.equals(userId)

    if(!isPostValid){
        return res.status(403).json({
            message : "Forbiddent content"
        })
    }

    res.status(200).json({
        message : "Post fetch successfully",
        post,
        userId
    })
}



module.exports = {
    createPostController,
    getAllPostController,
    getOnePost
}