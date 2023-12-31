import React from 'react'
import { Row, Col,Image,Card, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProducts } from '../action/productAction'
import Loader from '../components/loader'
import Messages from '../components/messages'
import { useNavigate } from "react-router-dom"

const ProductScreens = () => {
  const [qty, setQty] = React.useState(1)
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails)

  const { loading, error, product } = productDetails

  
  React.useEffect(() => {
    dispatch(detailsProducts(params.id))
  }, [dispatch, params.id])

  const addCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  
  return (
    <>
      
       <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
    {loading ? (
        <Loader />
      ) : error ? (
        <Messages />
      ) : (
      <Row>
        <Col md={4}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
                <h3>{product.name}</h3>
                <h5>Brand :- {product.brand}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Rs:- {product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Rs :-</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                      </Row>
                    </ListGroup.Item>
                   <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                    )}
                    
                  </ListGroup>

                      <Button
                  onClick={addCartHandler}
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                  </Button> 
                </Card>
               </Col>  
               </Row>
      )}
    </>
  )
}

export default ProductScreens
