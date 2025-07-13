import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button } from "@primer/react";
import { Link } from "react-router-dom";

import logo from "../../assets/github-mark-white.svg";
import "./auth.css";

const Login = () => {
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
  }, [setCurrentUser]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("https://code-hub-backend-production.up.railway.app/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="GitHub Logo" className="login-logo" />
        <h1 className="login-title">Sign in to CodeHub</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

       <div className="login-footer">
  New to CodeHub? <Link to="/signup">Create an account</Link>
</div>

      </div>
    </div>
  );
};

export default Login;
