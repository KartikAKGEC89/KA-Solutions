import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../action/productAction';
import Loader from '../components/loader';
import Messages from '../components/messages';
import { useNavigate } from 'react-router';

const HomeScreens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPrice('');
    setSelectedRating('');
  };

  const handleClick = () => {
    navigate('/chatbot');
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '10px',
    zIndex: 1000,
    width: '15vh',
    border: 'none',
    background: 'transparent',
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice =
      selectedPrice === 'low' ? product.price < 100 :
      selectedPrice === 'high' ? product.price >= 100 : true;
    const matchesRating = selectedRating ? product.rating >= selectedRating : true;
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <>
      <Row>
        <Col md={6} className="mx-auto">
          <Form onSubmit={handleSearch} className="d-flex mb-4">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={handleClearSearch}
            >
              Clear
            </Button>
          </Form>
        </Col>

        <Col md={6} className="mb-4 d-flex justify-content-end">
          <Form className="d-flex justify-content-end gap-3">
            <Form.Group controlId="category" className="mb-0">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Vegetable">Vegetable</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="mb-0">
              <Form.Label>Price</Form.Label>
              <Form.Control
                as="select"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="low">Below 100</option>
                <option value="high">100 and above</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rating" className="mb-0">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="4">4 stars and above</option>
                <option value="3">3 stars and above</option>
                <option value="2">2 stars and above</option>
                <option value="1">1 star and above</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Messages />
      ) : (
        Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-4">
            <h3 style={{ backgroundColor: 'black', color: 'white', padding: '10px', width: "210px" }}>
              {category}
            </h3>
            <Row>
              {groupedProducts[category].map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </div>
        ))
      )}

      <Button style={buttonStyle} onClick={handleClick}>
        <img
          src="/images/Chatbot.gif"
          alt="Chatbot"
          style={{ width: '100%' }}
        />
      </Button>
    </>
  );
};

export default HomeScreens;
