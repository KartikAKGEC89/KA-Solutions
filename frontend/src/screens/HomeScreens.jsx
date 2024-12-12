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
  const [showSearchResults, setShowSearchResults] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Fetch all products on component mount
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchResults(true); // Display search results
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false); // Show all products again
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

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {showSearchResults && (
              <Button
                variant="secondary"
                className="ms-2"
                onClick={handleClearSearch}
              >
                Clear
              </Button>
            )}
          </Form>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Messages />
      ) : (
        <Row>
          {(showSearchResults ? filteredProducts : products).map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
          <Button style={buttonStyle} onClick={handleClick}>
            <img src="/images/Chatbot.gif" alt="Chatbot" style={{ width: '100%' }} />
          </Button>
        </Row>
      )}
    </>
  );
};

export default HomeScreens;