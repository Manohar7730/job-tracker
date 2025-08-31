// src\components\PublicRoute.jsx

// Public routes accessible only for unauthenticated users

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <Navigate to="/dashboard" /> : children;
}
