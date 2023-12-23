import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
      <Card className='my-3 p-3 rounded'>
    <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
        </Link>
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
    </Card>
  )
}

export default Product
