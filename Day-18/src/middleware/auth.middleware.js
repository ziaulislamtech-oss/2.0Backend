async function identifyUser(req, res, next) {
    const jwt = require('jsonwebtoken')
    const token = req.cookies.token


    if (!token) {
        res.status(401).json({
            message: "invalid token or unauthorised user"
        })
    }

    let decoded

    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
    } catch (error) {
        res.status(401).json({
            message: 'invalid token'
        })
    }

    req.user = decoded

    next()
}

module.exports = identifyUser