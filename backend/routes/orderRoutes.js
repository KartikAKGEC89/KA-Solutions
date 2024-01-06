const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authMiddleware')
const { orderController, getOrderbyId, updateOrderById } = require('../controller/orderController')


router.route('/api/order').post(authorization, orderController)

router.route('/api/order/:id').get(authorization, getOrderbyId)

router.route('/api/order/:id/pay').put(authorization, updateOrderById)

module.exports = router