const ApplyLayout = ({
  title,
  subtitle,
  stepper,
  children,
  footer,
}) => {
  return (
    <section className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <div
        className="w-full max-w-4xl bg-white rounded-2xl
        shadow-sm border border-neutral-200"
      >
        {/* ===== HEADER ===== */}
        <div className="px-8 py-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-neutral-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* ===== STEPPER ===== */}
        {stepper && (
          <div className="px-8 pt-6">
            {stepper}
          </div>
        )}

        {/* ===== FORM CONTENT ===== */}
        <div className="px-8 py-8">
          {children}
        </div>

        {/* ===== FOOTER ===== */}
        {footer && (
          <div
            className="px-8 py-5 border-t border-neutral-200
            flex items-center justify-between"
          >
            {footer}
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplyLayout;
