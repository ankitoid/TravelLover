import  { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import First from "../Assets/second.png";
import second from "../Assets/a.png";

import { ChevronDown, ChevronUp } from "lucide-react";
const Navbar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [inSliderSection, setInSliderSection] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const listenerAttached = useRef(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSubmenu2, setShowSubmenu2] = useState(false);
  const [showMLSubmenu, setShowMLSubmenu] = useState(false);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  const handleScroll = () => {
    // throttle with rAF
    if (ticking.current) return;
    ticking.current = true;
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 0);

      // slider-section check
      const slider = document.getElementById("slider-section");
      if (slider) {
        const rect = slider.getBoundingClientRect();
        setInSliderSection(rect.top <= 50 && rect.bottom >= 50);
      }

      // hide on down, show on up (with 100px threshold)
      if (currentY > lastScrollY.current && currentY > 100) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      lastScrollY.current = currentY;
      ticking.current = false;
    });
  };

  useEffect(() => {
    // guard so we only attach once
    if (listenerAttached.current) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    listenerAttached.current = true;
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div
      className={`
        fixed top-0 w-full h-[60px] z-50 transition-transform duration-300
        ${isScrollingUp ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled
            ? inSliderSection
              ? "rounded-lg bg-white/80 shadow-lg"
              : "bg-gradient-to-r from-[#010c41] via-[#010c41] to-gray-300"
            : "bg-gradient-to-r from-[#010c41] via-[#010c41] to-gray-300"
        }
      `}
    >
      <nav
        className="mx-auto flex justify-between items-center h-full"
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center relative group w-44 mr-0 md:mr-8 2xl:ml-28"
        >
          <img
            src={First}
            alt="Logo"
            className="h-8 2xl:h-8 md:h-8 transition-all duration-500 transform group-hover:-translate-x-7 "
          />
          <img
            src={second}
            alt="Logo"
            className="absolute opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-20 transition-all duration-700  "
          />

          {/* <img
           src="https://main-website-images1.s3.ap-south-1.amazonaws.com/Lending-Page-Image/logo/full_logo.png"
           //  src={b} // group-hover:-translate-x-10 css below
            alt="Logo"
            className="h-10 2xl:h-[50px] md:h-[50px] transition-all duration-300 transform  "
          /> */}
        </Link>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-4 md:space-x-0 2xl:space-x-4 items-center text-white mr-12 ">
          {/* Home link */}
          <li className="relative" onMouseEnter={() => handleMouseEnter(0)}>
            <Link
              to="/" // md:hidden lg:flex add it to md hidden
              className="flex  md:hidden lg:flex items-center px-4 py-1  hover:text-green-400   "
              onClick={() => handleToggle(0)}
            >
              <FaHome className="mr-2" />
              Home
            </Link>
          </li>

          {/* Solutions dropdown */}
          <li className="relative" onMouseEnter={() => handleMouseEnter(1)}>
            <Link
              to="#"
              className="flex items-center px-5 py-1 hover:text-green-400   "
              onClick={() => handleToggle(1)}
            >
              Solutions
              {openIndex === 1 ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </Link>

            {openIndex === 1 && (
              <div
                className="absolute top-full mt-[14px] left-0 shadow-xl p-2 z-10 rounded-sm bg-white "
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                }}
                onMouseLeave={handleMouseLeave}
              >
                <ul>
                  <li
                    className="relative"
                    onMouseEnter={() => setShowSubmenu(true)}
                    onMouseLeave={() => setShowSubmenu(false)}
                  >
                    <Link
                      to="/solutions/cloud"
                      className="p-2 rounded whitespace-nowrap hover:font-bold  hover:text-white hover:bg-[#008567] hover:px-4 flex items-center justify-between"
                    >
                      <span>Cloud</span>
                      {showSubmenu ? (
                        <FaChevronUp className="ml-2" />
                      ) : (
                        <FaChevronDown className="ml-2" />
                      )}
                    </Link>

                    <ul
                      className={`absolute top-[-8px] left-full w-80 rounded shadow-xl p-2 transition-all duration-300 ease-in-out transform ${
                        showSubmenu
                          ? "opacity-100 translate-x-0 pointer-events-auto"
                          : "opacity-0 -translate-x-2 pointer-events-none"
                      }`}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                      }}
                    >
                      <li>
                        <Link
                          to="/solutions/cloud/aws"
                          onClick={() => setShowSubmenu(false)}
                          className="block hover:bg-[#008567]  hover:text-white p-2 rounded text-center"
                        >
                          AWS
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/solutions/cloud/multi-cloud"
                          onClick={() => setShowSubmenu(false)}
                          className="block hover:bg-[#008567]  hover:text-white p-2 rounded text-center"
                        >
                          Multi Cloud
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/solutions/cloud/aws-hybrid-cloud"
                          onClick={() => setShowSubmenu(false)}
                          className="block hover:bg-[#008567]  hover:text-white p-2 rounded text-center"
                        >
                          Hybrid Cloud
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/cloud/cloud-solution"
                          onClick={() => setShowSubmenu2(false)}
                        >
                          <li className="hover:bg-[#008567]  hover:text-white p-2 rounded text-center">
                            Cloud Migration
                          </li>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={() => setShowSubmenu2(true)}
                    onMouseLeave={() => setShowSubmenu2(false)}
                  >
                    <Link
                      to="/solutions/aws-solutions"
                      className="p-2 rounded whitespace-nowrap  hover:text-white hover:bg-[#008567] hover:px-4 flex items-center justify-between"
                    >
                      <span>AWS Solutions</span>
                      {showSubmenu2 ? (
                        <FaChevronUp className="ml-2" />
                      ) : (
                        <FaChevronDown className="ml-2" />
                      )}
                    </Link>

                    <ul
                      className={`absolute top-[-48px] left-full ml-0 w-80 rounded-md shadow-sm p-2 transition-all duration-300 ease-in-out ${
                        showSubmenu2
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-2 pointer-events-none"
                      }`}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                      }}
                    >
                      <Link
                        to="/solutions/cloud-solutions/titanX-data-transformation"
                        onClick={() => setShowSubmenu2(false)}
                      >
                        <li className="hover:bg-[#008567]  hover:text-white p-2 rounded text-center">
                          Titan X
                        </li>
                      </Link>

                      <Link
                        to="/solution/aws-solutions/omnibot-genai"
                        onClick={() => setShowSubmenu2(false)}
                      >
                        <li className="hover:bg-[#008567]  hover:text-white p-2 rounded text-center">
                          OmniBot
                        </li>
                      </Link>

                      <Link
                        to="/solution/aws-solutions/opsis-live-streaming"
                        onClick={() => setShowSubmenu2(false)}
                      >
                        <li className="hover:bg-[#008567]  hover:text-white p-2 rounded text-center">
                          Opsis Streaming
                        </li>
                      </Link>

                      <Link
                        to="/solutions/aws-solutions/customer-collaboration"
                        onClick={() => setShowSubmenu2(false)}
                      >
                        <li className="hover:bg-[#008567]  hover:text-white p-2 rounded text-center">
                          GX Customer Connect
                        </li>
                      </Link>

                      <Link
                        to="/solutions/aws-solutions/piosa-high-performance-storage"
                        onClick={() => setShowSubmenu2(false)}
                      >
                        <li className="hover:bg-[#008567]  hover:text-white p-2 rounded text-center">
                          Prolific I/O Storage Accelerator
                        </li>
                      </Link>
                      <Link
                        to="/solutions/aws-solutions/aws-migration-service"
                        onClick={() => setShowSubmenu2(false)}
                      >
                        <li className="whitespace-nowrap overflow-hidden text-ellipsis hover:bg-[#008567] hover:text-white p-2 rounded text-center">
                          Migration, Optimization, and Modernization
                        </li>
                      </Link>
                    </ul>
                  </li>

                  <li>
                    <Link
                      to="/solutions/collaboration-technologies"
                      className="block p-2 rounded hover:bg-[#008567]  hover:text-white whitespace-nowrap hover:px-2"
                    >
                      Collaboration Technologies
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/solutions/data-center-design"
                      className="block hover:bg-[#008567]  hover:text-white p-2 rounded whitespace-nowrap hover:px-2"
                    >
                      Data Center Design/Build
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/solutions/cyber-security"
                      className="block hover:bg-[#008567]  hover:text-white p-2 rounded whitespace-nowrap hover:px-2"
                    >
                      Cyber Security
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/solutions/small-medium-business"
                      className="block hover:bg-[#008567]  hover:text-white p-2 rounded whitespace-nowrap hover:px-2"
                    >
                      Small and Medium Business
                    </Link>
                  </li>

                  <li
                    className="relative"
                    onMouseEnter={() => setShowMLSubmenu(true)}
                    onMouseLeave={() => setShowMLSubmenu(false)}
                  >
                    <Link
                      to="/solutions/ai-ml-solutions"
                      className="p-2 rounded whitespace-nowrap  hover:text-white hover:bg-[#008567] hover:px-2 flex items-center justify-between"
                    >
                      <span>AI & Machine Learning Solutions</span>
                      {showMLSubmenu ? (
                        <FaChevronUp className="ml-2" />
                      ) : (
                        <FaChevronDown className="ml-2" />
                      )}
                    </Link>

                    <ul
                      className={`absolute top-[-8px] left-full w-80 rounded shadow-xl p-2 transition-all duration-300 ease-in-out transform ${
                        showMLSubmenu
                          ? "opacity-100 translate-x-0 pointer-events-auto"
                          : "opacity-0 -translate-x-2 pointer-events-none"
                      }`}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                      }}
                    >
                      <li>
                        <Link
                          to="/solutions/smart-transit"
                          onClick={() => setShowMLSubmenu(false)}
                          className="block hover:bg-[#008567]  hover:text-white p-2 rounded text-center"
                        >
                          Smart Transit
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/solutions/iot-in-healthcare"
                          onClick={() => setShowMLSubmenu(false)}
                          className="block hover:bg-[#008567]  hover:text-white p-2 rounded text-center"
                        >
                          IOT in Healthcare
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/ai-machine-learning-on-aws"
                          onClick={() => setShowMLSubmenu(false)}
                          className="block hover:bg-[#008567]  hover:text-white p-2 rounded text-center"
                        >
                          AI & Machine Learning on AWS
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Services link */}
          <li className="relative" onMouseEnter={() => handleMouseEnter(2)}>
            <Link
              className="flex items-center px-4 py-1 hover:text-green-400 "
              onClick={() => handleToggle(2)}
            >
              Services
              {openIndex === 2 ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </Link>

            {openIndex === 2 && (
              <div
                className="absolute top-full mt-[14px] left-0 bg-white shadow-lg rounded p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                }}
                onMouseLeave={handleMouseLeave}
              >
                <ul>
                  <li>
                    <Link
                      to="/service/field-services"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Field Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/service/managed-services"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Managed Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/service/professional-services"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Professional Services
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Industries link */}
          <li className="relative" onMouseEnter={() => handleMouseEnter(3)}>
            <Link
              className="flex items-center px-4 py-1 hover:text-green-400 "
              onClick={() => handleToggle(3)}
            >
              Industries
              {openIndex === 3 ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </Link>

            {openIndex === 3 && (
              <div
                className="absolute top-full mt-[14px] left-0 bg-white shadow-lg rounded p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                }}
                onMouseLeave={handleMouseLeave}
              >
                <ul>
                  <li>
                    <Link
                      to="/industries/aviation"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Aviation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/industries/education"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Education
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/industries/energy"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Energy
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/industries/healthcare"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Healthcare
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/industries/financial"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Financial
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/industries/retail"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Retail
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/industries/media-entertainment"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Media & Entertainment
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/industries/service-provider"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Service Provider
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/industries/government"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Government
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Insights link */}
          <li className="relative" onMouseEnter={() => handleMouseEnter(4)}>
            <Link
              className="flex items-center px-4 py-1 hover:text-green-400 "
              onClick={() => handleToggle(4)}
            >
              Insights
              {openIndex === 4 ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </Link>
            {openIndex === 4 && (
              <div
                className="absolute top-full mt-[14px] left-0 bg-white shadow-lg rounded p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                }}
                onMouseLeave={handleMouseLeave}
              >
                <ul>
                  <li>
                    <Link
                      to="/insights/blog"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Blog
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/insights/caseStudies"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Case Studies
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/insights/media-library"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Media Library
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/insights/partners"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          {/* Company Us link */}
          <li className="relative" onMouseEnter={() => handleMouseEnter(6)}>
            <Link
              to="#"
              className="flex items-center px-4 py-1 hover:text-green-400  whitespace-nowrap"
              onClick={() => handleToggle(6)}
            >
              Company
              {openIndex === 6 ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </Link>
            {openIndex === 6 && (
              <div
                className="absolute top-full mt-[14px] left-0 bg-white shadow-lg rounded p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(8, 12, 50), #172554, #172554)",
                }}
                onMouseLeave={handleMouseLeave}
              >
                <ul>
                  <li>
                    <Link
                      to="/company/about-us"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/careers"
                      className="block hover:bg-[#008567]   hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Careers
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact-us"
                      className="block hover:bg-[#008567] bg-[#068f36]    hover:text-white p-2 rounded whitespace-nowrap"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>

        {/* Get Started Link  lg: py-4*/}
        <div className="flex items-center md:hidden lg:flex lg:w-28 2xl:mr-14 bg-[#068f36]  lg:py-[13px] 2xl:py-[14px] lg:px-4 hover:bg-green-800 bg-[#008567] rounded-3xl border-gray-600 border-[1px]">
          <div className="2xl:ml-0 scroll-px-3 rounded-r-none 2xl:rounded-none transition-all duration-500 sm:rounded-md whitespace-nowrap">
            {/* hidden for mobile, visible on sm and larger */}
            <Link
              to="/contact-us"
              className="text-white text-base md:block hidden whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <button
          className="lg:hidden p-4 transform transition-transform z-50 duration-300 ease-in-out"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            className={`lg:hidden absolute top-14 left-0 w-full bg-white shadow-lg p-4 transition-transform duration-300 ease-in-out ${
              showMobileMenu
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0 pointer-events-none"
            }
            `}
          >
            <ul className="flex flex-col space-y-4 transition-all duration-300 ease-in-out">
              <li>
                <Link to="/" className="w-full text-left font-semibold">
                  Home
                </Link>
              </li>

              {/* industries Mobile Dropdown */}
              <li>
                <button
                  className="w-full text-left  justify-between items-center flex"
                  onClick={() => handleToggle(1)}
                >
                  Solutions
                  {openIndex === 1 ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {openIndex === 1 && (
                  <ul className="pl-4 space-y-2 transition-all duration-300 ease-in-out">
                    <li>
                      {/* Cloud & DevOps Button */}
                      <button
                        className="w-full text-left justify-between items-center flex font-medium"
                        onClick={() => setShowSubmenu(!showSubmenu)}
                      >
                        Cloud
                        {showSubmenu ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                      {/* Submenu for Cloud & DevOps */}
                      {showSubmenu && (
                        <ul className="pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ">
                          <li>
                            <Link to="/solutions/cloud/aws">AWS</Link>
                          </li>

                          <li>
                            <Link to="/solutions/cloud/multi-cloud">
                              Multi Cloud
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/cloud/aws-hybrid-cloud">
                              Hybrid Cloud
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/cloud/cloud-solution">
                              Cloud Migration
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      {/* Cloud & DevOps Button */}
                      <button
                        className="w-full text-left justify-between items-center flex font-medium"
                        onClick={() => setShowSubmenu2(!showSubmenu2)}
                      >
                        AWS Solutions
                        {showSubmenu2 ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                      {/* Submenu for Cloud & DevOps */}
                      {showSubmenu2 && (
                        <ul className="pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden  ">
                          <li>
                            <Link to="/solutions/cloud-solutions/titanX-data-transformation">
                              Titan X
                            </Link>
                          </li>
                          <li>
                            <Link to="/solution/AWS-solutions/omnibot-genai">
                              OmniBot
                            </Link>
                          </li>
                          <li>
                            <Link to="/solution/aws-solutions/opsis-live-streaming">
                              Opsis Streaming
                            </Link>
                          </li>

                          <li>
                            <Link to="/solutions/aws-solutions/aws-migration-service">
                              Migration, Modernization, & Optimization.
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/aws-solutions/customer-collaboration">
                              GX Customer Connect
                            </Link>
                          </li>

                          <li>
                            <Link to="/solutions/aws-solutions/piosa-high-performance-storage">
                              Prolific I/O Storage Accelerator
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/aws-solutions/aws-migration-service">
                              Migration, Modernization, & Optimization
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/aws-solutions">
                              Cloud Solutions
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="font-medium">
                      <Link to="/solutions/collaboration-technologies">
                        Collaboration Technologies
                      </Link>
                    </li>
                    <li className="font-medium">
                      <Link to="/solutions/data-center-design">
                        Data Center Design/Build
                      </Link>
                    </li>
                    <li className="font-medium">
                      <Link to="/solutions/cyber-security">Cyber Security</Link>
                    </li>
                    <li className="font-medium">
                      <Link to="/solutions/small-medium-business">
                        Small and Medium Business
                      </Link>
                    </li>
                    <li className="">
                      {/* AI & Machine Learning Solutions Button */}
                      <button
                        className="w-full text-left justify-between items-center flex font-medium"
                        onClick={() => setShowMLSubmenu(!showMLSubmenu)}
                      >
                        AI & Machine Learning Solutions
                        {showMLSubmenu ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>

                      {/* Submenu for AI & Machine Learning Solutions */}
                      {showMLSubmenu && (
                        <ul className="pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ">
                          <li>
                            <Link to="/solutions/smart-transit">
                              Smart Transit
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/iot-in-healthcare">
                              IOT in healthcare
                            </Link>
                          </li>
                          <li>
                            <Link to="/ai-machine-learning-on-aws">
                              AI & Machine Learning on AWS
                            </Link>
                          </li>
                          <li>
                            <Link to="/solutions/ai-ml-solutions">
                              AI & Machine Learning Solutions
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  className="w-full text-left font-semibold justify-between items-center flex"
                  onClick={() => handleToggle(2)}
                >
                  Services
                  {openIndex === 2 ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {openIndex === 2 && (
                  <ul className="pl-4 space-y-2 transition-all duration-300 ease-in-out">
                    <li className="font-medium">
                      <Link to="/service/field-services">Field Services</Link>
                    </li>
                    <li className="font-medium">
                      <Link to="/service/managed-services">
                        Managed Services
                      </Link>
                    </li>
                    <li className="font-medium">
                      <Link to="/service/professional-services">
                        Professional Services
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="w-full text-left font-semibold justify-between items-center flex"
                  onClick={() => handleToggle(3)}
                >
                  Industries
                  {openIndex === 3 ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {openIndex === 3 && (
                  <ul className="pl-4 space-y-2 transition-all duration-300 ease-in-out font-medium">
                    <li>
                      <Link to="/industries/aviation">Aviation</Link>
                    </li>
                    <li>
                      <Link to="/industries/education">Education</Link>
                    </li>
                    <li>
                      <Link to="/industries/energy">Energy</Link>
                    </li>
                    <li>
                      <Link to="/industries/healthcare">Healthcare</Link>
                    </li>
                    <li>
                      <Link to="/industries/financial">Financial</Link>
                    </li>
                    <li>
                      <Link to="/industries/retail">Retail</Link>
                    </li>

                    <li>
                      <Link to="/industries/media-entertainment">
                        Media & Entertainment
                      </Link>
                    </li>

                    <li>
                      <Link to="/industries/service-provider">
                        Service Provider
                      </Link>
                    </li>
                    <li>
                      <Link to="/industries/government">Government</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="w-full text-left font-semibold justify-between items-center flex"
                  onClick={() => handleToggle(4)}
                >
                  Insights
                  {openIndex === 4 ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {openIndex === 4 && (
                  <ul className="pl-4 space-y-2 transition-all duration-300 ease-in-out font-medium">
                    <li>
                      <Link to="/insights/blog">Blog</Link>
                    </li>
                    <li>
                      <Link to="/insights/caseStudies">Case Studies</Link>
                    </li>
                    <li>
                      <Link to="/insights/media-library">Media Library</Link>
                    </li>
                    <li>
                      <Link to="/insights/partners">Partners</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  className="w-full text-left font-semibold justify-between items-center flex"
                  onClick={() => handleToggle(6)}
                >
                  Company
                  {openIndex === 6 ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {openIndex === 6 && (
                  <ul className="pl-4 space-y-2 transition-all duration-300 ease-in-out font-medium">
                    <li>
                      <Link to="/company/about-us">About</Link>
                    </li>
                    <li>
                      <Link to="/careers">Careers</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* Get Started for Mobile */}
              <div className="bg-[#008567] text-white px-6 py-3 text-center rounded">
                <Link to="/contact-us">Contact Us</Link>
              </div>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;