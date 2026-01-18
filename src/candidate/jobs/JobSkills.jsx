const JobSkills = ({ skills }) => {
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-neutral-900 text-xl">Skills</h4>

      <div className="mt-2 flex items-start justify-start flex-wrap space-x-2.5 space-y-2.5">
        {skills.map((s, index) => (
          <RequiredSkills key={index} skill={s} />
        ))}
      </div>
    </div>
  );
};

export default JobSkills;

/* ---------------- helper ---------------- */

const RequiredSkills = ({ skill }) => (
  <p
    className="rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200
 p-2 w-fit text-xs cursor-pointer"
  >
    {skill}
  </p>
);
