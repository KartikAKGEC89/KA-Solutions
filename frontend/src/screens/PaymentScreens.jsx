import React from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartpaymentMethod } from '../action/cartAction'
import CheckoutSteps from '../components/checkoutSteps'

const PaymentScreens = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { paymentMethod } = cart

    const [payment, setPayment] = React.useState(paymentMethod)

    const submithandler = (event) => {
        event.preventDefault()
        dispatch(cartpaymentMethod(payment))
        navigate('/placeorder')
    }
  return (
      <Container className='margin-content-md-aling-center'>
          <CheckoutSteps step1 step2 step3/>
          <Row>
              <Col>
                  <h1>Complete Payment ....</h1>
                  <Form onSubmit={submithandler}>
                      <Form.Label>Select Payment Method</Form.Label>
                      <Form.Group>
                          <Form.Check
                              type='radio'
                              label='Cash On Delivery'
                              id='onDelivery'
                              name='onDelivery'
                              value='onDelivery'
                              onChange={(e)=> setPayment(e.target.value)}
                          >
                          </Form.Check>
                          <Form.Check
                              type='radio'
                              label='Online'
                              id='paypal'
                              name='paypal'
                              value='Online'
                              onChange={(e)=> setPayment(e.target.value)}
                          >
                          </Form.Check>
                      </Form.Group>
                      <Button type='submit' >Confirm</Button>
                  </Form>
              </Col>
          </Row>  
    </Container>
  )
}

export default PaymentScreens
