import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import { getUserDetails, updateUserProfile } from '../action/userAction.js'
import { useNavigate } from 'react-router-dom'
import { getMyOrderdetails } from '../action/orderAction.js'


const ProfileScreens = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const {  error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const getMyOrder = useSelector((state) => state.getMyOrder)
  const {loading, orderItem, error:getMyOrdererror} = getMyOrder

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrderdetails('orderItem'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && alert('Error Try again later')}
        {success && alert('Profile Updated')}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password Address</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col xs={ 12} md={9}>
        <h2>My Orders</h2>
        {
          loading ? <Loader /> : getMyOrdererror
        }
        <Table striped="columns" className='table-sm'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Price</th>
              <th>Order Date</th>
              <th>Details</th>
        </tr>
          </thead>
          {
            orderItem && orderItem.map((item )=> (
          <tbody key={item._id}>
            
        <tr>
                  <td>{item._id.substring(18, 24)}</td>
                  <td>{ item.totalPrice}</td>
                  <td>{item.createdAt.substring(0, 10)}</td>
                  <td>
                    {
                      item.isPaid ? "Paid" : "UnPaid"
                    }
                    <br />
                    {
                      item.isDelivered? "Delivered" :"Not Delivered"
                    }
                  </td>
        </tr>
      </tbody>
            ))
          }
    </Table>
      </Col>
    </Row>
  )
}

export default ProfileScreens