import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
      <Nav>
          <Nav.Item>
          {step1 ? (<LinkContainer to='/login'>
              <Nav.Link active>Sign In</Nav.Link>
          </LinkContainer>) : (
                  <Nav.Link disabled>Sign In</Nav.Link>
      )}
          </Nav.Item>
          <Nav.Item>
          {step2 ? (<LinkContainer to='/login/shipping'>
              <Nav.Link active>Shipping</Nav.Link>
          </LinkContainer>) : (
                  <Nav.Link disabled>Shipping</Nav.Link>
      )}
          </Nav.Item>
          <Nav.Item>
          {step3 ? (<LinkContainer to='/payment'>
              <Nav.Link active>Payment</Nav.Link>
          </LinkContainer>) : (
                  <Nav.Link disabled>Payment</Nav.Link>
      )}
          </Nav.Item>
          <Nav.Item>
          {step4 ? (<LinkContainer to='/placeOrder'>
              <Nav.Link active>Place Order</Nav.Link>
          </LinkContainer>) : (
                  <Nav.Link disabled>Place Order</Nav.Link>
      )}
          </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
