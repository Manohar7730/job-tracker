// src\pages\Auth\FormError.jsx

// Displays form error messages

import React from "react";

export default function FormError({ message }) {
  if (!message) return null;
  return <p style={{ color: "red", marginBottom: "10px" }}>{message}</p>;
}
