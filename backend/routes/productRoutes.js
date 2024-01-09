const express = require('express')
const {getProduct, getProductId, deleteProductId} = require('../controller/productController')
const authorizationToken = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const router = express.Router()

router.route('/').get(getProduct)

router.route('/:id').get(getProductId)
router.route('/:id').delete(authorizationToken, adminMiddleware, deleteProductId)


module.exports = router