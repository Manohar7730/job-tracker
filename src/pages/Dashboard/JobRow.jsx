import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobRow({ job, handleDelete }) {
  const navigate = useNavigate();
  const handleGo = () => navigate(`/job/${job.id}`, { state: { job } });
  const handleEdit = () => navigate(`/editJob/${job.id}`, { state: { job } });

  return (
    <tr>
      <td data-label="Job Title">{job.title}</td>
      <td data-label="Company">{job.company}</td>
      <td data-label="Status">{job.status}</td>
      <td data-label="Applied Date">{job.appliedDate}</td>
      <td data-label="Deadline Date">{job.nextDeadline}</td>
      <td data-label="Action">
        <button className="action-btn action-go" onClick={handleGo}>Go</button>
        <button className="action-btn action-edit" onClick={handleEdit}>Edit</button>
        <button className="action-btn action-delete" onClick={() => handleDelete(job.id)}>Delete</button>
      </td>
    </tr>
  );
}