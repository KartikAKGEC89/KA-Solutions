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

const getOrderbyId = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.send(order)
    } else {
        res.status(404)
        throw new Error('No order')
    }
    
})

const updateOrderById = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
            order.isPaid = true,
            order.paidAt = Date.now()
            order.paymentResult= {
                id : req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
        }

        const updateOrder = await Order.save()

        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('No order')
    }
    
})


const getMyOrderbyId = asynchandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
    
})


const getAllOrder = asynchandler(async (req, res) => {
    const orders = await Order.find({ }).populate('user', 'id name')
    res.json(orders)
    
})


module.exports = {orderController, getOrderbyId, updateOrderById, getMyOrderbyId, getAllOrder}