import Resume from "../../assets/Manohar pediredla.pdf";

export const generateJobs = () => {
  const statuses = ["Applied", "Interview", "Offer", "Rejected"];
  const companies = [
    "ABC Corp",
    "XYZ Ltd",
    "Tech Solutions",
    "OpenAI",
    "MegaSoft",
  ];
  const titles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "DevOps Engineer",
    "QA Tester",
  ];
  const jobs = [];

  for (let i = 1; i <= 50000; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const appliedDate = `2025-08-${String(
      Math.floor(Math.random() * 28) + 1
    ).padStart(2, "0")}`;
    const nextDeadline = `2025-09-${String(
      Math.floor(Math.random() * 28) + 1
    ).padStart(2, "0")}`;
    jobs.push({
      id: i,
      title,
      company,
      status,
      appliedDate,
      nextDeadline,
      resume: Resume,
      applyLink: "_blank",
      jdLink: "_blank",
      notes: `Job notes for ${title} at ${company}`,
      location: "Remote",
      salary: `$${50 + Math.floor(Math.random() * 50)}k`,
      contactEmail: `hr@${company.replace(/\s+/g, "").toLowerCase()}.com`,
    });
  }
  return jobs;
};
