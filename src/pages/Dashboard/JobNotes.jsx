import React from "react";
export default function JobNotes({ notes }) {
  return (
    <div>
      <h4>Notes:</h4>
      <pre>{notes || "No Notes"}</pre>
    </div>
  );
}