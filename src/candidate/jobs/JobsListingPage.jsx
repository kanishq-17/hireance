import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Building2, Star, CreditCard, Clock } from 'lucide-react';
import Header from '../../modules/apply/components/layout/Header';

const JobsListingPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

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
      <>
        <Header />
        <section className="w-full bg-gray-50 px-4 md:px-20 py-8 min-h-screen">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <p className="mt-6 text-gray-600 font-medium">Loading jobs...</p>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <section className="w-full bg-gray-50 px-4 md:px-20 py-8 min-h-screen">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
            <p className="text-gray-600 mb-6">Unable to load jobs. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="w-full bg-gray-50 min-h-screen">
        {/* Main Content */}
        <div className="px-4 md:px-20 py-10">
          {/* Page Title with Filter */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Available Jobs
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find your next career opportunity
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  filter === 'free'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                Free Applications
              </button>
              <button
                onClick={() => setFilter('paid')}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  filter === 'paid'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                Premium Jobs
              </button>
            </div>
          </div>

          {/* Jobs Grid */}
          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
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
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-200 hover:border-blue-300 group relative overflow-hidden"
                >
                  {/* Premium Badge */}
                  {job.is_paid_service && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        PREMIUM
                      </div>
                    </div>
                  )}

                  {/* Company Logo & Header */}
                  <div className="flex items-start gap-4 mb-5">
                    {job.company_logo ? (
                      <img
                        src={job.company_logo}
                        alt={job.company_name}
                        className="w-14 h-14 object-contain rounded-xl border-2 border-gray-200 p-2 bg-white"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {job.company_name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {job.position}
                      </h3>
                      <p className="text-gray-600 font-medium truncate">
                        {job.company_name}
                      </p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm truncate font-medium">{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-700">
                      <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm truncate">{job.employment_type}</span>
                    </div>
                    {job.industry && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm truncate">{job.industry}</span>
                      </div>
                    )}
                    {job.is_paid_service && job.professional_fee > 0 && (
                      <div className="flex items-center gap-3 text-purple-700 bg-purple-50 -mx-2 px-2 py-2 rounded-lg">
                        <CreditCard className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm font-semibold truncate">
                          Application Fee: ₹{job.professional_fee}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Skills Tags */}
                  {job.required_skills && job.required_skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {job.required_skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium border border-blue-100"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.required_skills.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-medium border border-gray-200">
                          +{job.required_skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <p className="text-xs">
                        {new Date(job.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!job.is_paid_service && (
                        <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold border border-green-200">
                          Free
                        </span>
                      )}
                      {job.status === 'active' && (
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold border border-blue-200">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobsListingPage;
