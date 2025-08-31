// src\hooks\useAuth.js

// Custom hook to access Auth context
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.jsx";

export function useAuth() {
  return useContext(AuthContext);
}
