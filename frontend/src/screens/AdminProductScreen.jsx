import React, { useEffect } from 'react'
import { deleteProduct, listProducts } from '../action/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/loader'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'


const AdminProductScreen = () => {
  const navigate = useNavigate()

    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList

    const deleteProductById = useSelector(state => state.deleteProductById)
    const {success} = deleteProductById
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts('product'))
    }, [dispatch, success])

    const deleteHandler = (id) => {
      dispatch(deleteProduct(id))
  }

  const createHandler = () => {
    navigate('/create')
  }

    return (
        <>
            <h1>Product List</h1>
            <Button onClick={() => createHandler()}>
                <i className='fas fa-plus'></i>  Add New Product
            </Button>
            {loading ? (<Loader />) : error ? (alert('Api Not Working')) : (
                <Table responsive striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>Brand Name</th>
          <th>Item Name</th>
          <th>Price</th>
          <th>Count In Stock</th>
          <th>Delete</th>
        </tr>
              </thead>
    {products.map(product => (
          <tbody key={product._id}>
        <tr>
                <td>{product.brand}</td>
                <td>{ product.name}</td>
                <td>{ product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                    <Button onClick={() => deleteHandler(product._id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                </td>
        </tr>
      </tbody>
          ))}        
    </Table>
            )}
    </>
  )
}

export default AdminProductScreen
