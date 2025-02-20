import React, { useState } from "react";
import "./LoginForm.css"
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "./UserContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let { user, setUser } = useContext(UserContext);
  let nav = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if(email==="bhosalekrushna34@gmail.com" && password==="123456"){
        alert("Login successfull!!!")
        nav('/add')
    }
    else{
        alert("Invalid credentials!!!")
    }
}

  

  return (
    <div className='container-fluid'>
      <div className="login-container">
        <div className="login-box">
          <h2>Admin Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
