import Button from "../../shared/components/common/Button";

const CompanyHeader = ({
  logo,
  position,
  companyName,
  location,
  uploadDate,
}) => {

  return (
    <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="relative h-36 bg-gradient-to-r from-green-300 via-yellow-400 to-orange-400">
        {/* Logo */}
        <div className="absolute -bottom-10 left-12 bg-white w-20 h-20 rounded-full p-2 shadow">
          <img
            src={logo}
            alt="Company Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 px-12 pb-6 flex items-start justify-between">
        {/* Info */}
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            {position}
          </h1>
          <p className="text-sm text-neutral-700 mt-1">{companyName}</p>
          <p className="text-xs text-neutral-500 mt-1">
            {location} · {getJobPostedTime(uploadDate)}
          </p>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Button
            text="Save"
            extraClasses="outline outline-neutral-200 text-neutral-800 hover:bg-neutral-300 px-4 py-2"
          />
          <Button
            text="Apply"
            extraClasses="bg-green-600 text-white hover:bg-green-700 px-4 py-2"
          />
        </div>
      </div>
    </section>
  );
};

export default CompanyHeader;

/* ---------------- helper ---------------- */

const getJobPostedTime = (postedAt) => {
  const postedTime = new Date(postedAt); // job post time
  const currentTime = new Date(); // user system time

  const diffMs = currentTime - postedTime; // difference in milliseconds

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
};
