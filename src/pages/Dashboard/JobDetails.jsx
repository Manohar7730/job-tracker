import React from "react";
import { useLocation } from "react-router-dom";
import JobInfo from "./JobInfo";
import JobNotes from "./JobNotes";
import JobActions from "./JobActions";
import "../../styles/JobDetails.css";

export default function JobDetails() {
  const location = useLocation();
  const { job } = location.state; // receives job object

  return (
    <div className="job-details-container">
      <JobInfo job={job} />
      <JobNotes notes={job.notes} />
      <JobActions jobId={job.id} />
    </div>
  );
}