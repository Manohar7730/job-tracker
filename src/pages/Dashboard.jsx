import React, { useState } from "react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const initialJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "ABC Corp",
      status: "Applied",
      appliedDate: "2025-08-28",
      nextDeadline: "2025-09-05",
    },
    {
      id: 2,
      title: "Front Developer",
      company: "ABC Corp",
      status: "Applied",
      appliedDate: "2025-08-28",
      nextDeadline: "2025-09-05",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "XYZ Ltd",
      status: "Interview",
      appliedDate: "2025-08-20",
      nextDeadline: "2025-09-01",
    },
  ];
  const [jobs, setJobs] = useState(initialJobs);
  const handleGo = (job) => {
    alert(`clicked on ${job.title}`);
  };
  const handleEdit = (job) => {
    alert(`clicked edit on ${job.title}`);
  };
  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };
  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Deadline Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.status}</td>
                <td>{job.appliedDate}</td>
                <td>{job.nextDeadline}</td>
                <td>
                  <button onClick={() => handleGo(job)}>Go</button>
                  <button onClick={() => handleEdit(job)}>Edit</button>
                  <button id="delete" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
