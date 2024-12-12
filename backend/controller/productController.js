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

const reviewProductById = asynchandler(async (req, res) => {

    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    if (product) {

        const reviews = {
            name : req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.review.push(reviews)

        product.numReviews = product.review.length

        product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.numReviews
        
        await product.save()

        res.status(201).json('Saved')
        
    } else {
        res.status(404)
        throw new Error('Do not delete')
    }
})


const searchProduct = asynchandler(async (req, res) => {
    const searchQuery = req.params.keyword;  
    
    if (!searchQuery) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        
        console.log('Search Query:', searchQuery);

        
        const products = await Product.find({
            name: { $regex: searchQuery, $options: 'i' }, 
        });

       
        if (products.length > 0) {
            return res.json(products);
        } else {
            return res.status(404).json({ message: 'No products found matching your query' });
        }

    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});



module.exports = {getProduct, getProductId, deleteProductId, updateProduct, reviewProductById, searchProduct}