import React from "react";

export default function JobDescription({ jobDescription }) {
  return (
    <div className="job-notes">
      <h3>JobDescription</h3>
      {jobDescription ? (
        <p>{jobDescription}</p>
      ) : (
        <p>No Job Description added for this job.</p>
      )}
    </div>
  );
}
