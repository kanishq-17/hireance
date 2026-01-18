const JobHighlights = ({ keyPoints }) => {
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-neutral-900 text-xl">Responsibilities</h4>

      <div className="mt-2 text-neutral-300 text-sm">
        {keyPoints.map((key, index) => (
          <JobKeyPoints key={index} list={key} />
        ))}
      </div>
    </div>
  );
};

export default JobHighlights;

/* ---------------- helper ---------------- */

const JobKeyPoints = ({ list }) => <ul className="mt-3 text-neutral-700 text-sm list-disc space-y-2">{list}</ul>;
