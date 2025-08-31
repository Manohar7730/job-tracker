// src\pages\Dashboard\Dashboard.jsx

// Main Dashboard page: shows jobs list, filters, pagination, sorting

import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth.js";
import { db } from "../../api/firebase.js";
import JobFilters from "./JobFilters.jsx";
import JobTable from "./JobTable.jsx";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateField, setDateField] = useState("appliedDate");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;

  // Fetch jobs for the user
  useEffect(() => {
    if (!user) return;
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "jobs"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        const allJobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(allJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  // Unique job titles and companies for filters
  const jobTitles = [...new Set(jobs.map(job => job.title))];
  const companyTitles = [...new Set(jobs.map(job => job.company))];

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setSearchTerm(""); setJobTitleFilter(""); setCompanyFilter(""); setStatusFilter("");
    setFromDate(""); setToDate(""); setDateField("appliedDate");
    setSortConfig({ key: "", direction: "asc" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  // Apply search, filters, sorting
  useEffect(() => {
    let tempJobs = [...jobs];

    if (statusFilter) tempJobs = tempJobs.filter(job => job.status === statusFilter);
    if (jobTitleFilter) tempJobs = tempJobs.filter(job => job.title === jobTitleFilter);
    if (companyFilter) tempJobs = tempJobs.filter(job => job.company === companyFilter);

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      tempJobs = tempJobs.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
      );
    }

    if (sortConfig.key) {
      tempJobs.sort((a, b) => {
        const valA = a[sortConfig.key] || "";
        const valB = b[sortConfig.key] || "";
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (fromDate || toDate) {
      tempJobs = tempJobs.filter(job => {
        const jobDate = new Date(job[dateField]);
        const start = fromDate ? new Date(fromDate) : null;
        const end = toDate ? new Date(toDate) : null;
        if (start && jobDate < start) return false;
        if (end && jobDate > end) return false;
        return true;
      });
    }

    setFilteredJobs(tempJobs);
    setCurrentPage(1);
  }, [jobs, searchTerm, jobTitleFilter, companyFilter, statusFilter, fromDate, toDate, dateField, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexStart = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(indexStart, indexStart + jobsPerPage);

  const getPageNumbers = () => {
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) range.push(i);
      else if (range[range.length - 1] !== "...") range.push("...");
    }
    return range;
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading jobs...</p>;

  return (
    <div className="dashboard">
      <JobFilters
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        jobTitleFilter={jobTitleFilter} setJobTitleFilter={setJobTitleFilter}
        companyFilter={companyFilter} setCompanyFilter={setCompanyFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        fromDate={fromDate} setFromDate={setFromDate}
        toDate={toDate} setToDate={setToDate}
        dateField={dateField} setDateField={setDateField}
        jobTitles={jobTitles} companyTitles={companyTitles}
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
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          {getPageNumbers().map((num, idx) =>
            num === "..." ? <span key={idx} className="dots">...</span> :
            <button key={idx} className={currentPage === num ? "active" : ""} onClick={() => setCurrentPage(num)}>{num}</button>
          )}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
