import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useApplyForm = (job) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      // Step 1 - Personal Details
      full_name: "",
      father_spouse_name: "",
      date_of_birth: "",
      age: "",
      gender: "",
      marital_status: "",
      nationality: "Indian",
      mobile_no: "",
      email_id: "",
      aadhaar_no: "",
      pan_no: "",
      current_address: "",
      permanent_address: "",
      
      // Step 2 - Education
      educational_qualifications: [],
      
      // Step 3 - Job Preferences
      position_applied_for: "",
      department_project: "",
      expected_date_of_joining: "",
      expected_salary_ctc: "",
      
      // Step 4 - Experience & Declaration
      experience_background: [],
      declaration_accepted: false,
    },
  });

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setError(null);
    } else if (!isValid) {
      setError("Please fill all required fields correctly");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const submitForm = async (data) => {
    try {
      setLoading(true);
      setError(null);
      console.log("[useApplyForm] Submitting application:", data);

      if (!job) {
        throw new Error("Job information is missing");
      }

      // Prepare application data matching database schema exactly
      const applicationData = {
        // Personal Details
        full_name: data.full_name,
        father_spouse_name: data.father_spouse_name,
        date_of_birth: data.date_of_birth,
        age: parseInt(data.age),
        gender: data.gender,
        marital_status: data.marital_status,
        nationality: data.nationality,
        mobile_no: data.mobile_no,
        email_id: data.email_id,
        aadhaar_no: data.aadhaar_no,
        pan_no: data.pan_no,
        current_address: data.current_address,
        permanent_address: data.permanent_address,
        
        // Education (JSONB array)
        educational_qualifications: data.educational_qualifications || [],
        
        // Job Details
        position_applied_for: data.position_applied_for,
        department_project: data.department_project,
        expected_date_of_joining: data.expected_date_of_joining,
        expected_salary_ctc: parseFloat(data.expected_salary_ctc),
        
        // Experience (JSONB array)
        experience_background: data.experience_background || [],
        
        // Declaration
        declaration_accepted: data.declaration_accepted,
        declaration_date: data.declaration_accepted ? new Date().toISOString() : null,
        
        // Status
        application_status: 'pending',
      };

      console.log("[useApplyForm] Sending to backend:", applicationData);

      // Submit to backend
      const response = await fetch("http://localhost:5000/api/applications/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to submit application");
      }

      console.log("[useApplyForm] Application submitted:", result.applicationId);

      // Check if payment is required
      if (job.is_paid_service && job.professional_fee > 0) {
        console.log("[useApplyForm] Payment required - Creating order");
        await handlePayment(result.applicationId, data);
      } else {
        console.log("[useApplyForm] Free application - Success");
        alert("Application submitted successfully!");
        navigate("/jobs");
      }
    } catch (err) {
      console.error("[useApplyForm] Error:", err);
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (applicationId, customerData) => {
    try {
      console.log("[useApplyForm] Creating payment order");

      const paymentResponse = await fetch("http://localhost:5000/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId: applicationId,
          amount: job.professional_fee,
          customerDetails: {
            name: customerData.full_name,
            email: customerData.email_id,
            phone: customerData.mobile_no,
          },
        }),
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Failed to create payment order");
      }

      console.log("[useApplyForm] Redirecting to payment page");
      
      // Redirect to payment page
      window.location.href = `http://localhost:5000${paymentResult.paymentUrl}`;
    } catch (err) {
      console.error("[useApplyForm] Payment error:", err);
      throw err;
    }
  };

  return {
    form,
    currentStep,
    nextStep,
    prevStep,
    submitForm,
    loading,
    error,
  };
};

export default useApplyForm;
