const express = require('express')
const Product = require('../models/productModel')
const asynchandler = require('express-async-handler')

const router = express.Router()

router.get('/', asynchandler( async (req,res) => {
    const product = await Product.find({})
    
    res.send(product);
}))

router.get('/:id', asynchandler( async(req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        res.send(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
}))


module.exports = router