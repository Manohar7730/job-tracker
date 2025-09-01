// src\pages\Dashboard\job\EditJob.jsx

// Edit existing job application

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../api/firebase";
import "../../../styles/Form.css";

export default function EditJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const { job } = location.state;

  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [status, setStatus] = useState(job.status);
  const [appliedDate, setAppliedDate] = useState(job.appliedDate);
  const [nextDeadline, setNextDeadline] = useState(job.nextDeadline);
  const [jobDescription, setJobDescription] = useState(job.jobDescription);
  const [resumeLink, setResumeLink] = useState(job.resumeLink);
  const [appliedLink, setAppliedLink] = useState(job.appliedLink);
  const [notes, setNotes] = useState(job.notes || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "jobs", job.id), {
        title,
        company,
        status,
        appliedDate,
        nextDeadline,
        jobDescription,
        resumeLink,
        appliedLink,
        notes,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Job</h2>
      <form onSubmit={handleUpdate}>
        <label>Job Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Company*</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label>Applied Date*</label>
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          required
        />

        <label>Next Deadline</label>
        <input
          type="date"
          value={nextDeadline}
          onChange={(e) => setNextDeadline(e.target.value)}
        />
        <label>Resume Link</label>
        <input
          type="url"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
        />
        <label>Application Link</label>
        <input
          type="url"
          value={appliedLink}
          onChange={(e) => setAppliedLink(e.target.value)}
        />
        <label>Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
