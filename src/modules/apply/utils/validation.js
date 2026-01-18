export const step1Validation = {
  full_name: { required: "Full name is required" },
  father_spouse_name: { required: "Father/Spouse name is required" },
  date_of_birth: { required: "Date of birth is required" },
  age: {
    required: "Age is required",
    min: { value: 18, message: "Minimum age is 18" },
  },
  gender: { required: "Gender is required" },
  marital_status: { required: "Marital status is required" },
  nationality: { required: "Nationality is required" },
  mobile_no: {
    required: "Mobile number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Invalid mobile number",
    },
  },
  email_id: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email",
    },
  },
  aadhaar_no: {
    required: "Aadhaar is required",
    pattern: {
      value: /^\d{12}$/,
      message: "Aadhaar must be 12 digits",
    },
  },
  pan_no: {
    required: "PAN is required",
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Invalid PAN format",
    },
  },
  current_address: { 
    required: "Current address is required",
    minLength: { value: 10, message: "Address must be at least 10 characters" }
  },
  permanent_address: { 
    required: "Permanent address is required",
    minLength: { value: 10, message: "Address must be at least 10 characters" }
  },
};

export const step2Validation = {
  qualification: { required: "Qualification is required" },
  institution: { required: "Institution is required" },
  year: { required: "Year is required" },
  percentage: { required: "Percentage is required" },
};

export const step3Validation = {
  position_applied_for: { required: "Position is required" },
  department_project: { required: "Department is required" },
  expected_date_of_joining: { required: "Joining date is required" },
  expected_salary_ctc: { required: "Expected salary is required" },
};

export const step4Validation = {
  experience_background: { required: "Experience background is required" },
  declaration_accepted: { required: "You must accept the declaration" },
};
