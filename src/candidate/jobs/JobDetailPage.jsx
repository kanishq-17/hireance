import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/apply/components/layout/Header';
import CompanyHeader from "./CompanyHeader";
import CompanyJobs from "./CompanyJobs";
import CompanyOverview from "./CompanyOverview";
import JobDescription from "./JobDescription";
import JobHeader from "./JobHeader";
import JobHighlights from "./JobHighlights";
import JobSkills from "./JobSkills";

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  
  const [job, setJob] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!slug) {
        setError('No job specified');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('[JobDetailPage] Fetching job with slug:', slug);
        
        // Fetch job by slug
        const response = await fetch(`http://localhost:5000/api/jobs/${slug}`);
        const result = await response.json();

        if (!result.success) {
          console.error('[JobDetailPage] Job not found');
          setError('Job not found');
          setLoading(false);
          return;
        }

        console.log('[JobDetailPage] Job loaded:', result.job.title);
        setJob(result.job);

        // Fetch other jobs from same company
        console.log('[JobDetailPage] Fetching jobs from:', result.job.company_name);
        const companyResponse = await fetch(
          `http://localhost:5000/api/jobs/company/${encodeURIComponent(result.job.company_name)}?limit=5`
        );
        const companyResult = await companyResponse.json();

        if (companyResult.success) {
          // Filter out current job and map to required format
          const otherJobs = companyResult.jobs
            .filter(j => j.id !== result.job.id)
            .map((j) => ({
              id: j.id,
              position: j.position,
              companyName: j.company_name,
              location: j.location,
              slug: j.slug
            }));
          
          console.log('[JobDetailPage] Found', otherJobs.length, 'other jobs from same company');
          setCompanyJobs(otherJobs);
        } else {
          console.log('[JobDetailPage] No other jobs found from company');
          setCompanyJobs([]);
        }

      } catch (err) {
        console.error('[ERROR] Failed to fetch job:', err);
        setError('Failed to load job details. Please check if backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [slug]);

  const handleApplyClick = () => {
    if (job) {
      console.log('[JobDetailPage] Navigate to apply:', job.slug);
      navigate(`/apply/${job.slug}`);
    }
  };

  // Loading State
  if (loading) {
    return (
      <>
        <Header />
        <section className="w-full bg-neutral-50 px-4 md:px-20 py-8 min-h-screen">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading job details...</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error State
  if (error || !job) {
    return (
      <>
        <Header />
        <section className="w-full bg-neutral-50 px-4 md:px-20 py-8 min-h-screen">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center bg-white rounded-2xl p-8 shadow-xl max-w-md">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
              <p className="text-gray-600 mb-6">
                {error || 'The job you are looking for does not exist.'}
              </p>
              <button
                onClick={() => navigate('/jobs')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                View All Jobs
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Main Content
  return (
    <>
      <Header />
      <section className="w-full bg-neutral-50 px-4 md:px-20 py-8">
        {/* Company Header */}
        <CompanyHeader
          logo={job.company_logo || "/microsoft.svg"}
          banner={job.company_banner || ""}
          position={job.position}
          companyName={job.company_name}
          location={job.location}
          uploadDate={job.created_at}
          onApply={handleApplyClick}
        />

        {/* Premium Job Notice */}
        {job.is_paid_service && job.professional_fee > 0 && (
          <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">Premium Job Application</h3>
                <p className="text-gray-600 text-sm mt-1">
                  This is a premium job opportunity. An application fee of{' '}
                  <span className="font-bold text-purple-600">₹{job.professional_fee}</span> is required to proceed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          {/* Left Section - Job Details */}
          <div className="w-full lg:w-2/3 rounded-2xl bg-white py-8 px-6 md:px-14 shadow-sm">
            {/* Job Description */}
            <JobDescription para={job.description} />

            {/* Job Highlights */}
            {job.key_highlights && job.key_highlights.length > 0 && (
              <JobHighlights keyPoints={job.key_highlights} />
            )}

            {/* Job Skills */}
            {job.required_skills && job.required_skills.length > 0 && (
              <JobSkills skills={job.required_skills} />
            )}
          </div>
          
          {/* Right Section - Job Info Sidebar */}
          <aside className="w-full lg:w-1/3 rounded-2xl p-6 md:p-8 bg-white shadow-sm">
            <JobHeader
              salary={job.salary || "Not specified"}
              industry={job.industry || "N/A"}
              employmentType={job.employment_type || "Full-time"}
              department={job.department || "N/A"}
              email={job.company_email || "N/A"}
              isPaidService={job.is_paid_service}
              professionalFee={job.professional_fee}
            />
          </aside>
        </div>

        {/* Company Section */}
        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          {/* Left Section - Company Overview */}
          <div className="w-full lg:w-2/3 rounded-2xl bg-white py-8 px-6 md:px-14 shadow-sm">
            <CompanyOverview
              logo={job.company_logo || "/microsoft.svg"}
              companyName={job.company_name}
              followers={job.company_followers || "0"}
              about={job.company_about || "No information available"}
            />
          </div>
          
          {/* Right Section - Company Jobs */}
          <aside className="w-full lg:w-1/3 rounded-2xl p-6 md:p-8 bg-white shadow-sm">
            <CompanyJobs
              totalJobs={companyJobs.length}
              jobs={companyJobs}
              companyName={job.company_name}
            />
          </aside>
        </div>
      </section>
    </>
  );
};

export default JobDetailPage;
