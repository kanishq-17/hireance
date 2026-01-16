import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        {/* 404 Text */}
        <div className="flex items-center justify-center">
          {/* Left 4 */}
          <span className="text-[180px] md:text-[240px] font-extrabold text-gray-900 leading-none">
            4
          </span>

          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src="/404-crystal.avif"
              alt="404 illustration"
              className="h-45 md:h-60 object-contain"
            />
          </div>

          {/* Right 4 */}
          <span className="text-[180px] md:text-[240px] font-extrabold text-gray-900 leading-none">
            4
          </span>
        </div>

        {/* Floating Words */}
        <div className="relative w-full max-w-xl mt-6 text-sm text-gray-500">
          <p className="text-black absolute -top-32 -left-40 -translate-x-1/2">
            Page not found
          </p>
          <p className="text-black absolute top-8 -right-40">Awkward</p>
          <p className="text-black absolute bottom-64 right-0 -translate-y-1/2">
            Error
          </p>
          <p className="text-black absolute -top-52 bottom-5">Shit happens</p>
          <p className="text-black absolute -top-48 left-64">
            Nothing to see here
          </p>
          <p className="text-black absolute right -translate-x-1/2 top-10">
            Sorry
          </p>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="mt-16 px-6 py-2 border border-gray-800 rounded-md text-sm font-medium hover:bg-gray-900 hover:text-white transition"
        >
          Take me home
        </Link>
      </div>

      {/* Footer Navigation */}
      <footer className="pb-6 flex justify-center">
        <nav className="flex gap-6 bg-gray-900 text-white text-sm px-6 py-3 rounded-full shadow-lg">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/services" className="hover:text-gray-300">
            Services
          </Link>
          <Link to="/work" className="hover:text-gray-300">
            Work
          </Link>
          <Link to="/subscription" className="hover:text-gray-300">
            Subscription
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default NotFound;
