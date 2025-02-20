import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const LoginForm = () => {
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

    axios
      .post(`http://localhost:8080/user/get/${email}/${password}`)
      .then((res) => {
        console.log(res);

        if (res.data === "user exists") {
          let u = {
            email: email,
            password: password,
          };
          setUser(u);

          setTimeout(() => {
            nav("/");
          }, 100);
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setError("");
    console.log("Form submitted with email:", email, "password:", password);
  };

  return (
    <div className='container-fluid'>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
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
          <p>Don't have an account?</p><Link to={'/registrationform'}> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
