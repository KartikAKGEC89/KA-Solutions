import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreens = () => {

  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get('/api/products')
      console.log(data)
      setProducts(data)
    }

    fetchProduct()
  }, [])



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
