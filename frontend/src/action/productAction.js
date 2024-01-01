import axios from "axios"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstant"

export const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
         const { data } = await axios.get('/api/product')
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
         const { data } = await axios.get(`/api/product/${id}`)
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