const JobDescription = ({ para }) => {
  return (
    <div className="mt-2 space-y-4">
      <h4 className="font-semibold text-xl">About the job</h4>
      <p className="text-sm mt-2 text-neutral-700 leading-relaxed">
       {para}
      </p>
    </div>
  );
};

export default JobDescription;
