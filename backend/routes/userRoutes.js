const express = require('express')
const { authUser, getUserProfile, userRegister, updateUserProfile, getAllUserProfile, } = require('../controller/userController')
const authorizationToken = require('../middleware/authMiddleware')
const adminMiddleware =  require('../middleware/adminMiddleware')

const router = express.Router()

router.route('/').post(userRegister)
router.post('/login', authUser)
router
  .route('/profile')
  .get(authorizationToken, getUserProfile)
  .put(authorizationToken, updateUserProfile)

router.route('/admin').get(authorizationToken, adminMiddleware, getAllUserProfile)


module.exports = router