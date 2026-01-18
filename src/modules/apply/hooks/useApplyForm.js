import { useState } from "react";
import { useForm } from "react-hook-form";

const TOTAL_STEPS = 4;

const useApplyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      education: [{}],
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

  const submitForm = (data) => {
    console.log("FINAL SUBMIT DATA 👉", data);
    // API call here
  };

  return {
    form,
    currentStep,
    nextStep,
    prevStep,
    submitForm,
  };
};

export default useApplyForm;
