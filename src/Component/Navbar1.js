import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import cat from "./Images/cat.jpg";
import { UserContext } from './UserContext';
import axios from 'axios';
function Navbar1() {
  const [open, setOpen] = useState(false);
  let {user}=useContext(UserContext)
  let [newuser, setnewuser]=useState({
    name:"Krushna",
    email:"Krushnabhosale@gmail.com",
    address:"pune"
  })

  useEffect(() => {
    axios
      .post(`http://localhost:8080/user/getbyemail/${user.email}`)
      .then((response) => {
       setnewuser(response.data)
      })
      .catch((error) => {
        console.error("Error in fetching cart items:", error);
      
      });
  }, []);


      

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">The T-Shirt Studio</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>
            <Nav.Link as={Link} to="/registrationform">Register</Nav.Link>

            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            
            <Nav.Link as={Link} to="/vieworders">View Orders</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            <Nav.Link as={Link} to="/adminlogin"> Admin Login</Nav.Link>
            {/* <Nav.Link as={Link} to="/add"> add product</Nav.Link>
            <Nav.Link as={Link} to="/delete">delete product</Nav.Link>
            <Nav.Link as={Link} to="/adminnav">admin nav</Nav.Link> */}

          </Nav>
          <Nav className="ms-3">
            <Nav.Link className="text-white" onClick={() => setOpen(!open)} aria-controls="profile-collapse-text" aria-expanded={open}>
              <img 
                src={cat} 
                alt="Profile" 
                style={{ width: 30, height: 30, borderRadius: '50%' }} 
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div style={{ position: 'absolute', right: '30px', top: '60px', zIndex: 1000 , width:'300px'}}>
        <Collapse in={open}>
          <div id="profile-collapse-text">
            <Card body style={{ width: '300px', textAlign: 'left' }}>
              <strong>{newuser.name}</strong> <br></br>
              <strong>{newuser.email}</strong> <br></br>
              <strong>{newuser.address}</strong>
            </Card>
          </div>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Navbar1;
