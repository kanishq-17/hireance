const Stepper = ({ currentStep }) => {
  const steps = [
    "Personal Details",
    "Education",
    "Job Preferences",
    "Experience & Declaration",
  ];

  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={label} className="flex-1 flex items-center">
            {/* STEP CIRCLE */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                      ? "bg-black text-white"
                      : "bg-neutral-200 text-neutral-500"
                }`}
              >
                {stepNumber}
              </div>

              <span
                className={`text-sm
                ${
                  isActive ? "text-neutral-900 font-medium" : "text-neutral-500"
                }`}
              >
                {label}
              </span>
            </div>

            {/* CONNECTOR */}
            {stepNumber !== steps.length && (
              <div className="flex-1 h-px bg-neutral-300 mx-4" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
