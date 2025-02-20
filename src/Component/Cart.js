import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { OrderContext } from "./OrderContext";
import { UserContext } from "./UserContext";
import Navbar1 from "./Navbar1";

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  // const [quantity, setQuantity] = useState(1);
let { user, setUser }=useContext(UserContext)
  let {Order, setOrder}=useContext(OrderContext)
 

  
  useEffect(() => {
    axios
      .get("http://localhost:8080/cart")
      .then((response) => {
        console.log("Cart Data:", response.data);
        setCartItem(response.data || []);
        console.log(cartItem);
      })
      .catch((error) => {
        console.error("Error in fetching cart items:", error);
      
      });
  }, []);



  // // Handle size change
  // const handleSizeChange = (id, newSize) => {
  //   setCartItem((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === id ? { ...item, selectedSize: newSize } : item
  //     )
  //   );
  // };

 

  const handleRemoveFromCart = (id) => {
    axios
      .delete(`http://localhost:8080/cart/${id}`)
      .then(() => {
        const updatedCart = cartItem.filter((item) => item.id !== id);
        setCartItem(updatedCart);

        alert("Item was removed from cart");
      })
      .catch((error) => {
        console.error("Error in removing item from cart:", error);
        alert("Failed to remove item from cart");
      });
  };

  const calculateTotal = () => {
    return cartItem
      .reduce(
        (total, item) => total + item.shopDTO.price * (item.quantity || 1),
        0
      )
      .toFixed(2);
  };

  const placeorder = () => {
    const totalAmount = parseFloat(calculateTotal()) * 100;
  
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Check your internet connection.");
      return;
    }
  
    const options = {
      key: "rzp_test_Py1XcyoaWZ9YBX",
      amount: totalAmount,
      currency: "INR",
      name: "Ecommerce",
      description: "Purchase Order",
      handler: function (response) {
        alert("Payment successful!");
        const orderCopy = JSON.parse(JSON.stringify(cartItem));  

        setOrder((prevOrders) => [...prevOrders, ...cartItem]);

      console.log("Updated Order Context:", orderCopy);
     setCartItem([])
     axios.delete('http://localhost:8080/cart').then((res)=>{
      console.log(res);
      
      
     }).catch((error)=>{
console.log(error);

     })
      // Wait for state update before navigating
      setTimeout(() => {
        navigate("/vieworders", { state: { user } });  
      }, 100);

      },
      modal: {
        ondismiss: function () {
          alert("Payment cancelled.");
        },
      },
      theme: { color: "#3399cc" },
    };
  
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };
  

 
  if (cartItem.length === 0) {
    console.log("Cart is empty");
    
    return (
      <div className="container mt-5">
      <Navbar1 />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <h1 className="display-4 text-dark text-center">Cart is Empty!!!</h1>
      </div>
    </div>
    
)

  }
  

  return (
    <div className="container mt-5">
       <Navbar1 /> 
      <div className="row">
        {/* Left Column - Cart Items */}
        <div className="col-md-8">
          <h1 style={{marginTop:"20px"}} className="mb-4 text-center">Shopping Cart</h1>

          <div className="row">
            {cartItem.map((item, index) => (
              <div key={index} className="col-md-6 mb-4">
                {/* 2 items per row */}
                <Card border="info" style={{ width: "100%" }}>
                  <Card.Img variant="top" src={item.shopDTO.img} />
                  <Card.Body>
                    <Card.Title>{item.shopDTO.title}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {item.shopDTO.description}{" "}
                      <br />
                      <strong>Price:</strong> ₹{item.shopDTO.price} <br />
                      <strong>Brand:</strong> {item.shopDTO.brand} <br />
                      <strong>Quantity:</strong>
                      {item.quantity} <br />
                      {/* Sizes Dropdown */}
                      <strong>Sizes:</strong>
                      <select className="form-select mt-2">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                      <br />
                    </Card.Text>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4" style={{marginTop:"70px", position:"fixed", marginLeft:"950px"}}>
          <div id="total" className="p-4 border rounded shadow">
            <h2>Total Price: {calculateTotal()} </h2>

            <button onClick={placeorder} className="btn btn-success mt-3 w-100">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;