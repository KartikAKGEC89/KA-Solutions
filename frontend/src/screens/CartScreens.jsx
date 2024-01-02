import React, { useEffect } from 'react'
import { Row, Col,Image,Card, ListGroup, Button, Form } from 'react-bootstrap'
import { useParams, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeToCart } from '../action/cartAction' 
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from "react-router-dom"

const CartScreens = () => {
  const params = useParams();
  const location = useLocation();
  const productId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector(state => state.cart)

  const { cartItems } = cart
  
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty)) 
    }
  }, [dispatch, productId, qty])


  const removeFromCartHandler = (id) => {
    dispatch(removeToCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }
  
  return (
    <Row>
      <Col md={8}>
        <h5>Shopping Cart</h5>
        {
          cartItems.length === 0 ? (
            <ToastContainer className="position-static" style={{backgroundColor: 'Green'}}>
      <Toast>
                  <Toast.Body style={{fontSize: '20px', fontWeight: 'bold'}}>Empty Cart <Link to='/'>Go Back</Link> </Toast.Body>
      </Toast>
    </ToastContainer> 
          ) :
            (
             <ListGroup variant='info'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Rs:- {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='info'>
            <ListGroup.Item style={{fontWeight:'bolder'}}>
              <h1>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h1>
              Rs:- 
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                }
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreens
