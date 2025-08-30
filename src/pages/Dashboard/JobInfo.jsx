import React from "react";

export default function JobInfo({ job }) {
  return (
    <>
      <h2>{job.title}</h2>
      <h3>Company: {job.company}</h3>
      <p>Status: {job.status}</p>
      <p>Applied Date: {job.appliedDate}</p>
      <p>Next Deadline: {job.nextDeadline}</p>
      <p>
        Resume:{" "}
        {job.resume ? (
          <a href={job.resume} target="_blank" rel="noopener noreferrer">View</a>
        ) : (
          "N/A"
        )}
      </p>
    </>
  );
}