const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    console.log(`followee : ${followeeUsername} : follower : ${followerUsername}`)

    if(followerUsername==followeeUsername){
        return res.status(400).json({
            message : 'You cannot follow your self'
        })
    }

    const isFolloweeExist = await userModel.findOne({
        username : followeeUsername
    })
    console.log(isFolloweeExist)

    if(!isFolloweeExist){
        return res.status(404).json({
            message : "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(409).json({
            message : 'You are already following this user'
        })
    }

    const followRecord =await followModel.create({
        follower : followerUsername,
        followee : followeeUsername
    })

    res.status(200).json({
        message : `You are now following ${followeeUsername}`,
        follow : followRecord
    })
}

async function unfollowController(req,res){

    const followerUsername = req.user.username
    const followeeUsername  = req.params.username

    const isFolloweeExist  = await followModel.findOne({
        followee : followeeUsername,
        follower : followerUsername
    })

    if(!isFolloweeExist){
        return res.status(400).json({
            message : `You are not following ${followeeUsername}. Bad request`
        })
    }

    await followModel.findByIdAndDelete(isFolloweeExist._id)

    res.status(200).json({
        message : `You unfollowed ${followeeUsername}`
    })
}

async function updateFollowStatusController(req,res){

    const followRequest = req.params.id

    const { status} = req.body 
    console.log('status',status)

    const followRequestPresent = await followModel.findById(followRequest)

    if(!followRequestPresent){
        return res.status(404).json({
            message : 'Follow Request not found'
        })
    }



     followRequestPresent.status = status
     await followRequestPresent.save()
     
     res.status(200).json({
        message : `you ${status} follow request from  ${followRequestPresent.followee}`
     })


}




module.exports = {
    followController,
    unfollowController,
    updateFollowStatusController
}