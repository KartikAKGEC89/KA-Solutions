import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Loader from '../components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderdetails } from '../action/orderAction.js'
import { Row, Col, Image, Toast } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const OrderScreens = () => {

  const { id } = useParams();
  const dispatch = useDispatch()
  const getOrder = useSelector((state) => state.getOrder)
  const { order, loading, error } = getOrder
    
    React.useEffect(() => {
        dispatch(getOrderdetails(id)) 
    }, [])

  return (
      <>
          {loading ? (<Loader />) : error ? (alert('Something went wrong')):(
            <Card >
      <Card.Body>
                  <Card.Title>Order :- { order._id}</Card.Title>
        <Card.Text>
              <strong> Shipping Address :-</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country} 
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
            <ListGroup.Item>Payment Method :- {order.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>Total Price :- { order.totalPrice}</ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItem.length === 0 ? (
                alert('Order Is Empty')
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItem.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs:- {item.price} = Rs:- {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        Delivery Status :- {order.isDelivered ? (
              <Toast variant='success'>
                <Toast.Body>
                  Delivered on {order.deliveredAt}
                  </Toast.Body>
                </Toast>
              ) : (
                <Toast variant='danger'>
                  <Toast.Body>Not Delivered</Toast.Body></Toast>
            )}
            
            Payment Status :- {order.isPaid ? (
                <Toast variant ='success'>
          <Toast.Body>
            Paid
          </Toast.Body>
        </Toast>
              ) : (
                 <Toast variant ='danger'>
          <Toast.Body>
            Not Paid
          </Toast.Body>
        </Toast>
              )}
        
      </Card.Body>
    </Card>  
          )}
    </>
  )
}

export default OrderScreens
