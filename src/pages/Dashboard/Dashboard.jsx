import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Resume from "../../assets/Manohar pediredla.pdf";
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
      resume: Resume,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  const [jobTitleFilter, setJobTitleFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateField, setDateField] = useState("appliedDate");
  const navigate = useNavigate();
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
          job.company
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim()) ||
          job.title
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
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
    companyFilter,
    statusFilter,
    jobTitleFilter,
    sortConfig,
    fromDate,
    toDate,
    dateField,
  ]);
  const handleGo = (job) => {
    navigate(`/job/${job.id}`, { state: { job } });
  };
  const handleEdit = (job) => {
    navigate(`/editJob/${job.id}`, { state: { job } });
  };
  const handleDelete = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };
  const handleAddJob = () => {
    navigate("/addJob");
  };
  const jobTitles = [...new Set(jobs.map((job) => job.title))];
  const companyTitles = [...new Set(jobs.map((job) => job.company))];
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };
  const clearFilters = () => {
    setSearchTerm("");
    setJobTitleFilter("");
    setCompanyFilter("");
    setStatusFilter("");
    setSortConfig({ key: "", direction: "asc" });
    setFromDate("");
    setToDate("");
    setDateField("appliedDate");
    setFilteredJobs(initialJobs);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Enter job title or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={jobTitleFilter}
          onChange={(e) => setJobTitleFilter(e.target.value)}
        >
          <option value="">All Job Titles</option>
          {jobTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>

        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="">All Companies</option>
          {companyTitles.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
        >
          <option value="appliedDate">Applied Date</option>
          <option value="nextDeadline">Next Deadline</option>
        </select>
        <label htmlFor="fromDate">From</label>
        <input
          type="date"
          value={fromDate}
          id="fromDate"
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="toDate">To</label>
        <input
          type="date"
          value={toDate}
          id="toDate"
          onChange={(e) => setToDate(e.target.value)}
        />

        <button onClick={clearFilters}>Clear Filters</button>
      </div>
      <div>
        <button onClick={handleAddJob}>+ Add Job</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th
                onClick={() => requestSort("title")}
                className={sortConfig.key === "title" ? "sorted" : ""}
              >
                Job Title{" "}
                <span className="sort-indicator">
                  {getSortIndicator("title")}
                </span>
              </th>
              <th
                onClick={() => requestSort("company")}
                className={sortConfig.key === "company" ? "sorted" : ""}
              >
                Company
                <span className="sort-indicator">
                  {getSortIndicator("company")}
                </span>
              </th>
              <th>Status</th>
              <th
                onClick={() => requestSort("appliedDate")}
                className={sortConfig.key === "appliedDate" ? "sorted" : ""}
              >
                Applied Date
                <span className="sort-indicator">
                  {getSortIndicator("appliedDate")}
                </span>
              </th>
              <th
                onClick={() => requestSort("nextDeadline")}
                className={sortConfig.key === "nextDeadline" ? "sorted" : ""}
              >
                Deadline Date
                <span className="sort-indicator">
                  {getSortIndicator("nextDeadline")}
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td data-label="Job Title">{job.title}</td>
                  <td data-label="Company">{job.company}</td>
                  <td data-label="Status">{job.status}</td>
                  <td data-label="Applied Date">{job.appliedDate}</td>
                  <td data-label="Deadline Date">{job.nextDeadline}</td>
                  <td data-label="Action">
                    <button className="go" onClick={() => handleGo(job)}>
                      Go
                    </button>
                    <button className="edit" onClick={() => handleEdit(job)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
