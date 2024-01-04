import { createStore,combineReducers, applyMiddleware,  } from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer'


const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
    : null

  
const initialState = {
    cart: { cartItems: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
