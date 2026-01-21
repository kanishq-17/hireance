import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import ApplyLayout from "../components/ApplyLayout";
import Stepper from "../components/Stepper";
import Step1PersonalDetails from "../components/Step1PersonalDetails";
import Step2Education from "../components/Step2Education";
import Step3JobPreferences from "../components/Step3JobPreferences";
import Step4ExperienceDeclaration from "../components/Step4ExperienceDeclaration";
import useApplyForm from "../hooks/useApplyForm";

const ApplyFormPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);

  const { form, currentStep, nextStep, prevStep, submitForm, loading, error } = useApplyForm(job);

  // Fetch job details
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        alert("No job specified");
        navigate("/jobs");
        return;
      }

      try {
        setJobLoading(true);
        console.log("[ApplyFormPage] Fetching job:", jobId);

        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        const result = await response.json();

        if (result.success) {
          console.log("[ApplyFormPage] Job loaded:", result.job.title);
          setJob(result.job);
          
          // Pre-fill job-related fields
          if (form) {
            form.setValue("position", result.job.position);
            form.setValue("department", result.job.department || "");
          }
        } else {
          console.error("[ApplyFormPage] Job not found");
          alert("Job not found");
          navigate("/jobs");
        }
      } catch (error) {
        console.error("[ApplyFormPage] Error fetching job:", error);
        alert("Failed to load job details. Please check if backend server is running.");
        navigate("/jobs");
      } finally {
        setJobLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, navigate, form]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalDetails />;
      case 2:
        return <Step2Education />;
      case 3:
        return <Step3JobPreferences job={job} />;
      case 4:
        return <Step4ExperienceDeclaration />;
      default:
        return null;
    }
  };

  // Loading state
  if (jobLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading application form...</p>
        </div>
      </div>
    );
  }

  // Error state - Job not found
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load job details. The job may have been removed.</p>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-all"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <ApplyLayout
          title="Employment Application Form"
          subtitle={`Complete all steps to apply for ${job.position} at ${job.company_name}`}
          jobInfo={{
            position: job.position,
            company: job.company_name,
            location: job.location,
            salary: job.salary,
            logo: job.company_logo,
            isPremium: job.is_paid_service,
          }}
          stepper={<Stepper currentStep={currentStep} />}
          currentStep={currentStep}
          footer={
            <>
              {/* Error Message */}
              {error && (
                <div className="flex-1 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {/* Previous Button */}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-all"
                >
                  ← Back
                </button>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Next Button */}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-neutral-800 transition-all"
                >
                  Next →
                </button>
              )}

              {/* Submit Button */}
              {currentStep === 4 && (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit & Pay
                      {job.is_paid_service && ` (₹${job.professional_fee})`}
                    </>
                  )}
                </button>
              )}
            </>
          }
        >
          {renderStep()}
        </ApplyLayout>
      </form>
    </FormProvider>
  );
};

export default ApplyFormPage;
