import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector}  from 'react-redux'
import { listProducts } from '../action/productAction'
import Loader from '../components/loader'
import Messages from '../components/messages'
import { useNavigate } from 'react-router'

const HomeScreens = () => {

  const dispatch = useDispatch()
  const navigate=useNavigate()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  
  const handleClick = () => {
    navigate('/chatbot')
  }

  React.useEffect(() => {
     dispatch(listProducts())
  }, [dispatch])

  return (
    <>
    {loading ? (
        <Loader />
      ) : error ? (
        <Messages />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
          <Button onClick={handleClick}> ChatBot </Button>
        </Row>
      )}
    </>
  )
}

export default HomeScreens
