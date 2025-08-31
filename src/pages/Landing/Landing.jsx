// src\pages\Landing\Landing.jsx

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
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
