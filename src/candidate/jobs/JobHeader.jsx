import {
  MdOutlineBusinessCenter,
  MdOutlineWorkOutline,
  MdOutlineCategory,
  MdOutlineEmail,
} from "react-icons/md";

const JobHeader = ({ salary, industry, employmentType, department, email }) => {
  return (
    <div className="">
      {/* Salary */}
      <div className="mb-6 bg-white rounded-2xl p-6 shadow-sm">
        <h4 className="text-2xl font-semibold text-neutral-900">{salary}</h4>
        <p className="text-xs text-neutral-500 mt-1">Avg. salary</p>
      </div>

      {/* Meta Info */}
      <div className="space-y-5">
        <MetaRow
          icon={<MdOutlineCategory />}
          title={industry}
          subtitle="Industry"
        />

        <MetaRow
          icon={<MdOutlineWorkOutline />}
          title={employmentType}
          subtitle="Employment type"
        />

        <MetaRow
          icon={<MdOutlineBusinessCenter />}
          title={department}
          subtitle="Job function"
        />

        <MetaRow
          icon={<MdOutlineEmail />}
          title={email}
          subtitle="Contact Email"
        />
      </div>
    </div>
  );
};

export default JobHeader;

/* ---------- HELPER ---------- */

const MetaRow = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-5">
    <div className="text-neutral-500 text-xl mt-0.5 outline rounded-full p-1.5 outline-neutral-500/30">
      {icon}
    </div>

    <div>
      <p className="text-sm font-medium text-neutral-900">{title}</p>
      <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
    </div>
  </div>
);
