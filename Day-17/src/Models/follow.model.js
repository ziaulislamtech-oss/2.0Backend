const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({

    follower: {

        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: [true, 'follower is required']

    },
    followee: {

        type: mongoose.schema.ObjectId,
        ref: "users",
        required: [true, 'folower is required']
    },

}, {
    timestamps: true
})

const followModel = mongoose.model('follows',followSchema)

moduel.export = followModel 