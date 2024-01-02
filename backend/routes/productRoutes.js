const express = require('express')
const {getProduct, getProductId} = require('../controller/productController')

const router = express.Router()

router.route('/').get(getProduct)

router.route('/:id').get(getProductId)


module.exports = router