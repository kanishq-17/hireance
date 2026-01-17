import { useState } from "react";
import { LiaSuitcaseSolid } from "react-icons/lia";
import { BsCurrencyRupee } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";

const JobCard = () => {
  const [techStack] = useState(["React", "Node", "TypeScript"]);

  return (
    <section className="bg-black w-full min-h-screen flex items-center justify-center p-6">
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6
        shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]
        transition-all duration-300"
      >
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="w-11 h-11 rounded-full bg-black text-white 
            flex items-center justify-center font-semibold">
            H
          </div>

          <span className="text-xs font-medium px-3 py-1 rounded-full
            bg-emerald-100 text-emerald-700">
            Part-time
          </span>
        </div>

        {/* Company + Date */}
        <p className="mt-4 text-sm text-neutral-500">
          Hireance · <span className="text-neutral-400">5 days ago</span>
        </p>

        {/* Job Title */}
        <h2 className="mt-1 text-lg font-semibold text-neutral-900 leading-snug">
          Senior Software Developer
        </h2>

        {/* Skills */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {techStack.map((tech) => (
            <SkillBadge key={tech} skill={tech} />
          ))}
        </div>

        {/* Divider */}
        <div className="mt-5 h-px bg-neutral-200" />

        {/* Meta Info */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-neutral-600">
          <Meta
            icon={<LiaSuitcaseSolid />}
            label="Experience"
            value="1–3 yrs"
          />
          <Meta
            icon={<BsCurrencyRupee />}
            label="Salary"
            value="5–8 LPA"
          />
          <Meta
            icon={<LuMapPin />}
            label="Location"
            value="Remote"
          />
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <button
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium
            border border-neutral-300 text-neutral-700
            hover:bg-neutral-100 transition"
          >
            View details
          </button>

          <button
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium
            bg-black text-white hover:bg-neutral-900 transition"
          >
            Apply now
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobCard;

/* ------------ HELPERS ------------ */

const SkillBadge = ({ skill }) => (
  <span
    className="text-xs font-medium px-3 py-1 rounded-full
    bg-neutral-100 text-neutral-700"
  >
    {skill}
  </span>
);

const Meta = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1 text-neutral-500">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className="font-medium text-neutral-800">{value}</p>
  </div>
);
