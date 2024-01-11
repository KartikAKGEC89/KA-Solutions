import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Loader from '../components/loader'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOrderdetails, updateAdminPay } from '../action/orderAction.js'
import { Button, Row, Col, Image, Toast } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import QRCode from './Payment.jpg';
import { deliverOrder } from '../action/orderAction.js';

const OrderScreens = () => {

  const { id } = useParams();
  const dispatch = useDispatch()
  const getOrder = useSelector((state) => state.getOrder)
  const { order, loading, error } = getOrder


  const updatepay = useSelector((state) => state.updatepay)
  const { loading: loadingPay } = updatepay

  const orderDeliver= useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
    
  React.useEffect(() => {
    dispatch(getOrderdetails(id)) 
    
  }, [dispatch, id, successDeliver])
  
    const deliverHandler = () => {
      dispatch(deliverOrder(order))
      window.location.reload();
  }

    const paymentHandler = () => {
      dispatch(updateAdminPay(order))
      window.location.reload();
  }

  return (
      <>
          {loading ? (<Loader />) : error ? (alert('Something went wrong')):(
            <Card >
          <Card.Body>
            <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
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
              {
                order.paymentMethod === 'Online' ? 
                  (
                    <Toast variant='success'>
                       <Image src={QRCode} alt='' width={'50%'}/>
                      <Toast.Body>
                  Payment Status update within 24 hrs
                  </Toast.Body>
                </Toast>
                  ) : (
                    <Toast.Body>
                      Payment Status update later
                    </Toast.Body>
                 )
                
              }
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
              Payment Status :- {loadingPay && <Loader />}
            
              {userInfo.isAdmin && !order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={paymentHandler}
                  >
                    Mark As Payment Done
                  </Button>
                </ListGroup.Item>
            )}

            {userInfo.isAdmin && order.isPaid && order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    style={{backgroundColor:'green'}}
                  >
                    Paid
                  </Button>
                </ListGroup.Item>
            )}

        Delivery Status :- {loadingDeliver && <Loader />}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
            )}
            {userInfo.isAdmin && order.isPaid && order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    style={{backgroundColor:'green'}}
                  >
                    Delivered
                  </Button>
                </ListGroup.Item>
            )}
      </Card.Body>
    </Card>  
          )}
    </>
  )
}

export default OrderScreens
