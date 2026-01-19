import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { step3Validation } from "../utils/validation";

const Step3JobPreferences = ({ job }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Pre-fill job details
  useEffect(() => {
    if (job) {
      setValue("position_applied_for", job.position);
      setValue("department_project", job.department || "");
    }
  }, [job, setValue]);

  return (
    <Section title="Job Preferences">
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Position Applied For"
          placeholder="Frontend Developer"
          disabled
          {...register("position_applied_for", step3Validation.position_applied_for)}
          error={errors.position_applied_for}
        />

        <Input
          label="Department / Project"
          placeholder="Engineering / Product"
          disabled
          {...register("department_project", step3Validation.department_project)}
          error={errors.department_project}
        />

        <Input
          type="date"
          label="Expected Date of Joining"
          {...register("expected_date_of_joining", step3Validation.expected_date_of_joining)}
          error={errors.expected_date_of_joining}
        />

        <Input
          type="number"
          label="Expected Salary (CTC)"
          placeholder="e.g. 1000000"
          {...register("expected_salary_ctc", step3Validation.expected_salary_ctc)}
          error={errors.expected_salary_ctc}
        />
      </div>

      {/* Job Details Info */}
      {job && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Job Details</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-blue-600">Company:</span>
              <span className="ml-2 text-blue-900 font-medium">{job.company_name}</span>
            </div>
            <div>
              <span className="text-blue-600">Location:</span>
              <span className="ml-2 text-blue-900 font-medium">{job.location}</span>
            </div>
            <div>
              <span className="text-blue-600">Salary:</span>
              <span className="ml-2 text-blue-900 font-medium">{job.salary || "Not disclosed"}</span>
            </div>
            <div>
              <span className="text-blue-600">Type:</span>
              <span className="ml-2 text-blue-900 font-medium">{job.employment_type}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Step3JobPreferences;

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }) => (
  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 space-y-4">
    <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
    {children}
  </div>
);

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-neutral-700">{label}</label>
    <input
      {...props}
      className="h-11 rounded-lg border border-neutral-300 px-3
      focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
