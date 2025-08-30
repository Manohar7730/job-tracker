import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "./AuthForm";
import PasswordField from "./PasswordField";
import FormError from "./FormError";
import { db } from "../../api/firebase"; // Firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import '../../styles/AuthContainer.css'

export default function Register() {
  const [name, setName] = useState(""); // <-- new
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await signup(email, password);
      const uid = userCredential.user.uid;

      // Save name & email in Firestore
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
      
      {/* New Name Field */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        name="password"
      />
      <PasswordField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        name="confirmPassword"
      />
      <button type="submit" id="registerButton">Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthForm>
  );
}
