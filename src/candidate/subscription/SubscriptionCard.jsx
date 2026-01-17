import { MdPeopleAlt } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import Button from "../../shared/components/common/Button";
// import { useState } from "react";

const SubscriptionCard = ({
  title,
  subtitle,
  price,
  duration,
  features,
  cta1,
  cta2,
  featured,
  theme,
}) => {
  //   const [planSteps] = useState([
  //     "License for 8 Active Users",
  //     "License for 8 Active Users",
  //     "License for 8 Active Users",
  //     "License for 8 Active Users",
  //     "License for 8 Active Users",
  //   ]);

  return (
    <section className="w-full h-screen bg-white flex justify-center items-center">
      <div className="w-1/3 rounded-2xl bg-neutral-100 p-2 backdrop-blur-2xl shadow-2xl outline outline-white">
        {/* pricing card */}
        <div className="bg-white rounded-xl w-full m-auto shadow-2xs  p-2 outline outline-neutral-400/30">
          <div className="flex items-center justify-between gap-2">
            {/* for whom */}
            <div className="w-fit flex gap-1.5 items-center">
              <span>
                <MdPeopleAlt />
              </span>
              <p className="text-sm">{title}</p>
              <hr className="text-neutral-500" />
              <p className="text-sm text-neutral-400">{subtitle}</p>
            </div>
            {/* tags */}
            <div className="w-fit">
              <p className="text-sm rounded-full px-2 py-0.5 bg-rose-300/50 w-fit text-center text-white">
                {featured}
              </p>
            </div>
          </div>

          {/* price */}
          <div className="mt-5">
            <span className="inline-block">
              <FaRupeeSign />
            </span>
            <p className="inline text-5xl font-bold ml-1">
              {price} <span className="text-sm font-normal">/ {duration}</span>
            </p>
            {/* cta buttons */}
            <div className="flex items-center justify-between gap-3">
              <Button
                extraClasses={
                  "w-full rounded-full text-white bg-black m-auto text-center mt-5 mb-3 p-2 text-sm shadow-gray-500 shadow-2xs font-medium"
                }
                text={cta1}
              />
              <Button
                extraClasses={
                  "w-full rounded-full text-black bg-white m-auto text-center mt-5 mb-3 p-2 text-sm outline outline-neutral-500/50 font-medium"
                }
                text={cta2}
              />
            </div>
          </div>
        </div>

        {/* how it works */}
        <div className="mt-4 pl-2">
          <p className="text-sm text-neutral-600">How it works</p>
          {/* steps */}
          {features.map((working) => (
            <Steps text={working} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionCard;

/* ------------ HELPER FUNCTION ------------ */
const Steps = ({ text }) => (
  <div className="flex items-end justify-start gap-2 my-3">
    <GiCheckMark className="text-black bg-black/20 rounded-full p-0.5" />
    <p className="text-sm">{text}</p>
  </div>
);
