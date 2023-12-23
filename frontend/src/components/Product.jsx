import React from 'react'
import {Card, ListGroup} from 'react-bootstrap'

const Product = ({product}) => {
  return (
      <Card className='my-3 p-3 rounded'>
          <a href={`/product/{product._id}`}>
              <Card.Img variant="top" src={product.image} />
          </a>
          <Card.Body>
              <a href={`/product/{product._id}`}>
                  <Card.Title><strong>{product.name}</strong></Card.Title>
              </a>
        <Card.Text>
          {product.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
              <ListGroup.Item> Rs :- { product.price}</ListGroup.Item>
              <ListGroup.Item>{ product.countInStock}</ListGroup.Item>
              <ListGroup.Item>{ product.rating}</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default Product
