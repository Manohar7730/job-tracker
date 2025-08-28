import React from "react";
import { Link } from "react-router-dom";
import "../styles/Initial.css";

export default function Initial() {
  return (
    <div className="initial-container">
      <h1>Welcome to Job Tracker</h1>
      <button>
        <Link to="/register">Register</Link>
      </button>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
}
