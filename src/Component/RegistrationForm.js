import React, { useContext, useState } from "react";
import './RegistrationForm.css';       
import { Link, Router, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { Route } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  let { user, setUser } = useContext(UserContext);

  let nav = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!username || !email || !password || !address) {
      setError("Please fill in all fields");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, contain at least one uppercase letter and one lowercase letter.");
      return;
    }

    let u = {
      name: username,
      password: password,
      email: email,
      address: address
    };

    axios.post(`http://localhost:8080/user/add`, u).then((res) => {
      if (res.data === "User Added") {
        setUser(u);
        setTimeout(() => {
          nav('/login');
        }, 100);
      } else {
        alert("Email Already Exists!!!");
      }
    }).catch((error) => {
      console.error("error in add user");
      alert("error");
    });

    setError("");
    setSuccess(true);
    console.log("Form submitted:", { username, email, password, address });
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-container">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Add Your Address"
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form> 
        <p>Already Registered </p><Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
