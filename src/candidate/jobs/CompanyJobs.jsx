import { useNavigate } from 'react-router-dom';

const CompanyJobs = ({ totalJobs, jobs, companyName }) => {
  const navigate = useNavigate();

  const handleViewAllJobs = () => {
    // Navigate to jobs listing (you can filter by company later)
    navigate('/jobs');
  };

  return (
    <aside className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-neutral-900 text-lg">Latest Jobs</h4>
        <span className="text-xs text-neutral-500">{totalJobs} jobs</span>
      </div>

      {/* Jobs list */}
      {jobs && jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobItem
              key={job.id}
              title={job.position}
              companyName={job.companyName}
              location={job.location}
              slug={job.slug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-neutral-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm text-neutral-500">No other jobs available</p>
        </div>
      )}

      {/* CTA - FIXED: Dynamic company name */}
      {totalJobs > 0 && (
        <button
          onClick={handleViewAllJobs}
          className="mt-5 w-full text-sm font-medium
          border border-neutral-300 rounded-full py-2
          hover:bg-neutral-100 transition"
        >
          See all jobs from {companyName}
        </button>
      )}
    </aside>
  );
};

export default CompanyJobs;

/* ---------- HELPER ---------- */

const JobItem = ({ title, companyName, location, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (slug) {
      navigate(`/jobs/${slug}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        slug ? 'cursor-pointer hover:bg-neutral-50' : ''
      } p-3 rounded-lg transition-all border border-transparent hover:border-neutral-200`}
    >
      <p className="text-sm font-medium text-neutral-900 mb-1 line-clamp-1">
        {title}
      </p>
      <p className="text-xs text-neutral-500 line-clamp-1">
        {companyName} · {location}
      </p>
    </div>
  );
};
