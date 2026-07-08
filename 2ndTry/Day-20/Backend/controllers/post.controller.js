const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')

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


async function likePostController(req,res){

    console.log('request is comming')

    const user = req.user
    const postId = req.params.postid

    const isLikeExisting = await likeModel.findOne({
        user : user.username,
        post : postId
    })

    if(isLikeExisting){
        return res.status(409).json({
            message : "Post has Already been liked by this user"
        })
    }

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "post not found"
        })
    }

    const like = await likeModel.create({
        user : user.username,
        post : postId,
    })

    res.status(201).json({
        message : "Post liked successfully",
        like
    })



}

async function unlikePostController(req,res){

    const user = req.user
    const postId = req.params.postid

    const isPostLiked = await likeModel.findOne({
        user : user.username,
        post : postId

    })


    if(!isPostLiked){
        return res.status(400).json({
            message : "Post didin't like"
        })
    }

    await likeModel.findByIdAndDelete(isPostLiked._id)

    return res.status(200).json({
        message : "Post unliked successfully"
    })
}

async function getFeedController(req,res){

    const user = req.user
    console.log(user)

    const feedPosts = await Promise.all((await postModel.find({}).populate('user','-password').lean())
    .map(async(post)=>{
       
        console.log(typeof(post))
        const isLiked = await likeModel.findOne({
            user : user.username,
            post : post._id
        })

        post.isLiked = !!isLiked

        return post
    }))
    
    

    return res.status(200).json({
        message : "Feed fetched successfully",
        feedPosts
    })

}



module.exports = {
    createPostController,
    getAllPostController,
    getOnePost,
    likePostController,
    unlikePostController,
    getFeedController
}