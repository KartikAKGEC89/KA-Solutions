const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authMiddleware')
const { orderController } = require('../controller/orderController')


router.route('/api/order').post(authorization, orderController)

module.exports = router