import { FormProvider } from "react-hook-form";
import ApplyLayout from "../components/ApplyLayout";
import Stepper from "../components/Stepper";
import Step1PersonalDetails from "../components/Step1PersonalDetails";
import Step2Education from "../components/Step2Education";
import Step3JobPreferences from "../components/Step3JobPreferences";
import Step4ExperienceDeclaration from "../components/Step4ExperienceDeclaration";
import useApplyForm from "../hooks/useApplyForm";

const ApplyFormPage = () => {
  const { form, currentStep, nextStep, prevStep, submitForm, loading, error } = useApplyForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalDetails />;
      case 2:
        return <Step2Education />;
      case 3:
        return <Step3JobPreferences />;
      case 4:
        return <Step4ExperienceDeclaration />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <ApplyLayout
        title="Job Application Form"
        subtitle="Please fill out all required information"
        stepper={<Stepper currentStep={currentStep} />}
        footer={
          <div className="w-full">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}
            <div className="flex justify-between gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Back
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto disabled:opacity-50"
                  disabled={loading}
                >
                  Next
                </button>
              )}
              {currentStep === 4 && (
                <button
                  type="button"
                  onClick={form.handleSubmit(submitForm)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit & Pay'}
                </button>
              )}
            </div>
          </div>
        }
      >
        {renderStep()}
      </ApplyLayout>
    </FormProvider>
  );
};

export default ApplyFormPage;
