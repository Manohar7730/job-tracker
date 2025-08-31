// src\pages\Dashboard\JobTable.jsx

// Jobs table component with sorting

import React from "react";
import JobRow from "./JobRow.jsx";

export default function JobTable({ filteredJobs, sortConfig, requestSort, handleDelete }) {

  const getSortIcon = key => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <table className="jobs-table">
      <thead>
        <tr>
          <th onClick={() => requestSort("title")}>Job Title {getSortIcon("title")}</th>
          <th onClick={() => requestSort("company")}>Company {getSortIcon("company")}</th>
          <th onClick={() => requestSort("status")}>Status {getSortIcon("status")}</th>
          <th onClick={() => requestSort("appliedDate")}>Applied Date {getSortIcon("appliedDate")}</th>
          <th onClick={() => requestSort("nextDeadline")}>Deadline {getSortIcon("nextDeadline")}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredJobs.length === 0 ? (
          <tr><td colSpan="6" style={{ textAlign: "center" }}>No jobs found</td></tr>
        ) : filteredJobs.map(job => (
          <JobRow key={job.id} job={job} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
}
