import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitApplication, createPaymentOrder } from "../../../services/api";

const TOTAL_STEPS = 4;

const useApplyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      full_name: "",
      father_spouse_name: "",
      date_of_birth: "",
      age: "",
      gender: "",
      marital_status: "",
      nationality: "Indian",
      current_address: "",
      permanent_address: "",
      mobile_no: "",
      email_id: "",
      aadhaar_no: "",
      pan_no: "",
      educational_qualifications: [
        {
          qualification: "",
          institution: "",
          year: "",
          percentage: "",
        },
      ],
      position_applied_for: "",
      department_project: "",
      expected_date_of_joining: "",
      expected_salary_ctc: "",
      experience_background: "",
      experience_details: [],
      declaration_accepted: false,
    },
  });

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submitForm = async (data) => {
    try {
      setLoading(true);
      setError(null);

      console.log("[INFO] Submitting application:", data);

      const applicationResponse = await submitApplication(data);

      console.log("[SUCCESS] Application submitted:", applicationResponse);

      const paymentResponse = await createPaymentOrder({
        applicationId: applicationResponse.applicationId,
        amount: 35,
        customerDetails: {
          name: data.full_name,
          email: data.email_id,
          phone: data.mobile_no,
        },
      });

      console.log("[SUCCESS] Payment order created:", paymentResponse);

      window.location.href = `http://localhost:5000${paymentResponse.paymentUrl}`;
    } catch (err) {
      console.error("[ERROR]", err);
      const errorMessage =
        err.response?.data?.error || err.message || "Failed to submit application";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
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
