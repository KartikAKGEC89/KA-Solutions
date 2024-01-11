import axios from 'axios'
import { GET_ALL_ORDER_FAIL, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_MY_ORDER_FAIL, GET_MY_ORDER_REQUEST, GET_MY_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL, } from '../constants/orderConstants'


export const placeOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post('/api/order', order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getOrderdetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/order/${id}`, config)

    setTimeout(() => {
       dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data,
    })
    }, 1500)
   
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const payAction = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/order/${id}/pay`, paymentResult, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMyOrderdetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/order/myorder', config)

    setTimeout(() => {
       dispatch({
      type: GET_MY_ORDER_SUCCESS,
      payload: data,
    })
    }, 1500)
   
  } catch (error) {
    dispatch({
      type: GET_MY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const getAllOrderAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/order', config)

    setTimeout(() => {
       dispatch({
      type: GET_ALL_ORDER_SUCCESS,
      payload: data,
    })
    }, 1500)
   
  } catch (error) {
    dispatch({
      type: GET_ALL_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const updateAdminPay = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/order/${order._id}/pay`, {}, config)

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/order/${order._id}/delivery`,
      {},
      config
    )

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}