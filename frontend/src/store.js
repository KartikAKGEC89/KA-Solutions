import { createStore,combineReducers, applyMiddleware,  } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'
import {getMyOrderReducer, getOrderReducer, orderCartReducer, orderPayReducer} from './reducers/orderCartReducer'


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
    getMyOrder: getMyOrderReducer
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

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
