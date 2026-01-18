const CompanyJobs = ({ totalJobs, jobs }) => {
  return (
    <aside className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-neutral-900 text-lg">Latest Jobs</h4>
        <span className="text-xs text-neutral-500">{totalJobs} jobs</span>
      </div>

      {/* Jobs list */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobItem
            key={job.id}
            title={job.position}
            companyName={job.companyName}
            location={job.location}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        className="mt-5 w-full text-sm font-medium
        border border-neutral-300 rounded-full py-2
        hover:bg-neutral-100 transition"
      >
        See all jobs from Microsoft
      </button>
    </aside>
  );
};

export default CompanyJobs;

/* ---------- HELPER ---------- */

const JobItem = ({ title, companyName, location }) => (
  <div>
    <p className="text-sm font-medium text-neutral-900">{title}</p>
    <p className="text-xs text-neutral-500">
      {companyName} · {location}
    </p>
  </div>
);
