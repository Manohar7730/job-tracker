// src\pages\Auth\Register.jsx

// Registration page: allows new users to sign up

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import AuthForm from "./AuthForm.jsx";
import PasswordField from "./PasswordField.jsx";
import FormError from "./FormError.jsx";
import { db } from "../../api/firebase.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "../../styles/AuthContainer.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Name is required.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    try {
      const userCredential = await signup(email, password);
      const uid = userCredential.user.uid;

      // Store user info in Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err.message
      );
    }
  };

  return (
    <AuthForm title="Register an Account" onSubmit={handleSubmit}>
      <FormError message={error} />
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <PasswordField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button type="submit" id="registerButton">Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthForm>
  );
}
