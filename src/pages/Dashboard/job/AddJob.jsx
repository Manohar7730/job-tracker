// src\pages\Dashboard\job\AddJob.jsx

// Add a new job application

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../../../hooks/useAuth";
import { db } from "../../../api/firebase";
import "../../../styles/Form.css";

export default function AddJob() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [nextDeadline, setNextDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !company || !appliedDate) {
      alert("Job title, company, and applied date are required!");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "jobs"), {
        uid: user.uid,
        title,
        company,
        status,
        appliedDate,
        nextDeadline,
        notes,
        createdAt: Timestamp.now()
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title*</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />

        <label>Company*</label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />

        <label>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label>Applied Date*</label>
        <input type="date" value={appliedDate} onChange={e => setAppliedDate(e.target.value)} required />

        <label>Next Deadline</label>
        <input type="date" value={nextDeadline} onChange={e => setNextDeadline(e.target.value)} />

        <label>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)}></textarea>

        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add Job"}</button>
      </form>
    </div>
  );
}
