import { FormProvider } from "react-hook-form";
import ApplyLayout from "../components/ApplyLayout";
import Stepper from "../components/Stepper";
import Step1PersonalDetails from "../components/Step1PersonalDetails";
import Step2Education from "../components/Step2Education";
import Step3JobPreferences from "../components/Step3JobPreferences";
import Step4ExperienceDeclaration from "../components/Step4ExperienceDeclaration";
import useApplyForm from "../hooks/useApplyForm";

const ApplyFormPage = () => {
  const { form, currentStep, nextStep, prevStep, submitForm } = useApplyForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1PersonalDetails />;
      case 2: return <Step2Education />;
      case 3: return <Step3JobPreferences />;
      case 4: return <Step4ExperienceDeclaration />;
      default: return null;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <ApplyLayout
          title="Employment Application"
          subtitle={`Step ${currentStep} of 4`}
          stepper={<Stepper currentStep={currentStep} />}
          footer={
            <>
              {currentStep > 1 && <button type="button" onClick={prevStep}>Back</button>}
              {currentStep < 4 && <button type="button" onClick={nextStep}>Next</button>}
              {currentStep === 4 && <button type="submit">Submit</button>}
            </>
          }
        >
          {renderStep()}
        </ApplyLayout>
      </form>
    </FormProvider>
  );
};

export default ApplyFormPage;
