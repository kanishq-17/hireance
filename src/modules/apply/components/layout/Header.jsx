import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-4 md:px-20 py-5">
        <div className="flex items-center justify-between">
          {/* Logo using SVG */}
          <Link 
            to="/jobs" 
            className="cursor-pointer transition-opacity hover:opacity-80"
          >
            <img 
              src="/hireance-SVG.svg" 
              alt="Hireance Logo" 
              className="h-8 md:h-10"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
