import { useFormContext, useFieldArray } from "react-hook-form";

const Step2Education = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educational_qualifications",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-neutral-900">
        Educational Qualifications
      </h3>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-neutral-600">
        <p>Qualification</p>
        <p>Board / University</p>
        <p>Year</p>
        <p>Percentage</p>
      </div>

      {/* Table Rows */}
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-4 gap-4 items-start">
          <Input
            {...register(`educational_qualifications.${index}.qualification`, {
              required: "Qualification is required",
            })}
            error={errors?.educational_qualifications?.[index]?.qualification}
            placeholder="B.Tech / MBA"
          />

          <Input
            {...register(`educational_qualifications.${index}.institution`, {
              required: "Board / University is required",
            })}
            error={errors?.educational_qualifications?.[index]?.institution}
            placeholder="University Name"
          />

          <Input
            type="number"
            {...register(`educational_qualifications.${index}.year`, {
              required: "Year is required",
              min: { value: 1950, message: "Invalid year" },
            })}
            error={errors?.educational_qualifications?.[index]?.year}
            placeholder="2022"
          />

          <div className="flex gap-2">
            <Input
              {...register(`educational_qualifications.${index}.percentage`, {
                required: "Percentage is required",
              })}
              error={errors?.educational_qualifications?.[index]?.percentage}
              placeholder="85%"
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm mt-3"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add Row */}
      <button
        type="button"
        onClick={() =>
          append({
            qualification: "",
            institution: "",
            year: "",
            percentage: "",
          })
        }
        className="text-sm font-medium text-black"
      >
        + Add another qualification
      </button>
    </div>
  );
};

export default Step2Education;

/* ---------- INPUT ---------- */

const Input = ({ error, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <input
      {...props}
      className="h-11 rounded-lg border border-neutral-300 px-3
      focus:outline-none focus:ring-2 focus:ring-black/10"
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);
