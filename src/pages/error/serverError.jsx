import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl text-center">
        {/* Background Arc */}
        <div className="absolute inset-x-0 bottom-0 h-65 -z-10" />

        {/* Error Code */}
        <h1 className="text-[96px] md:text-[150px] font-extrabold text-black leading-none">
          500
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-800 text-lg">
          Sorry, something went technically wrong
        </p>
        <p className="text-gray-500 text-md mt-2">Internal Server Error</p>

        {/* Action */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-md border border-black text-black font-medium hover:bg-black hover:text-white transition"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
