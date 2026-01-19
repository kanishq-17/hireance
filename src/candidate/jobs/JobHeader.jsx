const JobHeader = ({ 
  salary, 
  industry, 
  employmentType, 
  department, 
  email,
  isPaidService,
  professionalFee
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Job Information</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-neutral-500 uppercase mb-1">Salary</p>
          <p className="text-sm font-medium text-neutral-900">{salary}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 uppercase mb-1">Industry</p>
          <p className="text-sm font-medium text-neutral-900">{industry}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 uppercase mb-1">Employment Type</p>
          <p className="text-sm font-medium text-neutral-900">{employmentType}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 uppercase mb-1">Department</p>
          <p className="text-sm font-medium text-neutral-900">{department}</p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 uppercase mb-1">Email</p>
          <p className="text-sm font-medium text-neutral-900">{email}</p>
        </div>

        {/* Application Fee */}
        {isPaidService && professionalFee > 0 && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-neutral-500 uppercase mb-1">Application Fee</p>
            <p className="text-lg font-bold text-purple-600">₹{professionalFee}</p>
            <p className="text-xs text-gray-500 mt-1">One-time professional fee</p>
          </div>
        )}

        {!isPaidService && (
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-700">Free to Apply</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobHeader;
