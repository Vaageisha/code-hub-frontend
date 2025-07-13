import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://code-hub-backend-production.up.railway.app/signup", formData);
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/github-mark-white.png" alt="GitHub Logo" className="login-logo" />
        <h1 className="login-title">Sign Up</h1>
        <form className="login-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input name="username" type="text" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input name="email" type="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" onChange={handleChange} required />
          </div>
          <button type="submit">Signup</button>
        </form>
        <div className="login-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
