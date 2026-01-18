import { useFormContext } from "react-hook-form";
import { step1Validation } from "../utils/validation";

const Step1PersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      {/* First Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Full Name"
          {...register("full_name", step1Validation.full_name)}
          error={errors.full_name}
        />
        <Input
          label="Father / Spouse Name"
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
          {...register("age", step1Validation.age)}
          error={errors.age}
        />
      </div>

      {/* Third Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Gender"
          {...register("gender", step1Validation.gender)}
          error={errors.gender}
        />
        <Input
          label="Marital Status"
          {...register("marital_status", step1Validation.marital_status)}
          error={errors.marital_status}
        />
      </div>

      {/* Fourth Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nationality"
          {...register("nationality", step1Validation.nationality)}
          error={errors.nationality}
        />
        <Input
          label="Mobile No."
          {...register("mobile_no", step1Validation.mobile_no)}
          error={errors.mobile_no}
        />
      </div>

      {/* Fifth Row - 2 columns */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email ID"
          {...register("email_id", step1Validation.email_id)}
          error={errors.email_id}
        />
        <Input
          label="Aadhaar No."
          {...register("aadhaar_no", step1Validation.aadhaar_no)}
          error={errors.aadhaar_no}
        />
      </div>

      {/* Sixth Row - 1 column */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="PAN No."
          {...register("pan_no", step1Validation.pan_no)}
          error={errors.pan_no}
        />
      </div>

      {/* Address Fields - Full Width */}
      <div className="space-y-4 mt-6">
        <h4 className="text-sm font-medium text-neutral-700">Address Details</h4>
        
        <Textarea
          label="Current Address"
          {...register("current_address", { required: "Current address is required" })}
          error={errors.current_address}
          rows={3}
          placeholder="Enter your current residential address"
        />

        <Textarea
          label="Permanent Address"
          {...register("permanent_address", { required: "Permanent address is required" })}
          error={errors.permanent_address}
          rows={3}
          placeholder="Enter your permanent address"
        />
      </div>
    </div>
  );
};

export default Step1PersonalDetails;

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-neutral-700">{label}</label>
    <input {...props} className="h-11 border rounded-lg px-3" />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-neutral-700">{label}</label>
    <textarea
      {...props}
      className="rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
