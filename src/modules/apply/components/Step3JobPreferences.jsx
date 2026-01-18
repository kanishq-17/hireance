import { useFormContext } from "react-hook-form";
import { step3Validation } from "../utils/validation";

const Step3JobPreferences = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-900">Job Preferences</h3>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Position Applied For"
          {...register("position", step3Validation.position)}
          error={errors.position}
        />

        <Input
          label="Department / Project"
          {...register("department", step3Validation.department)}
          error={errors.department}
        />

        <Input
          type="date"
          label="Expected Date of Joining"
          {...register("joiningDate", step3Validation.joiningDate)}
          error={errors.joiningDate}
        />

        <Input
          label="Expected Salary (CTC)"
          placeholder="e.g. 10,00,000"
          {...register("expectedSalary", step3Validation.expectedSalary)}
          error={errors.expectedSalary}
        />
      </div>
    </div>
  );
};

export default Step3JobPreferences;

/* ---------- INPUT COMPONENT ---------- */

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-neutral-700">{label}</label>

    <input
      {...props}
      className="h-11 rounded-lg border border-neutral-300 px-3
      focus:outline-none focus:ring-2 focus:ring-black/10"
    />

    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
