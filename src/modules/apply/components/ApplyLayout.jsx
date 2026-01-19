const ApplyLayout = ({
  title,
  subtitle,
  jobInfo, // NEW: Dynamic job information
  stepper,
  children,
  footer,
}) => {
  return (
    <section className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-neutral-200">
        {/* ===== HEADER ===== */}
        <div className="px-8 py-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
          )}
        </div>

        {/* ===== JOB INFO BANNER (NEW) ===== */}
        {jobInfo && (
          <div className="px-8 py-5 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-neutral-200">
            <div className="flex items-center gap-4">
              {/* Company Logo */}
              {jobInfo.logo && (
                <img
                  src={jobInfo.logo}
                  alt={jobInfo.company}
                  className="w-12 h-12 rounded-lg border border-neutral-200 object-contain bg-white p-1"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              
              {/* Job Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  {jobInfo.position}
                </h3>
                <div className="flex items-center gap-4 text-sm text-neutral-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                    {jobInfo.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {jobInfo.location}
                  </span>
                  {jobInfo.salary && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      {jobInfo.salary}
                    </span>
                  )}
                </div>
              </div>

              {/* Premium Badge */}
              {jobInfo.isPremium && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PREMIUM
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== STEPPER ===== */}
        {stepper && <div className="px-8 pt-6">{stepper}</div>}

        {/* ===== FORM CONTENT ===== */}
        <div className="px-8 py-8">{children}</div>

        {/* ===== FOOTER ===== */}
        {footer && (
          <div className="px-8 py-5 border-t border-neutral-200 flex items-center justify-between">
            {footer}
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplyLayout;
