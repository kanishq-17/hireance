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

  const dob = watch("date_of_birth");

  // Auto-calculate age when DOB changes
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setValue("age", age);
    } else {
      setValue("age", "");
    }
  }, [dob, setValue]);

  return (
    <div className="space-y-4">
      {/* First Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          {...register("full_name", step1Validation.full_name)}
          error={errors.full_name}
        />
        <Input
          label="Father / Spouse Name"
          placeholder="Enter father or spouse name"
          {...register("father_spouse_name", step1Validation.father_spouse_name)}
          error={errors.father_spouse_name}
        />
      </div>

      {/* Second Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          label="Date of Birth"
          {...register("date_of_birth", step1Validation.date_of_birth)}
          error={errors.date_of_birth}
        />
        <Input
          type="number"
          label="Age"
          placeholder="Auto calculated"
          disabled
          {...register("age")}
          error={errors.age}
        />
      </div>

      {/* Third Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Gender"
          {...register("gender", step1Validation.gender)}
          error={errors.gender}
          options={["Male", "Female", "Other"]}
        />
        <Select
          label="Marital Status"
          {...register("marital_status", step1Validation.marital_status)}
          error={errors.marital_status}
          options={["Single", "Married", "Divorced", "Widowed"]}
        />
      </div>

      {/* Fourth Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nationality"
          placeholder="Indian"
          {...register("nationality", step1Validation.nationality)}
          error={errors.nationality}
        />
        <Input
          label="Mobile No."
          placeholder="10 digit mobile number"
          maxLength={10}
          {...register("mobile_no", step1Validation.mobile_no)}
          error={errors.mobile_no}
        />
      </div>

      {/* Fifth Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email ID"
          type="email"
          placeholder="example@email.com"
          {...register("email_id", step1Validation.email_id)}
          error={errors.email_id}
        />
        <Input
          label="Aadhaar No."
          placeholder="XXXX XXXX XXXX"
          maxLength={12}
          {...register("aadhaar_no", step1Validation.aadhaar_no)}
          error={errors.aadhaar_no}
        />
      </div>

      {/* Sixth Row - 1 column */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="PAN No."
          placeholder="ABCDE1234F"
          maxLength={10}
          style={{ textTransform: 'uppercase' }}
          {...register("pan_no", step1Validation.pan_no)}
          error={errors.pan_no}
        />
      </div>

      {/* Address Fields - Full Width */}
      <div className="space-y-4 mt-6">
        <h4 className="text-sm font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
          Address Details
        </h4>
        
        <Textarea
          label="Current Address"
          {...register("current_address", step1Validation.current_address)}
          error={errors.current_address}
          rows={3}
          placeholder="Enter your current residential address"
        />

        <Textarea
          label="Permanent Address"
          {...register("permanent_address", step1Validation.permanent_address)}
          error={errors.permanent_address}
          rows={3}
          placeholder="Enter your permanent address"
        />
      </div>
    </div>
  );
};

export default Step1PersonalDetails;

/* ---------- UI HELPERS ---------- */

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-neutral-700">{label}</label>
    <input
      {...props}
      className="h-11 border border-neutral-300 rounded-lg px-3 
      focus:outline-none focus:ring-2 focus:ring-black/10 
      disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-neutral-700">{label}</label>
    <select
      {...props}
      className="h-11 border border-neutral-300 rounded-lg px-3 bg-white
      focus:outline-none focus:ring-2 focus:ring-black/10"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-neutral-700">{label}</label>
    <textarea
      {...props}
      className="rounded-lg border border-neutral-300 px-3 py-2 
      focus:outline-none focus:ring-2 focus:ring-black/10 
      resize-none"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
