// src\pages\Dashboard\jobDetails\JobInfo.jsx

import React from "react";

export default function JobInfo({ job }) {
  return (
    <div className="job-info">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Applied Date:</strong> {job.appliedDate}</p>
      <p><strong>Next Deadline:</strong> {job.nextDeadline || "N/A"}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Contact:</strong> {job.contactEmail}</p>
      <p>
        <strong>Resume:</strong> {job.resumeLink ? <a href={job.resumeLink} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
      </p>
      <p>
        <strong>Job Description:</strong> {job.jdLink ? <a href={job.jdLink} target="_blank" rel="noopener noreferrer">View</a> : "N/A"}
      </p>
    </div>
  );
}
