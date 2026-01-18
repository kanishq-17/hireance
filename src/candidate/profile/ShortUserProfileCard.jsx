import { FaLinkedin, FaGithub, FaXTwitter, FaBriefcase } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";

const ShortUserProfileCard = () => {
  const profileCompletion = 78;

  return (
    <section className="bg-black w-full min-h-screen flex items-center justify-center p-6">
      <div
        className="w-[360px] rounded-3xl
        bg-white/95 backdrop-blur-xl
        shadow-[0_30px_80px_rgba(0,0,0,0.25)]
        p-6"
      >
        {/* ===== Avatar Section ===== */}
        <div className="flex flex-col items-center relative">
          <div className="relative">
            <img
              src="/user.jpg"
              alt="User"
              className="w-24 h-24 rounded-full object-cover
              border-4 border-white shadow-md"
            />

            {/* completion badge */}
            <div
              className={`absolute -bottom-1 -right-1
              ${getCompletionColor(profileCompletion)}
              text-white text-xs px-2 py-0.5
              rounded-full font-semibold shadow`}
            >
              {profileCompletion}%
            </div>
          </div>

          {/* Job Type */}
          <span
            className="mt-3 text-xs px-3 py-1 rounded-full
            bg-emerald-100 text-emerald-700 font-medium"
          >
            Full-Stack Developer
          </span>
        </div>

        {/* ===== User Info ===== */}
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-neutral-900">
            Noah Thompson
          </h2>

          <p className="text-sm text-neutral-700 mt-1">Software Engineer</p>

          <p className="text-sm text-neutral-500">Hireance Technologies</p>

          <div
            className="flex justify-center items-center gap-1
            text-sm text-neutral-500 mt-1"
          >
            <MdLocationOn />
            Hyderabad, India
          </div>
        </div>

        {/* ===== Performance Stats ===== */}
        <div
          className="mt-6 grid grid-cols-2 gap-4
          bg-neutral-100/80 rounded-2xl px-4 py-3"
        >
          <PerformanceCard label="Search Appearances" value="1,248" />
          <PerformanceCard label="Recruiter Actions" value="36" />
        </div>

        {/* ===== CTA ===== */}
        <button
          className="mt-6 w-full flex items-center justify-center gap-2
          bg-black text-white rounded-xl py-3
          text-sm font-medium
          hover:bg-neutral-900 transition"
        >
          View Profile
          <HiOutlineExternalLink />
        </button>

        {/* ===== Social Links ===== */}
        <div className="mt-5 flex justify-center gap-3">
          <SocialIcon icon={<FaLinkedin />} />
          <SocialIcon icon={<FaGithub />} />
          <SocialIcon icon={<FaXTwitter />} />
          <SocialIcon icon={<FaBriefcase />} />
          <SocialIcon icon={<SiLeetcode />} />
        </div>
      </div>
    </section>
  );
};

export default ShortUserProfileCard;

/* ---------- HELPERS ---------- */

const PerformanceCard = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xs text-neutral-500">{label}</p>
    <p className="text-lg font-semibold text-neutral-900">{value}</p>
  </div>
);

const SocialIcon = ({ icon }) => (
  <div
    className="w-9 h-9 flex items-center justify-center
    rounded-full bg-neutral-200 text-neutral-700
    hover:bg-black hover:text-white
    transition cursor-pointer"
  >
    {icon}
  </div>
);

const getCompletionColor = (value) => {
  if (value < 25) return "bg-red-500";
  if (value < 50) return "bg-yellow-400 text-black";
  if (value < 75) return "bg-orange-500";
  return "bg-green-500";
};
