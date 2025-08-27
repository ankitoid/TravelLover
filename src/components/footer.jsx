import { Link } from "react-router-dom";
import First from "../Assets/second.png";
import second from "../Assets/a.png";
const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-r from-[#010c41] via-[#010c41] to-gray-300 text-white py-20 md:py-28">
        <div className="container mx-auto px-6 relative z-10">
          {/* Top Section with Logo */}
          <div className="flex flex-col md:flex-row justify-start items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-10">
            
            <Link
              to="/"
              className="flex items-center justify-center relative group  w-40  "
            >
              <img
                src={First}
                alt="Logo"
                className="h-8 2xl:h-10 md:h-10 transition-all duration-300 transform group-hover:-translate-x-8 "
              />
              <img
                src={second}
                alt="Logo"
                className="absolute opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-20 transition-all duration-700 text-gray-700 font-semibold"
              />
            </Link>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Address</h3>
              <p className="text-base leading-relaxed">
                5540 Centerview Drive, Suite 200,
                <br />
                Raleigh, NC 27606
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28l1.498 4.493-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257L19 19h0a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v0z"
                    />
                  </svg>
                  <a
                    href="tel:+19193425482"
                    className="ml-2 hover:text-green-400"
                  >
                    +1 919-342-5482
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l9 6 9-6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
                    />
                  </svg>
                  <a
                    href="mailto:info@globalxperts.net"
                    className="ml-2 hover:text-green-400"
                  >
                    info@globalxperts.net
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Services and Support
              </h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link
                    to="/service/field-services"
                    className="hover:text-green-400"
                  >
                    Field Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/managed-services"
                    className="hover:text-green-400"
                  >
                    Managed Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/professional-services"
                    className="hover:text-green-400"
                  >
                    Professional Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/solutions/cloud" className="hover:text-green-400">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/field-services"
                    className="hover:text-green-400"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/industries/education"
                    className="hover:text-green-400"
                  >
                    Industries
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-green-400">
                    Insights
                  </Link>
                </li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Info</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/careers" className="hover:text-green-400 ">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/company/about-us" className="hover:text-green-400">
                    Company
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="hover:text-green-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="text-center text-white py-4 bg-[#068f36]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-2 px-4">
          <p>&copy; 2025 GlobalXperts. All rights reserved.</p>
          <Link to="/privacy-policy" className="underline hover:text-gray-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
