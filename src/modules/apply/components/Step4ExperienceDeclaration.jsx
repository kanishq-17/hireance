import { useFormContext, useFieldArray } from "react-hook-form";

const Step4ExperienceDeclaration = () => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const accepted = watch("declaration_accepted"); // ✅ CHANGED

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience_details",
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
                {...register(`experience_details.${index}.company_name`, {
                  required: "Company name is required",
                })}
                error={errors?.experience_details?.[index]?.company_name}
              />

              <Input
                label="Position"
                {...register(`experience_details.${index}.position`, {
                  required: "Position is required",
                })}
                error={errors?.experience_details?.[index]?.position}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Role in Company"
                {...register(`experience_details.${index}.role`, {
                  required: "Role is required",
                })}
                error={errors?.experience_details?.[index]?.role}
              />

              <Input
                label="Project Name"
                {...register(`experience_details.${index}.project_name`, {
                  required: "Project name is required",
                })}
                error={errors?.experience_details?.[index]?.project_name}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                label="Start Date"
                {...register(`experience_details.${index}.start_date`, {
                  required: "Start date is required",
                })}
                error={errors?.experience_details?.[index]?.start_date}
              />

              <Input
                type="date"
                label="End Date"
                {...register(`experience_details.${index}.end_date`, {
                  required: "End date is required",
                })}
                error={errors?.experience_details?.[index]?.end_date}
              />
            </div>

            {/* Row 4 */}
            <Textarea
              label="Project Description"
              {...register(`experience_details.${index}.project_description`, {
                required: "Project description is required",
              })}
              error={errors?.experience_details?.[index]?.project_description}
            />
          </div>
        ))}

        {/* Add Experience */}
        <button
          type="button"
          onClick={() =>
            append({
              company_name: "",
              position: "",
              role: "",
              start_date: "",
              end_date: "",
              project_name: "",
              project_description: "",
            })
          }
          className="text-sm font-medium text-black"
        >
          + Add another experience
        </button>
      </div>

      {/* ===== EXPERIENCE BACKGROUND DROPDOWN ===== */}
      <div className="flex flex-col gap-1">
        <label className="text-sm text-neutral-700">Overall Experience</label>
        <select
          {...register("experience_background", {
            required: "Experience background is required",
          })}
          className="h-11 rounded-lg border border-neutral-300 px-3
          focus:outline-none focus:ring-2 focus:ring-black/10"
        >
          <option value="">Select experience level</option>
          <option value="Fresher">Fresher</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
        {errors.experience_background && (
          <p className="text-xs text-red-500">{errors.experience_background.message}</p>
        )}
      </div>

      {/* ===== DECLARATION ===== */}
      <div className="pt-6 border-t border-neutral-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("declaration_accepted", { required: true })}
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
