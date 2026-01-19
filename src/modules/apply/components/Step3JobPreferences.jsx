import { useFormContext } from "react-hook-form";

const Step3JobPreferences = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Section title="Job Title">
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Position Applied For"
          placeholder="Frontend Developer"
          {...register("position", { required: "Position is required" })}
          error={errors.position}
        />

        <Input
          label="Department / Project"
          placeholder="Engineering / Product"
          {...register("department", { required: "Department is required" })}
          error={errors.department}
        />

        <Input
          type="date"
          label="Expected Joining Date"
          {...register("joiningDate", { required: "Joining date is required" })}
          error={errors.joiningDate}
        />

        <Input
          label="Expected Salary (CTC)"
          placeholder="e.g. 10,00,000"
          {...register("expectedSalary", {
            required: "Expected salary is required",
          })}
          error={errors.expectedSalary}
        />
      </div>
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
      focus:outline-none focus:ring-2 focus:ring-black/10"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
