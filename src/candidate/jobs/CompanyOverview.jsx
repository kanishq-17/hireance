const CompanyOverview = ({ companyName, followers, logo, about }) => {
  return (
    <section>
      {/* Header */}
      <h4 className="font-semibold text-neutral-900 text-xl">About company</h4>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
          <img
            src={logo}
            alt="Company Logo"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-900">{companyName}</h3>
          <p className="text-xs text-neutral-500">{followers} followers</p>
        </div>
      </div>

      {/* About */}
      <p className="text-sm text-neutral-700 mt-4 leading-relaxed">
       {about}
      </p>

      {/* Latest activity */}
      <div className="mt-5">
        <p className="text-sm font-medium text-neutral-900 mb-3">
          Latest activity
        </p>

        <div className="flex gap-3 p-3 outline outline-neutral-300 rounded-xl">
          <img
            src={logo}
            alt="Activity"
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div>
            <p className="text-xs text-neutral-500">Microsoft Inc.</p>
            <p className="text-sm text-neutral-800 mt-1">
              How do I cancel my reservation for a stay?
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              You can cancel a reservation any time before or during your trip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
