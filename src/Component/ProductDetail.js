import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar1 from "./Navbar1";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [item, setItems] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (!item) {
      return;
    }

    const cartItem = {
      shopDTO: {
        id: item.id,
        title: item.title,
        price: item.price,
        brand: item.brand,
        description: item.description,
        color: item.color,
        sizes: item.sizes,
      },
      quantity: quantity,
    };

    axios
      .post("http://localhost:8080/cart", cartItem)
      .then((response) => {
        console.log("Product added to cart:", response.data);
        alert("Product added to cart");
      })
      .catch((error) => {
        console.error("Error in add to cart", error);
        alert("Failed to add product to cart");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getbyid/${id}`)
      .then((response) => setItems(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container id="detail">
       <Navbar1 /> 
      <Row className="align-items-center">
        {/* Left Column - Image */}
        <Col md={6} id="img">
          <Card.Img variant="top" src={item.img} />
        </Col>

        {/* Right Column - Details */}
        <Col md={6}>
          <Card border="info">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {item.description} <br />
                <strong>Price:</strong> ₹{item.price} <br />
                <strong>Brand:</strong> {item.brand} <br />
                <strong>Sizes:</strong> {item.sizes} <br />
                <strong>Available Colors: </strong> {item.color}
                <div className="d-flex align-items-center">
                  <label htmlFor="quantity" className="me-2">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-select w-auto"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </Card.Text>
              <Link
                onClick={handleAddToCart}
                className="btn btn-secondary mt-3 ms-2"
              >
                Add To Cart
              </Link>
              <Link to="/" className="btn btn-secondary mt-3 ms-2">
                Back
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
