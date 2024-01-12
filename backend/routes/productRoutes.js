const express = require('express')
const {getProduct, getProductId, deleteProductId, updateProduct, reviewProductById} = require('../controller/productController')
const authorizationToken = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

router.route('/').get(getProduct)

router.route('/:id').get(getProductId)

router.route('/:id').delete(authorizationToken, adminMiddleware, deleteProductId)

router.route('/create').post(authorizationToken, adminMiddleware, updateProduct)

router.route('/:id/review').post(authorizationToken, reviewProductById)

module.exports = router