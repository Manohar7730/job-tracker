// src\pages\Dashboard\jobDetails\JobActions.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function JobActions({ jobId }) {
  return (
    <div className="job-actions">
      <Link className="btn-back" to="/dashboard">
        Back
      </Link>
      <Link className="btn-edit" to={`/editJob/${jobId}`}>
        Edit
      </Link>
    </div>
  );
}
