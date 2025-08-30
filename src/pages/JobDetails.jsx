import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/JobDetails.css";

export default function JobDetails() {
  const { id } = useParams();

  const location = useLocation();
  const { job } = location.state; // gets the job object

  return (
    <div className="job-details-container">
      <h2>{job.title}</h2>
      <br />
      <h3>Company: {job.company}</h3>
      <p>Status: {job.status}</p>
      <p>Applied Date: {job.appliedDate}</p>
      <p>Next DeadLine: {job.nextDeadline}</p>
      <br />
      <h4>Notes: </h4>
      <pre>{job.notes ? job.notes : "No Notes"}</pre>
      <p>
        Resume: <a href={job.resume} target="_blank">View</a>
      </p>
      <div className="job-details-buttons">
        <button className="back-btn">
          <Link to={"/dashboard"}>Back</Link>
        </button>
        <button className="edit-btn">
          <Link to={`/editJob/${job.id}`}>Edit</Link>
        </button>
      </div>
    </div>
  );
}
