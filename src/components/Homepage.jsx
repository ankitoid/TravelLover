import { Link } from "react-router-dom";
import heroBg from "../assets/gx-aviation.png";
import Navbar from "./navbar";
import Slider from "./Slider";
// import Footer from "./footer";
const Homepage = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative bg-fixed  bg-center bg-white text-white rounded-bl-[100px] rounded-br-[100px]"
        style={{
          backgroundImage: `url(${heroBg})`,
          minHeight: "80vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 rounded-bl-[100px] rounded-br-[100px]"></div>

        <div className="relative z-10 mt-6 px-4 py-32 text-left 2xl:ml-14 md:ml-6 ml-2 max-w-5xl">
          <h1 className="flex flex-wrap items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white  drop-shadow-md leading-snug">
            IT Services Across the USA
            <span className="flex gap-[-10px]  ">
              <img
                src="https://main-website-images1.s3.ap-south-1.amazonaws.com/Lending-Page-Image/logo/full_logo.png"
                className="h-20 md:h-16 lg:h-20 md:pb-0 pb-20 mt-2"
                alt="Logo"
              />
            </span>
            MSP
          </h1>

          <div className="flex flex-wrap gap-4 text-lg">
            <Link
              to="/company/contact-us"
              className="bg-blue-700 hover:bg-green-700 text-white  px-5 py-3 rounded-lg shadow-md transition duration-300"
            >
              Get in touch with our GX AviationXperts
            </Link>
          </div>
        </div>
      </section>

      <section className=" flex md:flex-row  items-center justify-center  py-10 px-10 gap-10">
        <div className="w-full md:w-1/2">
          <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-2xl  text-black  drop-shadow-md leading-snug">
            Nationwide IT Services – Scalable Solutions Across Key States{" "}
          </h1>
          <p className=" text-md mt-1 p-3">
            GlobalXperts provides end-to-end IT services across the USA, helping
            SMBs, enterprises, and healthcare providers transform their
            technology with confidence. With teams and field engineers covering
            California, Texas, New York, Florida, and Illinois, we deliver 24/7
            managed IT support, AWS cloud consulting, cybersecurity,
            virtualization, healthcare IT, and onsite services wherever you need
            them.{" "}
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://main-website-images1.s3.ap-south-1.amazonaws.com/Company/About.webp"
            alt=""
            className="rounded-3xl"
          />
        </div>
      </section>

      <section className="bg-[#323ea8] text-white min-h-screen py-6 rounded-tl-[100px] rounded-tr-[100px] mt-0">
        <h2 className="text-3xl font-bold text-center mb-2">
          {" "}
          Explore Our Service Areas
        </h2>
        <Slider />

        <div className="text-center text-white  px-4">
          <p className="text-xl text-gray-100 mt-2">
            Get in touch with our experts for a tailored consultation.
          </p>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
