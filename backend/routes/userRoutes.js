const express = require('express')
const { authUser, getUserProfile, userRegister } = require('../controller/userController')
const authorizationToken = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(userRegister)
router.post('/login', authUser)
router.route('/profile').get(authorizationToken, getUserProfile)


module.exports = router