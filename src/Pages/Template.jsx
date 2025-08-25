import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ContactForm from "./ContactFrom";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Template = () => {
  return (
    <>
    <Navbar/>
      {/* Hero Section (you already have this above) */}
      <div className="bg-[#0c2b3b] w-full">
        <div className="max-w-7xl mx-auto py-20 lg:h-[70vh] 2xl:h-[50vh]">
          <div className="h-auto flex flex-col items-center lg:flex-row justify-between px-6 lg:px-16">
            <div className="w-full text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-3xl sm:mt-40 lg:text-4xl font-bold text-white mt-10 lg:mt-20 2xl:mt-20">
                IT Services in California - GlobalXperts MSP
              </h2>
              <div className="md:px-0 px-20 flex flex-col sm:flex-row justify-center lg:justify-start mt-6 lg:mt-10 space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/contact-us"
                  className="bg-[#35ca7f] hover:bg-blue-700 transition duration-300 text-white font-bold py-2 px-6 rounded-full shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="w-full text-left lg:text-right mt-10 order-3 lg:order-2 sm:p-2 md:p-0">
              <p className="text-base lg:text-lg text-white max-w-xl mx-auto lg:mx-0 text-left p-4 md:p-0">
                To enhance the live streaming experience for its fans, a leading
                Tire 1 sports franchise partnered with GlobalXperts to deliver a
                reliable, high-quality streaming service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our IT Services in California
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Managed IT Services */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#0c2b3b] mb-4">
              Managed IT Services
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ 24/7 IT Helpdesk Support</li>
              <li>✅ Proactive monitoring & patching</li>
              <li>✅ End-user support with rapid response</li>
              <li>✅ Strategic IT planning</li>
            </ul>
          </div>

          {/* Cloud & AWS */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#0c2b3b] mb-4">
              Cloud & AWS Services
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ AWS architecture design & migration</li>
              <li>✅ Cloud cost optimization</li>
              <li>✅ Hybrid (AWS + on-prem) enablement</li>
              <li>✅ Secure & compliant deployments</li>
            </ul>
          </div>

          {/* Cybersecurity */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#0c2b3b] mb-4">
              Cybersecurity Services
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Threat detection & response (SIEM, SOC)</li>
              <li>✅ HIPAA / NIST / PCI-DSS compliance</li>
              <li>✅ Penetration testing & vulnerability scans</li>
              <li>✅ Security awareness training</li>
            </ul>
          </div>

          {/* Virtualization */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#0c2b3b] mb-4">
              Virtualization Services
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ VMware deployment & support</li>
              <li>✅ Nutanix consulting (LA, Bay Area)</li>
              <li>✅ Hyper-V integration</li>
              <li>✅ Disaster recovery readiness</li>
            </ul>
          </div>

          {/* Healthcare IT */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#0c2b3b] mb-4">
              Healthcare IT
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Digital Health Cloud in San Francisco</li>
              <li>✅ Telemedicine IT support across California</li>
              <li>✅ HIPAA-compliant EHR infrastructure</li>
              <li>✅ 24/7 healthcare IT support</li>
            </ul>
          </div>

          {/* Field Services */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-[#0c2b3b] mb-4">
              IT Field Services
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Onsite IT support across California</li>
              <li>✅ Rapid response dispatch teams</li>
              <li>✅ Hardware setup & troubleshooting</li>
              <li>✅ Multi-location enterprise coverage</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Template;
