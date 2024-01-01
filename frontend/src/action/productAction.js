import axios from "axios"
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstant"

export const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
         const { data } = await axios.get('/api/product')
        setTimeout(() => {
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        }, 2000)

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