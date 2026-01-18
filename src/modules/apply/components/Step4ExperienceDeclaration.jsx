import { useFormContext, useFieldArray } from "react-hook-form";

const Step4ExperienceDeclaration = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const accepted = watch("declaration");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div className="space-y-8">
      {/* ===== EXPERIENCE SECTION ===== */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-neutral-900">
          Experience Background
        </h3>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-neutral-200 rounded-xl p-5 space-y-4 relative"
          >
            {/* Remove Button */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-3 right-3 text-red-500 text-sm"
              >
                ✕
              </button>
            )}

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Company Name"
                {...register(`experience.${index}.companyName`, {
                  required: "Company name is required",
                })}
                error={errors?.experience?.[index]?.companyName}
              />

              <Input
                label="Position"
                {...register(`experience.${index}.position`, {
                  required: "Position is required",
                })}
                error={errors?.experience?.[index]?.position}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Role in Company"
                {...register(`experience.${index}.role`, {
                  required: "Role is required",
                })}
                error={errors?.experience?.[index]?.role}
              />

              <Input
                label="Project Name"
                {...register(`experience.${index}.projectName`, {
                  required: "Project name is required",
                })}
                error={errors?.experience?.[index]?.projectName}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                label="Start Date"
                {...register(`experience.${index}.startDate`, {
                  required: "Start date is required",
                })}
                error={errors?.experience?.[index]?.startDate}
              />

              <Input
                type="date"
                label="End Date"
                {...register(`experience.${index}.endDate`, {
                  required: "End date is required",
                })}
                error={errors?.experience?.[index]?.endDate}
              />
            </div>

            {/* Row 4 */}
            <Textarea
              label="Project Description"
              {...register(`experience.${index}.projectDescription`, {
                required: "Project description is required",
              })}
              error={errors?.experience?.[index]?.projectDescription}
            />
          </div>
        ))}

        {/* Add Experience */}
        <button
          type="button"
          onClick={() =>
            append({
              companyName: "",
              position: "",
              role: "",
              startDate: "",
              endDate: "",
              projectName: "",
              projectDescription: "",
            })
          }
          className="text-sm font-medium text-black"
        >
          + Add another experience
        </button>
      </div>

      {/* ===== DECLARATION ===== */}
      <div className="pt-6 border-t border-neutral-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("declaration", { required: true })}
            className="mt-1"
          />
          <p className="text-sm text-neutral-700 leading-relaxed">
            I hereby declare that the information given above is true and
            correct to the best of my knowledge.
          </p>
        </label>

        {!accepted && (
          <p className="text-xs text-red-500 mt-2">
            Declaration is required to submit the application.
          </p>
        )}
      </div>
    </div>
  );
};

export default Step4ExperienceDeclaration;

/* ---------- INPUTS ---------- */

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-neutral-700">{label}</label>
    <input
      {...props}
      className="h-11 rounded-lg border border-neutral-300 px-3
      focus:outline-none focus:ring-2 focus:ring-black/10"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

const Textarea = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-neutral-700">{label}</label>
    <textarea
      rows={4}
      {...props}
      className="rounded-lg border border-neutral-300 px-3 py-2
      focus:outline-none focus:ring-2 focus:ring-black/10"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
