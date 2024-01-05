const Order = require('../models/orderModel')
const asynchandler = require('express-async-handler')

const orderController = asynchandler(async (req, res) => {
    const { orderItem, shippingAddress, paymentMethod,itemsPrice, taxPrice, shippingPrice, totalPrice  } = req.body
    
    if (orderItem && orderItem.length === 0) {
        res.status(400)
        throw new Error('Nothing to order')
    } else {
        const order = await Order({
        orderItem, user:req.user._id, shippingAddress, paymentMethod,itemsPrice, taxPrice, shippingPrice, totalPrice 
        })
        
        const createOrder = await order.save()

         res.status(201).json(createOrder)
    }

})

module.exports = {orderController}