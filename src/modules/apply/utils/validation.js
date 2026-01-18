export const step1Validation = {
  fullName: { required: "Full name is required" },
  guardianName: { required: "Father/Spouse name is required" },
  dob: { required: "Date of birth is required" },
  age: {
    required: "Age is required",
    min: { value: 18, message: "Minimum age is 18" },
  },
  gender: { required: "Gender is required" },
  maritalStatus: { required: "Marital status is required" },
  nationality: { required: "Nationality is required" },
  mobile: {
    required: "Mobile number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Invalid mobile number",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email",
    },
  },
  aadhaar: {
    required: "Aadhaar is required",
    pattern: {
      value: /^\d{12}$/,
      message: "Aadhaar must be 12 digits",
    },
  },
  pan: {
    required: "PAN is required",
    pattern: {
      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Invalid PAN format",
    },
  },
};

export const step3Validation = {
  position: { required: "Position is required" },
  department: { required: "Department is required" },
  joiningDate: { required: "Joining date is required" },
  expectedSalary: { required: "Expected salary is required" },
};
