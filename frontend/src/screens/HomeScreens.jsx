import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreens = () => {
  return (
    <>
     <Row>
        {
                  products.map(product =>(
                      <Col sm={12} md={3}>
                          <Product product={product} />
                      </Col>
                  ))
        }         
     </Row> 
    </>
  )
}

export default HomeScreens
