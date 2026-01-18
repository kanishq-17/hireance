import { useFormContext } from "react-hook-form";
import { step1Validation } from "../utils/validation";

const Step1PersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Input
        label="Full Name"
        {...register("fullName", step1Validation.fullName)}
        error={errors.fullName}
      />
      <Input
        label="Father / Spouse Name"
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
        {...register("age", step1Validation.age)}
        error={errors.age}
      />
      <Input
        label="Gender"
        {...register("gender", step1Validation.gender)}
        error={errors.gender}
      />
      <Input
        label="Marital Status"
        {...register("maritalStatus", step1Validation.maritalStatus)}
        error={errors.maritalStatus}
      />
      <Input
        label="Nationality"
        {...register("nationality", step1Validation.nationality)}
        error={errors.nationality}
      />
      <Input
        label="Mobile No."
        {...register("mobile", step1Validation.mobile)}
        error={errors.mobile}
      />
      <Input
        label="Email ID"
        {...register("email", step1Validation.email)}
        error={errors.email}
      />
      <Input
        label="Aadhaar No."
        {...register("aadhaar", step1Validation.aadhaar)}
        error={errors.aadhaar}
      />
      <Input
        label="PAN No."
        {...register("pan", step1Validation.pan)}
        error={errors.pan}
      />
    </div>
  );
};

export default Step1PersonalDetails;

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm">{label}</label>
    <input {...props} className="h-11 border rounded-lg px-3" />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
