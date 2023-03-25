import React, { useState } from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
       await axios.post(
        "https://note-taker-backend-dhasneem.onrender.com/login",
        { email, password },
        
      );
      navigate("/home");
    } catch (error) {
      if (error?.response?.status === 401) {
        setErrorMessage("Invalid email or password");
      } else if (error?.response?.status === 404) {
        setErrorMessage("User not found. Please register.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };
  
  
  return (
    <div id="main-login">
      <h2 id="login">Login</h2>
      <form onSubmit={handleFormSubmit} id="form">
        <div id="email-login">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div id="password-login">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div id="button">
          <button type="submit" className="btn">Login</button>
          
        </div>
        <Link to="/register" >  <h3 > Click here to Register</h3></Link>
        {errorMessage && <div id="error-msg">{errorMessage}</div>}
      </form>
    </div>
  );
}
export default Login;



