const express = require('express')
const router = express.Router()
const adminMiddleware = require('../middleware/adminMiddleware')
const { orderController, getOrderbyId, getMyOrderbyId, getAllOrder, paidStatus, deliveryStatus } = require('../controller/orderController')
const authorizationToken = require('../middleware/authMiddleware')


router.route('/api/order').post(authorizationToken, orderController)

router.route('/api/order/myorder').get(authorizationToken, getMyOrderbyId)

router.route('/api/order/alluserorder').get(authorizationToken, adminMiddleware, getMyOrderbyId)

router.route('/api/order/:id').get(authorizationToken, getOrderbyId)

// router.route('/api/order/:id/pay').put(authorizationToken, updateOrderById)

router.route('/api/order').get(authorizationToken, adminMiddleware, getAllOrder)

router.route('/api/order/:id/pay').put(authorizationToken, adminMiddleware,paidStatus)

router.route('/api/order/:id/delivery').put(authorizationToken, adminMiddleware, deliveryStatus)

module.exports = router