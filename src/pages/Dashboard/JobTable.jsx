import React from "react";
import JobRow from "./JobRow";

export default function JobTable({ filteredJobs, sortConfig, requestSort, handleDelete }) {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort("title")}>Job Title <span>{getSortIndicator("title")}</span></th>
          <th onClick={() => requestSort("company")}>Company <span>{getSortIndicator("company")}</span></th>
          <th>Status</th>
          <th onClick={() => requestSort("appliedDate")}>Applied Date <span>{getSortIndicator("appliedDate")}</span></th>
          <th onClick={() => requestSort("nextDeadline")}>Deadline Date <span>{getSortIndicator("nextDeadline")}</span></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobRow key={job.id} job={job} handleDelete={handleDelete} />)
        ) : (
          <tr><td colSpan="6" style={{ textAlign: "center" }}>No jobs found.</td></tr>
        )}
      </tbody>
    </table>
  );
}