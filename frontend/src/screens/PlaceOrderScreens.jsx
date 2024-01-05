import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import placeOrder from './placeOrder.jpg'
import CheckoutSteps from '../components/checkoutSteps';
import { useSelector } from 'react-redux';
const PlaceOrderScreens = () => {

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    const handlesubmit = () => {
        
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
        <Button variant="primary" onClick={handlesubmit}>Place Order</Button>
      </Card.Body>
    </Card> 
    </>
  )
}

export default PlaceOrderScreens