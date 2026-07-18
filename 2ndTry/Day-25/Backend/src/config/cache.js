const Redis = require('ioredis').default

const redis = new Redis({
    host : process.env.redisHost,
    port : process.env.redisPort,
    password : process.env.redisPassword  
})

redis.on('connect',()=>{
    console.log("server is connected to redis")
})

redis.on("error",(err)=>{
    console.log(err)
})

module.exports = redis