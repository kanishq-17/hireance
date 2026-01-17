const JobCard = () => {
  return (
    <div className="w-[320px] bg-white rounded-2xl p-5 shadow-md">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
          H
        </div>

        <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
          Part-time
        </span>
      </div>

      {/* Company Info */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Hierance · 5 days ago</p>
      </div>

      {/* Job Title */}
      <h2 className="mt-1 text-lg font-semibold text-blue-700">
        Senior Software Developer
      </h2>

      {/* Tags */}
      <div className="mt-3 flex gap-2">
        <span className="text-sm font-medium py-1 text-gray-700">
          React.js, Node.js, PostgreSQL, GrapgQL, AI/ML, Restful APIs
          and more...
        </span>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">$120/hr</p>
          <p className="text-sm text-gray-500">San Francisco, CA</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-7">
        <button className="bg-black w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-900">
          View Details
        </button>
        <button className="bg-black w-full text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-900">
          Apply now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
