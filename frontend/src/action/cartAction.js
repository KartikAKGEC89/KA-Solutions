import axios from 'axios'

import { CART_REMOVE_ITEM, CART_ADD_ITEM, CART_SHIPPING_ADDRESS, CART_PAYMENT_METHOD } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://cctv-lsec.onrender.com/api/product/${id}`)
    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeToCart = (id) => async (dispatch, getState) => {

    
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const userShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const cartpaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}