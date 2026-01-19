import { useFormContext, useFieldArray } from "react-hook-form";

const Step2Education = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <Section title="Educational Qualifications">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-4 gap-4 items-start mb-4"
        >
          <Input
            placeholder="Qualification (e.g. B.Tech)"
            {...register(`education.${index}.qualification`, {
              required: "Qualification is required",
            })}
            error={errors?.education?.[index]?.qualification}
          />

          <Input
            placeholder="Board / University"
            {...register(`education.${index}.board`, {
              required: "Board / University is required",
            })}
            error={errors?.education?.[index]?.board}
          />

          <Input
            type="number"
            placeholder="Year"
            {...register(`education.${index}.year`, {
              required: "Year is required",
            })}
            error={errors?.education?.[index]?.year}
          />

          <div className="flex gap-2">
            <Input
              placeholder="Percentage"
              {...register(`education.${index}.percentage`, {
                required: "Percentage is required",
              })}
              error={errors?.education?.[index]?.percentage}
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm mt-2"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            qualification: "",
            board: "",
            year: "",
            percentage: "",
          })
        }
        className="text-sm font-medium text-black"
      >
        + Add qualification
      </button>
    </Section>
  );
};

export default Step2Education;

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }) => (
  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 space-y-4">
    <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
    {children}
  </div>
);

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
