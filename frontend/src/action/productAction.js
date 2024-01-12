import axios from "axios"
import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstant"

export const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
         const { data } = await axios.get('https://cctv-lsec.onrender.com/api/product')
        setTimeout(() => {
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        }, 1500)

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
           payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
    
}


export const detailsProducts = (id) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
         const { data } = await axios.get(`https://cctv-lsec.onrender.com/api/product/${id}`)
        setTimeout(() => {
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        }, 1500)

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
           payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
    
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`https://cctv-lsec.onrender.com/api/product/${id}`, config)

    setTimeout(() => {
       dispatch({
      type: PRODUCT_DELETE_SUCCESS
    })
    }, 1500)
   
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (name, image, brand,  category, rating, numReviews, price, countInstock) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('https://cctv-lsec.onrender.com/api/product/create', {name, image, brand,  category, rating, numReviews, price, countInstock}, config)

    setTimeout(() => {
       dispatch({
         type: PRODUCT_UPDATE_SUCCESS,
         payload:data
    })
    }, 1500)
   
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const reviewProducts = (productId, reviews) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`https://cctv-lsec.onrender.com/api/product/${productId}/review`, reviews, config)

    setTimeout(() => {
       dispatch({
         type: PRODUCT_REVIEW_SUCCESS,
    })
    }, 1500)
   
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}