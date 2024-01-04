import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userShippingAddress } from '../action/cartAction'

const ShippingScreens = () => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart


    const [address, setAddress] = React.useState(shippingAddress.address)
    const [city, setCity] = React.useState(shippingAddress.city)
    const [postalCode, setPostalcode] = React.useState(shippingAddress.postalCode)
    const [country, setCountry] = React.useState(shippingAddress.country)


    const dispatch = useDispatch()
    
    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(userShippingAddress({address, city, postalCode, country}))
    }
    
  return (
      <>
        <Container>
        <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
            <Form onSubmit={submitHandler}>
                   <Form.Group controlId='address'>
              <Form.Label> Address </Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        placeholder='Enter your address'
                        onChange={(event) => setAddress(event.target.value)}
                    >    
              </Form.Control>
                          </Form.Group>   
                <Form.Group controlId='city'>
              <Form.Label> City </Form.Label>
                    <Form.Control
                        type='text'
                        value={city}
                        placeholder='Enter city'
                        onChange={(event) => setCity(event.target.value)}
                    >    
              </Form.Control>
                          </Form.Group>
                <Form.Group controlId='postalCode'>
              <Form.Label> Postal Code </Form.Label>
                    <Form.Control
                        type='text'
                        value={postalCode}
                        placeholder='Enter postal code'
                        onChange={(event) => setPostalcode(event.target.value)}
                    >    
              </Form.Control>
                          </Form.Group>
                <Form.Group controlId='country'>
              <Form.Label> Country </Form.Label>
                    <Form.Control
                        type='text'
                        value={country}
                        placeholder='Enter country'
                        onChange={(event) => setCountry(event.target.value)}
                    >    
              </Form.Control>
                          </Form.Group> 
                <Button type='submit'>Confirm</Button>          
            </Form>            
        </Col>        
        </Row>
        </Container>
    </>
  )
}

export default ShippingScreens
