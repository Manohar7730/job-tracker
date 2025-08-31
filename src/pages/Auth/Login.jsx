// src\pages\Auth\Login.jsx

// Login page: allows existing users to log in

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import AuthForm from "./AuthForm.jsx";
import PasswordField from "./PasswordField.jsx";
import FormError from "./FormError.jsx";
import "../../styles/AuthContainer.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthForm title="Login to Your Account" onSubmit={handleSubmit}>
      <FormError message={error} />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" id="loginButton">Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </AuthForm>
  );
}
