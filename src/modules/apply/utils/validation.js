export const step1Validation = {
  full_name: { 
    required: "Full name is required",
    minLength: { value: 3, message: "Name must be at least 3 characters" }
  },
  father_spouse_name: { 
    required: "Father/Spouse name is required",
    minLength: { value: 3, message: "Name must be at least 3 characters" }
  },
  date_of_birth: { 
    required: "Date of birth is required",
    validate: (value) => {
      const dob = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) return "You must be at least 18 years old";
      if (age > 100) return "Please enter a valid date of birth";
      return true;
    }
  },
  gender: { required: "Gender is required" },
  marital_status: { required: "Marital status is required" },
  nationality: { required: "Nationality is required" },
  mobile_no: {
    required: "Mobile number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Please enter a valid 10-digit mobile number",
    },
  },
  email_id: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
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
      message: "Invalid PAN format (e.g., ABCDE1234F)",
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
  board: { required: "Board/University is required" },
  year: { 
    required: "Year is required",
    min: { value: 1950, message: "Year must be after 1950" },
    max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
  },
  percentage: { 
    required: "Percentage is required",
    min: { value: 0, message: "Percentage must be between 0 and 100" },
    max: { value: 100, message: "Percentage must be between 0 and 100" }
  },
};

export const step3Validation = {
  position_applied_for: { required: "Position is required" },
  department_project: { required: "Department is required" },
  expected_date_of_joining: { 
    required: "Joining date is required",
    validate: (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) return "Joining date cannot be in the past";
      return true;
    }
  },
  expected_salary_ctc: { 
    required: "Expected salary is required",
    min: { value: 0, message: "Salary must be a positive number" }
  },
};

export const step4Validation = {
  declaration_accepted: { 
    required: "You must accept the declaration",
    validate: (value) => value === true || "You must accept the declaration to proceed"
  },
};
