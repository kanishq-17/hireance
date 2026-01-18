import { useEffect, useRef, useState } from "react";
import Button from "../../shared/components/common/Button";

const StickyJobHeader = ({ companyName, position, location }) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll trigger */}
      <div ref={triggerRef} className="h-1" />

      {/* Sticky Header */}
      <div
        className={`fixed top-0 left-0 w-full z-50
        bg-white border-b shadow-sm
        transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
          {/* Job Info */}
          <div>
            <p className="text-sm font-semibold text-neutral-900">{position}</p>
            <p className="text-xs text-neutral-500">
              {companyName} · {location}
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
      </div>
    </>
  );
};

export default StickyJobHeader;
