// src\pages\Auth\AuthForm.jsx

// Generic authentication form wrapper

import React from "react";

export default function AuthForm({ title, children, onSubmit }) {
  return (
    <div className="auth-container">
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
}