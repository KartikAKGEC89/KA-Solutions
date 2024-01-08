import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminUserDetails } from '../action/userAction'
import { Table } from 'react-bootstrap'
import Loader from '../components/loader'

const AdminScreen = () => {
    const dispatch = useDispatch()
    const adminUser = useSelector(state => state.adminUser)
    const { loading, user, error } = adminUser
    
    React.useEffect(() => {
        dispatch(getAdminUserDetails('user'))
    }, [dispatch])
  return (
    <>
      <h1>User List</h1>
          {loading ? (<Loader />) : error ? (alert('Not Fetch User Detail currently')) : (
              <Table responsive striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Created At</th>
        </tr>
              </thead>
    {user.map(smalluser => (
          <tbody key={smalluser._id}>
        <tr>
                <td>{smalluser._id}</td>
                <td>{ smalluser.name}</td>
                <td>{ smalluser.email}</td>
                <td>{ smalluser.createdAt.substring(0,10)}</td>
        </tr>
      </tbody>
          ))}        
    </Table>
          )}
    
    </>
  )
}

export default AdminScreen
