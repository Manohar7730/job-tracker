import React, { useState, useEffect } from "react";
import JobFilters from "./JobFilters";
import JobTable from "./JobTable";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const initialJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "ABC Corp",
      status: "Applied",
      appliedDate: "2025-08-28",
      nextDeadline: "2025-09-05",
      resume: "",
      notes: "New Notes",
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
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateField, setDateField] = useState("appliedDate");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const jobTitles = [...new Set(jobs.map((job) => job.title))];
  const companyTitles = [...new Set(jobs.map((job) => job.company))];

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
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

    if (statusFilter)
      tempJobs = tempJobs.filter((job) => job.status === statusFilter);
    if (jobTitleFilter)
      tempJobs = tempJobs.filter((job) => job.title === jobTitleFilter);
    if (companyFilter)
      tempJobs = tempJobs.filter((job) => job.company === companyFilter);

    if (searchTerm) {
      tempJobs = tempJobs.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    if (sortConfig.key) {
      tempJobs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (fromDate || toDate) {
      tempJobs = tempJobs.filter((job) => {
        const jobDate = new Date(job[dateField]);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        if (from && jobDate < from) return false;
        if (to && jobDate > to) return false;
        return true;
      });
    }

    setFilteredJobs(tempJobs);
  }, [
    jobs,
    searchTerm,
    jobTitleFilter,
    companyFilter,
    statusFilter,
    sortConfig,
    fromDate,
    toDate,
    dateField,
  ]);

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
        filteredJobs={filteredJobs}
        sortConfig={sortConfig}
        requestSort={requestSort}
        handleDelete={handleDelete}
      />
    </div>
  );
}
