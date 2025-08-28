import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import view from "../assets/icons/view.png";
import hide from "../assets/icons/hide.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="login">
      <h1>Login an Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={showPassword ? view : hide} alt="toggle password" />
          </button>
        </div>

        <button type="submit" id="loginButton">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <span>
          <Link to="/register">Register</Link>
        </span>
      </p>
    </div>
  );
}
