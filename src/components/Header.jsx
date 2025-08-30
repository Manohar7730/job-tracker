import React from "react";
import { useAuth } from "../hooks/useAuth";
import '../styles/Header.css'

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <h2>
        Welcome {user ? user.email : "User"}
      </h2>
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
}
