import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../action/productAction';
import Loader from '../components/loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [rating, setRating] = React.useState('');
  const [numReviews, setNumReviews] = React.useState('');
  const [countInStock, setCountInStock] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  const updateProduct = useSelector((state) => state.updateProduct);
  const { loading, success, error } = updateProduct;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        'https://cctv-lsec.onrender.com/api/upload',
        formData,
        config
      );

      setImage(data); 
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !price || !image || !brand || !category || !rating || !numReviews || !countInStock) {
      alert('Please fill all the fields!');
      return;
    }

    dispatch(
      createProduct(name, image, brand, category, rating, numReviews, price, countInStock)
    );
  };


  useEffect(() => {
    if (success) {
      alert('Product created successfully!');
      navigate('/');
    }
  }, [success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="numReviews">
            <Form.Label>Num Reviews</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter numReviews"
              value={numReviews}
              onChange={(e) => setNumReviews(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="CountInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit">Create Product</Button>
        </Form>
      )}
    </>
  );
};

export default UpdateProductScreen;