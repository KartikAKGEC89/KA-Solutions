const express = require('express')
const Product = require('../models/productModel')
const asynchandler = require('express-async-handler')


const getProduct = asynchandler( async (req,res) => {
    const product = await Product.find({})
    
    res.send(product);
})

const getProductId = asynchandler( async (req,res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        res.send(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})

const deleteProductId = asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.deleteOne()
        res.json("Delete Successfully")
    } else {
        res.status(404)
        throw new Error('Do not delete')
    }
})

module.exports = {getProduct, getProductId, deleteProductId}