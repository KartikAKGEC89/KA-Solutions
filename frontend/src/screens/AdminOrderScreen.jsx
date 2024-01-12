import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderAdmin} from '../action/orderAction.js'
import Loader from '../components/loader.jsx'
import { Button, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const AdminOrderScreen = () => {

    const getAllAdminOrder = useSelector(state => state.getAllAdminOrder)
    const { loading, order, error } = getAllAdminOrder
    
    const dispatch =useDispatch()

  React.useEffect(() => {
      window.confirm('Refresh your window')
      dispatch(getAllOrderAdmin('order'))
    }, [dispatch])

  return (
          <>
            <h1>order List</h1>
            {loading ? (<Loader />) : error ? (alert('Api Not Working')) : (
                <Table responsive striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Buyer Name</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Booking Date</th>
          <th>Paid</th>
              <th>Deliver</th>
              <th></th>
        </tr>
              </thead>
    {order.map(item => (
          <tbody key={item._id}>
        <tr>
                <td>{item._id}</td>
                <td>{item.user.name}</td>
                <td>{item.totalPrice}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.createdAt.substring(0, 10)}</td>
                <td> {item.isPaid ? (
                   <strong>Paid</strong>
                  ) : (
                    <i className='fas fa-times'></i>
                  )}</td>
                <td>{item.isDelivered ? (
                    <strong>Delivered</strong>
                  ) : (
                    <i className='fas fa-times'></i>
          )}</td>
          <td>
                  <LinkContainer to={`/order/${item._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
        </tr>
      </tbody>
          ))}        
    </Table>
            )}
    </>
  )
}

export default AdminOrderScreen