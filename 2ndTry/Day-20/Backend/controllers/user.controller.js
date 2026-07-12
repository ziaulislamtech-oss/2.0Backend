const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followController(req, res) {

    const followerId = req.user.id;
    const followeeUsername = req.params.username;

    const followeeUser = await userModel.findOne({
        username: followeeUsername
    });

    if (!followeeUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (followeeUser._id.toString() === followerId) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    console.log("followee user",followeeUser)

    const alreadyFollowing = await followModel.findOne({
        follower: followerId,
        followee: followeeUser._id
    });

    if (alreadyFollowing) {
        return res.status(409).json({
            message: "You are already following this user"
        });
    }

    const followRecord = await followModel.create({
        follower: followerId,
        followee: followeeUser._id
    });

    return res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    });
}

async function unfollowController(req, res) {

    const followerId = req.user.id;
    const followeeUsername = req.params.username;

    const followeeUser = await userModel.findOne({
        username: followeeUsername
    });

    if (!followeeUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const followRecord = await followModel.findOne({
        follower: followerId,
        followee: followeeUser._id
    });

    if (!followRecord) {
        return res.status(404).json({
            message: "You are not following this user"
        });
    }

    await followModel.findByIdAndDelete(followRecord._id);

    return res.status(200).json({
        message: `You unfollowed ${followeeUsername}`
    });
}

async function updateFollowStatusController(req, res) {

    const followRequest = await followModel
        .findById(req.params.id)
        .populate("followee", "username");

    if (!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    followRequest.status = req.body.status;

    await followRequest.save();

    return res.status(200).json({
        message: `You ${req.body.status} follow request from ${followRequest.followee.username}`
    });
}

async function getFollowingUserController(req, res) {

    const followingUsers = await followModel
        .find({
            follower: req.user.id,
            status: "accepted"
        })
        .populate("followee", "username profileImage");

    return res.status(200).json({
        message: "Following users fetched successfully",
        followingUsers
    });
}

async function getFollowersController(req, res) {

    const followers = await followModel
        .find({
            followee: req.user.id,
            status: "accepted"
        })
        .populate("follower", "username profileImage");

    return res.status(200).json({
        followers
    });
}

async function getSuggestedUsersController(req, res) {

    const loggedInUserId = req.user.id;

    // Get all users already followed
    const following = await followModel.find({
        follower: loggedInUserId,
        status: "accepted"
    });

    // Extract followed user ids
    const followingIds = following.map(follow => follow.followee);

    // Also exclude myself
    followingIds.push(loggedInUserId);

    // Fetch remaining users
    const suggestedUsers = await userModel.find({
        _id: {
            $nin: followingIds
        }
    }).select("username profileImage");

    return res.status(200).json({
        message: "Suggested users fetched successfully",
        suggestedUsers
    });

}



module.exports = {
    followController,
    unfollowController,
    updateFollowStatusController,
    getFollowingUserController,
    getSuggestedUsersController
}