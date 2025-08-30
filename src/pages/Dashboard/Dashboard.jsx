// src/components/Dashboard/Dashboard.js

import React, { useState, useEffect } from "react";
import JobFilters from "./JobFilters";
import JobTable from "./JobTable";
import { generateJobs } from "./jobsData";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const allJobs = generateJobs();
  const [jobs, setJobs] = useState(allJobs);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateField, setDateField] = useState("appliedDate");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;

  const jobTitles = [...new Set(jobs.map((job) => job.title))];
  const companyTitles = [...new Set(jobs.map((job) => job.company))];

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setJobTitleFilter("");
    setCompanyFilter("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setDateField("appliedDate");
    setSortConfig({ key: "", direction: "asc" });
  };

  const handleDelete = (id) => setJobs(jobs.filter((j) => j.id !== id));

  useEffect(() => {
    let tempJobs = [...jobs];

    if (statusFilter) tempJobs = tempJobs.filter((job) => job.status === statusFilter);
    if (jobTitleFilter) tempJobs = tempJobs.filter((job) => job.title === jobTitleFilter);
    if (companyFilter) tempJobs = tempJobs.filter((job) => job.company === companyFilter);

    if (searchTerm)
      tempJobs = tempJobs.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );

    if (sortConfig.key)
      tempJobs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });

    if (fromDate || toDate)
      tempJobs = tempJobs.filter((job) => {
        const jobDate = new Date(job[dateField]);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        if (from && jobDate < from) return false;
        if (to && jobDate > to) return false;
        return true;
      });

    setFilteredJobs(tempJobs);
    setCurrentPage(1);
  }, [jobs, searchTerm, jobTitleFilter, companyFilter, statusFilter, sortConfig, fromDate, toDate, dateField]);

  // Pagination slice
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination numbers
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) range.push(i);
      else if (range[range.length - 1] !== "...") range.push("...");
    }
    return range;
  };

  return (
    <div className="dashboard">
      <JobFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        jobTitleFilter={jobTitleFilter}
        setJobTitleFilter={setJobTitleFilter}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        dateField={dateField}
        setDateField={setDateField}
        jobTitles={jobTitles}
        companyTitles={companyTitles}
        clearFilters={clearFilters}
      />
      <JobTable
        filteredJobs={currentJobs}
        sortConfig={sortConfig}
        requestSort={requestSort}
        handleDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
          {getPageNumbers().map((num, idx) =>
            num === "..." ? <span key={idx} className="dots">...</span> :
              <button
                key={idx}
                className={currentPage === num ? "active" : ""}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
          )}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
