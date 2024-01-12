import React from 'react'
import { Row, Col,Image,Card, ListGroup, Button, Form, Toast } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProducts } from '../action/productAction'
import { reviewProducts } from '../action/productAction.js'
import Loader from '../components/loader'
import Messages from '../components/messages'
import { useNavigate } from "react-router-dom"
import { PRODUCT_REVIEW_RESET } from '../constants/productConstant.js'

const ProductScreens = () => {
  const [qty, setQty] = React.useState(1)
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState('')
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const reviewProduct = useSelector(state => state.reviewProduct)
  const { error: errorReview, success } = reviewProduct
  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  
  React.useEffect(() => {
     if (success) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_REVIEW_RESET })
    }
    dispatch(detailsProducts(params.id))
  }, [dispatch, params.id, success])

  const addCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const reviewHandler = (e) => {
    e.preventDefault()
    dispatch(
      reviewProducts(params.id, {
        rating,
        comment,
      })
    )
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
            <>
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
              <Row>
                <Col md={6}>
                  <br></br>
                  <h2>Reviews</h2>
{product.review && product.review.length > 0 ? (
  <ListGroup variant='flush'>
    {product.review.map((reviews) => (
      <ListGroup.Item key={reviews._id}>
        <strong>{reviews.name}</strong>
        <Rating value={reviews.rating} />
        <p>{reviews.createdAt.substring(0, 10)}</p>
        <p>{reviews.comment}</p>
      </ListGroup.Item>
    ))}
  </ListGroup>
) : (
  <Toast style={{ backgroundColor: 'Orange' }}>
    <h2>No Reviews</h2>
  </Toast>
)}

<br></br>
                    
              <ListGroup variant='flush'>

              <h2>Write a Customer Review</h2>
                  {errorReview && (
                    <Toast variant='danger'>{errorReview}</Toast>
                  )}
                  {userInfo ? (
                    <Form onSubmit={reviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <h2>
                      Error <Link to='/login'>sign in</Link> to write a review{' '}
                    </h2>
              )}
               </ListGroup>
                 </Col>
          </Row>
              </>
      )}
    </>
  )
}

export default ProductScreens
