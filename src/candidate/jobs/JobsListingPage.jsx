import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobsListingPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'paid', 'free'

  useEffect(() => {
    fetchJobs(filter);
  }, [filter]);

  const fetchJobs = async (filterType) => {
    try {
      setLoading(true);
      const url = filterType === 'all' 
        ? 'http://localhost:5000/api/jobs'
        : `http://localhost:5000/api/jobs/filter/payment?type=${filterType}`;
        
      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setJobs(result.jobs);
      } else {
        setError('Failed to load jobs');
      }
    } catch (error) {
      console.error('[ERROR] Failed to fetch jobs:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = (slug) => {
    navigate(`/jobs/${slug}`);
  };

  if (loading) {
    return (
      <section className="w-full bg-neutral-50 px-4 md:px-20 py-8 min-h-screen">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-neutral-50 px-4 md:px-20 py-8 min-h-screen">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-neutral-50 px-4 md:px-20 py-8 min-h-screen">
      {/* Header with Filter */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Available Jobs
        </h1>
        
        {/* Filter Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Jobs
          </button>
          <button
            onClick={() => setFilter('free')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'free'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Free Applications
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'paid'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Premium Jobs
          </button>
        </div>

        <p className="text-gray-600">
          Found {jobs.length} job{jobs.length !== 1 ? 's' : ''} for you
        </p>
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Jobs Found
          </h3>
          <p className="text-gray-600">
            Please check back later for new opportunities
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job.slug)}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 duration-200 relative"
            >
              {/* Premium Badge */}
              {job.is_paid_service && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </span>
                </div>
              )}

              {/* Company Logo & Header */}
              <div className="flex items-start gap-4 mb-4">
                {job.company_logo ? (
                  <img
                    src={job.company_logo}
                    alt={job.company_name}
                    className="w-12 h-12 object-contain rounded-lg border border-gray-200 p-1"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {job.company_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                    {job.position}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    {job.company_name}
                  </p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span className="truncate">{job.location}</span>
                </p>
                {job.salary && (
                  <p className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <span className="truncate">{job.salary}</span>
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <span className="text-lg">💼</span>
                  <span className="truncate">{job.employment_type}</span>
                </p>
                {job.industry && (
                  <p className="flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    <span className="truncate">{job.industry}</span>
                  </p>
                )}
                {/* Professional Fee */}
                {job.is_paid_service && job.professional_fee > 0 && (
                  <p className="flex items-center gap-2">
                    <span className="text-lg">💳</span>
                    <span className="truncate font-semibold text-purple-600">
                      Application Fee: ₹{job.professional_fee}
                    </span>
                  </p>
                )}
              </div>

              {/* Skills Tags */}
              {job.required_skills && job.required_skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.required_skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.required_skills.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                      +{job.required_skills.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Posted {new Date(job.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <div className="flex gap-2">
                  {!job.is_paid_service && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Free
                    </span>
                  )}
                  {job.status === 'active' && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default JobsListingPage;
