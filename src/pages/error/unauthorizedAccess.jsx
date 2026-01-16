import { Link } from "react-router-dom";

const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl text-center">
        {/* Background Arc */}
        <div className="absolute inset-x-0 bottom-0 h-65 rounded-t-full -z-10" />

        {/* Error Code */}
        <h1 className="text-[96px] md:text-[120px] font-extrabold text-black leading-none">
          401
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-900 text-lg">Unauthorized Access</p>
        <p className="text-gray-600 text-sm mt-1">
          You don’t have permission to view this page
        </p>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-6">
          <Link
            to="/login"
            className="px-6 py-2 rounded-md bg-black text-white font-medium hover:bg-black transition"
          >
            Login
          </Link>

          <Link
            to="/"
            className="px-6 py-2 rounded-md border border-black text-black font-medium hover:bg-black hover:text-white transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
