const asynchandler = require('express-async-handler')

const adminMiddleware = asynchandler(async (req, res, next) => {

    if (req.user.isAdmin === true) {
        next()
    } else {
        res.status(401)
        throw new Error('You are not admin')
    }

})

module.exports = adminMiddleware