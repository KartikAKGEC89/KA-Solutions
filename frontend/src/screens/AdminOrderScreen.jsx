import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrderAdmin } from '../action/orderAction.js'
import Loader from '../components/loader.jsx'
import {Table} from 'react-bootstrap'

const AdminOrderScreen = () => {

    const getAllAdminOrder = useSelector(state => state.getAllAdminOrder)
    const { loading, order, error } = getAllAdminOrder
    
    const dispatch =useDispatch()

    React.useEffect(() => {
        dispatch(getAllOrderAdmin())
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
                <td>{item.isPaid}</td>
                <td>{item.isDelivered}</td>
        </tr>
      </tbody>
          ))}        
    </Table>
            )}
    </>
  )
}

export default AdminOrderScreen