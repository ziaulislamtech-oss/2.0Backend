
const jwt = require('jsonwebtoken')
const blackListModel = require('../models/blacklist.model')
const redis = require('../config/cache')

async function authUser(req,res,next){

    const token = req.cookies.token

    console.log('cookies Token : ',token)

    if(!token){
        return res.status(401).json({

            message : "token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token)

    console.log('blacklisted token : ',isTokenBlacklisted)
    
    if(isTokenBlacklisted){
        return res.status(401).json({
            message : "Invalid token"
        })
    }

    let decoded = null

    try{
        decoded =  jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){

        return res.status(401).json({
            message : "Invalid token"
        })
    }

    req.user = decoded
    
    next()
}


module.exports = {authUser}