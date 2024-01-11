import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RETURN, GET_MY_ORDER_FAIL, GET_MY_ORDER_SUCCESS, GET_MY_ORDER_REQUEST, GET_MY_ORDER_RESET, GET_ALL_ORDER_REQUEST, GET_ALL_ORDER_SUCCESS, GET_ALL_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET, UPDATE_ORDER_RESET } from '../constants/orderConstants'


export const orderCartReducer = (state = {}, action) => {

    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {}
    }
}


export const getOrderReducer = (state = {loading:true, orderItem: [] , shippingAddress: {}}, action) => {

    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type)
    {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case ORDER_PAY_RETURN:
            return {}
        default:
            return state
    }
}


export const getMyOrderReducer = (state = { orderItem: []}, action) => {

    switch (action.type) {
        case GET_MY_ORDER_REQUEST:
            return {
                loading: true
            }
        case GET_MY_ORDER_SUCCESS:
            return {
                loading: false,
                orderItem: action.payload
            }
        case GET_MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case GET_MY_ORDER_RESET:
            return {orderItem:[]}
        default:
            return state
    }
}


export const getAllOrderAdminReducer =  (state = {order:[]}, action) => {
    switch (action.type) {
        case GET_ALL_ORDER_REQUEST:
            return {
                loading:true
            }
        case GET_ALL_ORDER_SUCCESS:
            return {
                loading: false,
                order:action.payload
            }
        case GET_ALL_ORDER_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        default:
            return state
    }
}

export const payReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return {
                loading:true
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                success:true
            }
        case UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case UPDATE_ORDER_RESET:
            return {}
        default:
            return state
    }
}

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true,
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
    }
}