import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

import { PageHeader, Box, Button } from "@primer/react";
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
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
         <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <h1 style={{ color: "#ffffff", fontSize: "2rem" }}>Sign In</h1>
</div>

        </div>

        <div className="login-box">
          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        <p className="login-redirect">
          New to GitHub? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
