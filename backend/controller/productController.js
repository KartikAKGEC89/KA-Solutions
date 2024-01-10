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

const updateProduct = asynchandler(async (req, res) => {

      const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    } = req.body
    

    const product = await Product.create(
        {
            name: name,
            price: price,
            description: description,
            image: image,
            brand: brand,
            category: category,
            countInStock:countInStock
        }
    )
    if (product) {
        res.status(201).send('created Successfully')
    } else {
        res.status(404)
        throw new Error('Not Created')
    }
})

module.exports = {getProduct, getProductId, deleteProductId, updateProduct}