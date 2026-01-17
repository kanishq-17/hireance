import { FaRupeeSign } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import Button from "../../shared/components/common/Button";

const SubscriptionCard = ({
  title,
  subtitle,
  price,
  duration,
  features = [],
  cta1,
  cta2,
  featured,
  theme,
}) => {
  const isWhite = theme;

  return (
    <div
      className={`w-1/3 rounded-2xl p-2 backdrop-blur-2xl shadow-xl
      ${isWhite ? "bg-neutral-100 outline outline-white" : "bg-neutral-800"}`}
    >
      {/* pricing card */}
      <div
        className={`rounded-t-xl rounded-b-3xl w-full m-auto p-2 backdrop-blur-2xl
        ${
          isWhite
            ? "bg-white shadow-sm outline outline-neutral-400/30"
            : "bg-neutral-700/70 shadow-sm outline outline-neutral-600"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between gap-2">
          {/* for whom */}
          <div
            className={`w-fit flex gap-1.5 items-center
            ${isWhite ? "text-black" : "text-white"}`}
          >
            <span className="text-md">
              <MdPeopleAlt />
            </span>
            <p className="text-sm">{title}</p>
            <hr className="text-neutral-500" />
            <p
              className={`text-sm ${
                isWhite ? "text-neutral-400" : "text-neutral-400"
              }`}
            >
              {subtitle}
            </p>
          </div>

          {/* featured tag */}
          {featured && (
            <div className="w-fit">
              <p className="text-xs rounded-full px-2 py-0.5 bg-rose-300/80 text-white">
                {featured}
              </p>
            </div>
          )}
        </div>

        {/* price */}
        <div className={`mt-5 ${isWhite ? "text-black" : "text-white"}`}>
          <span className="inline-block text-md">
            <FaRupeeSign />
          </span>
          <p className="inline text-5xl font-bold ml-1">
            {price}{" "}
            <span className="text-sm font-normal text-neutral-400">
              / {duration}
            </span>
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 mt-8 mb-3 text-center">
            {cta1 && (
              <Button
                extraClasses={`w-full rounded-full text-sm p-2 font-medium 
                ${
                  isWhite
                    ? "bg-black text-white shadow-gray-500 shadow-2xs"
                    : "bg-white text-black shadow-neutral-800 shadow-md"
                }`}
                text={cta1}
              />
            )}

            {cta2 && isWhite && (
              <Button
                extraClasses="w-full rounded-full text-sm p-2 font-medium
                bg-white text-black outline outline-neutral-500/50"
                text={cta2}
              />
            )}
          </div>
        </div>
      </div>

      {/* how it works */}
      <div className="mt-4 pl-2">
        <p
          className={`text-sm ${
            isWhite ? "text-neutral-600" : "text-neutral-300"
          }`}
        >
          How it works
        </p>

        {features.map((working, idx) => (
          <Steps key={idx} text={working} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;

/* ------------ HELPER FUNCTION ------------ */
const Steps = ({ text, theme }) => {
  const isWhite = theme;
  return (
    <div className="flex items-end justify-start gap-2 my-3">
      <IoCheckmarkSharp
        className={`rounded-full p-0.5 outline-2
        ${
          isWhite
            ? "text-black outline-neutral-400/50 bg-neutral-400"
            : "text-white bg-neutral-700 outline-neutral-600"
        }`}
      />
      <p
        className={`text-sm ${
          isWhite ? "text-neutral-800" : "text-neutral-200"
        }`}
      >
        {text}
      </p>
    </div>
  );
};
