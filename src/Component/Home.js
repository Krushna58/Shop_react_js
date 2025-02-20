import React from "react";
import Carousel from "react-bootstrap/Carousel";

import Navbar1 from "./Navbar1";
import s1 from "./Images/slide1.png";
import s2 from "./Images/slide2.png";
import "./Home.css";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import t1 from "./Images/t1.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { Container, Row, Col, Form } from "react-bootstrap";
import "./Footer.css"
import Footer from "./Footer";

function Home() {
  const [cartItem, setCartItem] = useState(null);
  const [items, setItems] = useState([]);
  const [url, seturl] = useState("http://localhost:8080/getall");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [url]);

  //   find by brand-------------------------------------------------------------------------------
  function changeBrand(brand) {
    if (brand === "all") {
      seturl("http://localhost:8080/getall");
    } else {
      seturl(`http://localhost:8080/getbybrand/${brand}`);
    }
  }
  // change Size-------------------------------------------------------------------------------

  function changeSize(size) {
    if (size === "all") {
      seturl("http://localhost:8080/getall");
    } else {
      seturl(`http://localhost:8080/findprice/${size}`);
    }
  }

  //  handle quantity change -------------------------------------------------------------------------------


  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  // -------------------------------------------------------------------------------
  //add to cart----------------------------------------------------------------

  const handleAddToCart = (items) => {
    if (!items) {
      return;
    }

    const cartItem = {
      shopDTO: {
        id: items.id,
        title: items.title,
        price: items.price,
        brand: items.brand,
        description: items.description,
        color: items.color,
        sizes: items.sizes,
        img:items.img
      },
      quantity: Number(quantity)
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

  //---------------------------------------------------------------

  return (
    <div>
        <Navbar1 /> 
      <div id="slide">
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100" src={s1} alt="First slide" />
            <Carousel.Caption>
              <h3 style={{ color: "#2b64cf" }}>Exclusive T-Shirt Collection</h3>
              <p style={{ color: "#2b64cf", fontSize: "large" }}>
                Discover the latest trends with our premium quality T-shirts.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={s2} alt="First slide" />
            <Carousel.Caption>
              {/* <h3 style={{ color:"#2b64cf"}}>Unmatched Comfort & Style</h3> */}
              <p style={{ color: "#2b64cf", fontSize: "large" }}>
                Designed for every occasion, ensuring style and comfort in every
                wear.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={s1} alt="First slide" />
            <Carousel.Caption>
              <h3 style={{ color: "#2b64cf" }}>Best Deals & Offers</h3>
              <p style={{ color: "#2b64cf", fontSize: "large" }}>
                Grab your favorite T-shirts at unbeatable prices. Limited time
                only!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* //search -------------------------------------- */}
      <Container className="p-4 shadow-lg rounded bg-light">
  <h2 className="text-primary mb-4 text-center fw-bold">Filter</h2>
  
  <Row className="mb-3 gy-3">
    <Col md={3}>
      <h2 className="text-primary mb-3 fs-5">Filter By Brand</h2>
      <Form.Select onChange={(e) => changeBrand(e.target.value)} className="shadow-sm border-primary">
        <option disabled>Choose Brand</option>
        <option value={"all"}>All</option>
        <option value={"polo"}>Polo</option>
        <option value={"zara"}>Zara</option>
        <option value={"the t-shirt studio"}>The t-shirt studio</option>
      </Form.Select>
    </Col>

    <Col md={3}>
      <h2 className="text-primary mb-3 fs-5">Filter By Price</h2>
      <Form.Select onChange={(e) => changeSize(e.target.value)} className="shadow-sm border-primary">
        <option value={"all"}>All</option>
        <option value={"400"}>Less than 400</option>
        <option value={"800"}>Less than 800</option>
        <option value={"1000"}>Less than 1000</option>
      </Form.Select>
    </Col>
  </Row>
</Container>


      {/* //end-search -------------------------------------- */}

      <div style={{marginRight:"100px" ,marginLeft:"150px"}}>
        <div id="hproducts">
          {items.map((item) => (
            <Card border="primary" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {/* <strong>Description:</strong> {item.description} <br /> */}
                  <strong>Price:</strong> ₹{item.price} <br />
                  <strong>Brand:</strong> {item.brand} <br/>
                  <strong>Color:</strong> {item.color}
                </Card.Text>
                <Link
                  onClick={() => {
                    handleAddToCart(item);
                  }}
                  className="btn btn-secondary mt-3 ms-2"
                >
                  Add To Cart
                </Link>

                <Link
                  className="btn btn-primary mt-3 ms-2"
                  to={`/productdetail/${item.id}`}
                >
                  View Details
                </Link>
              </Card.Body>

              <div className="d-flex align-items-center">
                <label htmlFor="quantity" className="me-2">
                  Quantity:
                </label>
                <select
                  id="quantity"
                    // Get the individual quantity, default to 1
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
            </Card>
          ))}
        </div>
      </div>

      <Footer/>

    </div>
  );
}

export default Home;
