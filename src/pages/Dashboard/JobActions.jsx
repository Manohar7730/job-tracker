import React from "react";
import { Link } from "react-router-dom";

export default function JobActions({ jobId }) {
  return (
    <div className="job-details-buttons">
      <Link className="action-btn action-back" to="/dashboard">
        Back
      </Link>
      <Link className="action-btn action-edit" to={`/editJob/${jobId}`}>
        Edit
      </Link>
    </div>
  );
}
