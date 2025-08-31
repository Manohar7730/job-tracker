// src\pages\Dashboard\jobDetails\JobNotes.jsx

// Component to show notes for a job

import React from "react";

export default function JobNotes({ notes }) {
  return (
    <div className="job-notes">
      <h3>Notes</h3>
      {notes ? <p>{notes}</p> : <p>No notes added for this job.</p>}
    </div>
  );
}
