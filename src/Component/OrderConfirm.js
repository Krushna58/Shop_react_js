import React, { useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { OrderContext } from "./OrderContext";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import Navbar1 from "./Navbar1";


function OrderConfirm() {
  let { order } = useContext(OrderContext);
  const location = useLocation();
  const userFromState = location.state?.user;
  const currentUser = userFromState;
  let { user } = useContext(UserContext);

  console.log("Order Data:", order);
  console.log("User Data:", currentUser);

  return (
    <div>
      <Navbar1/>
      <Container className="mt-5">
       
       <h1 style={{marginTop:"100px"}} className="text-center mb-5">My Orders</h1>
       {order.length === 0 ? (
         <h3 className="text-center text-muted">No orders found.</h3>
       ) : null}
 
       <Row className="justify-content-center">
         {order.map((orderItem) => (
           <Col key={orderItem.id} md={4} sm={6} xs={12} className="mb-4">
             {orderItem.shopDTO && (
               <Card border="primary" className="shadow-lg rounded">
                 <Card.Img variant="top" src={orderItem.shopDTO.img} />
                 <Card.Body>
                   <Card.Title className="text-primary">
                     {orderItem.shopDTO.title}
                   </Card.Title>
                   <Card.Text className="text-muted">
                     <strong>Price:</strong> ₹{orderItem.shopDTO.price} <br />
                     <strong>Brand:</strong> {orderItem.shopDTO.brand} <br />
                     <strong>Color:</strong> {orderItem.shopDTO.color} <br />
                     {/* <strong>Size:</strong>{" "}
                     <span className="badge bg-success">{orderItem.size}</span>{" "} */}
                     {/* <br /> */}
                     <strong>Quantity:</strong>{" "}
                     <span className="badge bg-warning text-dark">
                       {orderItem.quantity}
                     </span>
                   </Card.Text>
                 </Card.Body>
               </Card>
             )}
           </Col>
         ))}
       </Row>
       <Link to="/" className="btn btn-secondary mt-3 ms-2">
                 Back
               </Link>
     </Container>

    </div>
    
  );
}

export default OrderConfirm;
