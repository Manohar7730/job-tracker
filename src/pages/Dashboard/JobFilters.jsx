// src\pages\Dashboard\JobFilters.jsx

// Filter and search section for Dashboard

import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobFilters({
  searchTerm, setSearchTerm,
  jobTitleFilter, setJobTitleFilter,
  companyFilter, setCompanyFilter,
  statusFilter, setStatusFilter,
  fromDate, setFromDate,
  toDate, setToDate,
  dateField, setDateField,
  jobTitles, companyTitles,
  clearFilters
}) {
  const navigate = useNavigate();

  const handleAdd = () => navigate("/addJob");

  return (
    <div className="dashboard-filters">
      <input type="text" placeholder="Search by title or company" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={handleAdd}>Add Job</button>

      <select value={jobTitleFilter} onChange={e => setJobTitleFilter(e.target.value)}>
        <option value="">All Job Titles</option>
        {jobTitles.map(title => <option key={title} value={title}>{title}</option>)}
      </select>

      <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)}>
        <option value="">All Companies</option>
        {companyTitles.map(company => <option key={company} value={company}>{company}</option>)}
      </select>

      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select value={dateField} onChange={e => setDateField(e.target.value)}>
        <option value="appliedDate">Applied Date</option>
        <option value="nextDeadline">Next Deadline</option>
      </select>

      <label>From</label>
      <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
      <label>To</label>
      <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}
