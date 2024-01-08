const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const { orderController, getOrderbyId, updateOrderById, getMyOrderbyId } = require('../controller/orderController')


router.route('/api/order').post(authorization, orderController)

router.route('/api/order/myorder').get(authorization, getMyOrderbyId)

router.route('/api/order/alluserorder').get(authorization, adminMiddleware, getMyOrderbyId)

router.route('/api/order/:id').get(authorization, getOrderbyId)

router.route('/api/order/:id/pay').put(authorization, updateOrderById)

module.exports = router