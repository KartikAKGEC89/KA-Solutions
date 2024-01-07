import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import placeOrder from './placeOrder.jpg'
import CheckoutSteps from '../components/checkoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderAction } from '../action/orderAction';
import {useNavigate} from 'react-router-dom'
const PlaceOrderScreens = () => {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  const orderReducer = useSelector(state => state.orderReducer)
  const { order, success, error } = orderReducer

  

  React.useEffect(() => {
    if (order) {
       navigate(`/order/${order._id}`)
    }  
    // eslint-disable-next-line
  }, [navigate, success])

  const handlesubmit = (event) => {
      event.preventDefault()
      dispatch(placeOrderAction({
          orderItem: cart.cartItems, shippingAddress: cart.shippingAddress, paymentMethod: cart.paymentMethod,itemsPrice: cart.itemsPrice, taxPrice: cart.taxPrice, shippingPrice: cart.shippingPrice, totalPrice: cart.itemsPrice 
        }))
    }
    

  return (
      <>
          <CheckoutSteps step1 step2 step3 step4 />
        <Card>
      <Card.Img variant="top" src={placeOrder} style={{height: '50vh'}}/>
      <Card.Body>
        <Card.Title>Order Summary</Card.Title>
        <Card.Text>
          Thanks for buying. Your total payment in Rs:- <strong>{cart.itemsPrice}</strong>
        </Card.Text>
          <Button variant="primary" disabled={cart.cartItems === 0} onClick={handlesubmit}>Place Order</Button>
          
          {
            error && alert('Order not place right now server not responding !!')
          }
      </Card.Body>
    </Card> 
    </>
  )
}

export default PlaceOrderScreens