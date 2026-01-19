import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { step1Validation } from "../utils/validation";

const Step1PersonalDetails = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const dob = watch("dob");

  // Auto-calculate age
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue("age", age);
    }
  }, [dob, setValue]);

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <Section title="Personal Information">
        <Grid>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName", step1Validation.fullName)}
            error={errors.fullName}
          />

          <Input
            label="Father / Spouse Name"
            placeholder="Enter father or spouse name"
            {...register("guardianName", step1Validation.guardianName)}
            error={errors.guardianName}
          />

          <Input
            type="date"
            label="Date of Birth"
            {...register("dob", step1Validation.dob)}
            error={errors.dob}
          />

          <Input
            type="number"
            label="Age"
            placeholder="Auto calculated"
            disabled
            {...register("age")}
            error={errors.age}
          />

          <Select
            label="Gender"
            {...register("gender", step1Validation.gender)}
            error={errors.gender}
            options={["Male", "Female", "Other"]}
          />

          <Select
            label="Marital Status"
            {...register("maritalStatus", step1Validation.maritalStatus)}
            error={errors.maritalStatus}
            options={["Single", "Married", "Divorced", "Widowed"]}
          />

          <Input
            label="Nationality"
            placeholder="Indian"
            {...register("nationality", step1Validation.nationality)}
            error={errors.nationality}
          />
        </Grid>
      </Section>

      {/* Contact Info */}
      <Section title="Contact Details">
        <Grid>
          <Input
            label="Mobile Number"
            placeholder="10 digit mobile number"
            {...register("mobile", step1Validation.mobile)}
            error={errors.mobile}
          />

          <Input
            label="Email ID"
            placeholder="example@email.com"
            {...register("email", step1Validation.email)}
            error={errors.email}
          />

          <Input
            label="Aadhaar Number"
            placeholder="XXXX XXXX XXXX"
            {...register("aadhaar", step1Validation.aadhaar)}
            error={errors.aadhaar}
          />

          <Input
            label="PAN Number"
            placeholder="ABCDE1234F"
            {...register("pan", step1Validation.pan)}
            error={errors.pan}
          />
        </Grid>
      </Section>
    </div>
  );
};

export default Step1PersonalDetails;

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }) => (
  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 space-y-4">
    <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-2 gap-5">{children}</div>
);

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-neutral-700">{label}</label>
    <input
      {...props}
      className="h-11 rounded-lg border border-neutral-300 px-3
      focus:outline-none focus:ring-2 focus:ring-black/10 disabled:bg-neutral-100"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-neutral-700">{label}</label>
    <select
      {...props}
      className="h-11 rounded-lg border border-neutral-300 px-3 bg-white
      focus:outline-none focus:ring-2 focus:ring-black/10"
    >
      <option value="">Select</option>
      {options.map((op) => (
        <option key={op} value={op}>{op}</option>
      ))}
    </select>
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
