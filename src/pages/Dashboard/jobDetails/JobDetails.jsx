// src\pages\Dashboard\jobDetails\JobDetails.jsx

// Job details page with optional notes section

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobNotes from "./JobNotes.jsx";
import "../../../styles/JobDetails.css";

export default function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state;

  if (!job) {
    return (
      <div style={{ textAlign: "center" }}>
        <p>No job details found.</p>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="job-details">
      <h2>{job.title} @ {job.company}</h2>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Applied Date:</strong> {job.appliedDate}</p>
      <p><strong>Next Deadline:</strong> {job.nextDeadline || "N/A"}</p>
      <JobNotes notes={job.notes} />
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}
