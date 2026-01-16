import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-black h-screen text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="text-white text-3xl font-bold">Hierance</div>
          <p className="text-md text-gray-400">Connect with us</p>

          {/* Social Icons */}
          <div className="flex gap-4 text-lg">
            <span className="hover:text-white cursor-pointer">
              <FaFacebook />
            </span>
            <span className="hover:text-white cursor-pointer">
              <FaLinkedin />
            </span>
            <span className="hover:text-white cursor-pointer">
              <FaInstagramSquare />
            </span>
            <span className="hover:text-white cursor-pointer">
              <BsTwitterX />
            </span>
          </div>
        </div>

        <div>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer text-lg">
              About Us
            </li>
            <li className="hover:text-white cursor-pointer text-lg">Support</li>
            <li className="hover:text-white cursor-pointer text-lg">Careers</li>
          </ul>
        </div>

        <div>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer text-lg">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer text-lg">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer text-lg">
              Refund Policy
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase tracking-wide">
            Get In Touch
          </h4>

          <div className="space-y-4 text-md text-gray-400">
            <p className="hover:text-white cursor-pointer">info@hireance.com</p>

            <p>Address: Ameerpet, Hyderabad, India</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        © 2025 Hierance Pvt. Ltd. <br />
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
