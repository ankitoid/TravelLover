import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Template = () => {
  return (
    <>
      <div className="bg-white text-gray-900">
        {/* Header */}
        <header className="flex items-center  px-8 py-4 border-b bg-gray-100 shadow-md justify-center">
          <div className="flex items-center">
            <img
              src="https://main-website-images1.s3.ap-south-1.amazonaws.com/insight/logos/newGxibg.png"
              alt="GlobalXperts Logo"
              className="w-28 h-12 mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-700">
               AI Solutions
            </h1>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-orange-500 text-sm font-bold uppercase">
              AI & Machine Learning
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Innovative AI Solutions for{" "}
              <span className="text-gray-700">Businesses</span>
            </h1>
            <p className="mt-4 text-gray-600">
              GlobalXperts provides cutting-edge AI/ML solutions designed to
              optimize business operations, enhance creativity, and boost
              employee productivity. Our solutions cater to various industries,
              ensuring seamless workflows and intelligent automation.
            </p>
            <ul className="mt-4 text-gray-700 list-disc list-inside">
              <li>Predictive Maintenance</li>
              <li>Fraud Detection</li>
              <li>Document Processing and Insights</li>
              <li>Content Moderation</li>
              <li>Data Augmentation</li>
            </ul>
            <p className="mt-4 text-gray-600">
              Experience the power of AI-driven business transformation. Get
              started today!
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-orange-500 text-center">
              Contact Us for AI Solutions
            </h3>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full p-2 border rounded"
              />
              <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* Experience Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://main-website-images1.s3.ap-south-1.amazonaws.com/solutions/Ai-Solutions/genaii.png"
            alt="AI Solutions"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold">
              Enhance Your Business with AI & ML
            </h2>
            <p className="mt-4 text-gray-600">
              GlobalXperts offers AI solutions for document processing, fraud
              detection, predictive maintenance, quality control, and more. Our
              AI tools help businesses improve efficiency, security, and
              customer experience.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-2xl font-bold">Our AI Capabilities</h2>
            <p className="text-gray-600 mt-4">
              Explore the power of AI across multiple industries.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">Business Optimization</h3>
                <p className="text-gray-600 mt-2">
                  Automate processes, optimize workflows, and enhance
                  efficiency.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">Customer Experience</h3>
                <p className="text-gray-600 mt-2">
                  Improve customer interactions with AI-powered chatbots and
                  virtual assistants.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg">
                  Security & Fraud Detection
                </h3>
                <p className="text-gray-600 mt-2">
                  Detect anomalies, prevent fraud, and ensure cybersecurity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="text-center py-4 px-6 bg-gray-50">
          <p className="italic text-gray-700 text-lg">
            "GlobalXperts AI solutions have revolutionized our business
            operations, enhancing efficiency and security. Highly recommended!"
          </p>
          <div className="mt-4">
            <img
              src="https://main-website-images1.s3.ap-south-1.amazonaws.com/insight/logos/newGxibg.png"
              alt="Testimonial"
              className="w-28 h-16 rounded-full mx-auto"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Address */}
            <div>
              <h3 className="text-lg font-bold">Address</h3>
              <p className="mt-2 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> 5540 Centerview Drive, Suite
                200, Raleigh, NC 27606
              </p>
            </div>
            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold">Contact Us</h3>
              <p className="mt-2 flex items-center">
                <FaPhoneAlt className="mr-2" /> +1 919-342-5482
              </p>
              <p className="mt-2 flex items-center">
                <FaEnvelope className="mr-2" /> info@globalxperts.net
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Industries
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm mt-6">
            &copy; 2025 GlobalXperts. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Template;
