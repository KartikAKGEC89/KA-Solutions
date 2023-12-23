import React from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import {useParams, Link} from 'react-router-dom'

const ProductScreens = () => {
    const { id } = useParams();
    const product = products.find((p) => p._id === id);
    return (
        <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
    <Card className='md-6'>
              <Card.Img variant="top" src={product.image} />
          <Card.Body>
                  <Card.Title><strong>{product.name}</strong></Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
              <ListGroup.Item> Rs :- { product.price}</ListGroup.Item>
              <ListGroup.Item> Current In Stock :-{ product.countInStock}</ListGroup.Item>
              <ListGroup.Item>
                  <Rating 
                      value={product.rating}
                      reviews={product.numReviews}
                  />
              </ListGroup.Item>
          </ListGroup>
               <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
            </Card>
            </>
  )
}

export default ProductScreens