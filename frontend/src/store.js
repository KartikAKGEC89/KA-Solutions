import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsDeleteReducer, productDetailsReducer, productListReducer, productReviewReducer, productUpdateReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userAdminDetailsReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'
import {getAllOrderAdminReducer, getMyOrderReducer, getOrderReducer, orderCartReducer, orderDeliverReducer, orderPayReducer, payReducer} from './reducers/orderCartReducer'


const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderReducer: orderCartReducer,
    getOrder: getOrderReducer,
    payOrder: orderPayReducer,
    getMyOrder: getMyOrderReducer,
    adminUser:userAdminDetailsReducer,
    deleteProductById: productDetailsDeleteReducer,
    updateProduct: productUpdateReducer,
    getAllAdminOrder: getAllOrderAdminReducer,
    updatepay: payReducer,
    orderDeliver: orderDeliverReducer,
    reviewProduct: productReviewReducer
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
    : null
    
const shippingAddressInfoFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}
  
const initialState = {
    cart: { cartItems: cartItemFromStorage, shippingAddress: shippingAddressInfoFromStorage },
    userLogin: { userInfo: userInfoFromStorage },

}

const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
)

export default store
