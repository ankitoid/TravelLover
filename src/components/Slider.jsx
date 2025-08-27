import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

// Replace with your actual images
import img1 from "../assets/california-it-service.png";
import img2 from "../assets/texas.png";
import img3 from "../assets/new-york.png";
import img4 from "../assets/florida.png";
import img5 from "../assets/Illinois.png";

const services = [
  {
    title: "California IT Services",
    description: "Serving businesses in Los Angeles, San Francisco, San Diego, San Jose, and Sacramento.",
    image: img1,
    path: "/airline-digital",
  },
  {
    title: "Texas IT Services",
    description: "Supporting organizations in Dallas, Houston, Austin, San Antonio, and Fort Worth.",
    image: img2,
    path: "/airport-ground-ops",
  },
  {
    title: "New York IT Services",
    description: "Delivering IT solutions for New York City, Buffalo, Rochester, Albany, and Syracuse.",
    image: img3,
    path: "/cargo-logistics",
  },
  {
    title: "Florida IT Services",
    description: "Covering Miami, Tampa, Orlando, Jacksonville, and Tallahassee.",
    image: img4,
    path: "/saas-deployment",
  },
  {
    title: "Illinois IT Services",
    description: "Partnering with businesses in Chicago, Springfield, Peoria, Naperville, and Rockford.",
    image: img5,
    path: "/consulting-innovation",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const totalItems = services.length;

  const maxSlideIndex = useMemo(() => {
    return Math.max(0, totalItems - itemsPerView);
  }, [itemsPerView]);

  // Reset slide if screen size changes
  useEffect(() => {
    if (currentSlide > maxSlideIndex) {
      setCurrentSlide(0);
    }
  }, [maxSlideIndex, currentSlide]);

  // Auto slide (depends on maxSlideIndex)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [maxSlideIndex]);

  // Responsive item count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 768) {
        setItemsPerView(2);
      } else if (width < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize(); // initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  return (
    <div className="relative w-full max-w-[80rem] mx-auto px-6 py-4 overflow-hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(100 / totalItems) * currentSlide}%)`,
            width: `${(100 / itemsPerView) * totalItems}%`,
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4 md:px-2"
              style={{
                width: `${100 / totalItems}%`,
                minWidth: "280px",
                maxWidth: "360px",
              }}
            >
              <div
                className="relative h-96 rounded-sm overflow-hidden shadow-lg border border-gray-600 bg-cover bg-center  "
                style={{
                  backgroundImage: `url(${service.image})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute hover:bg-black/35 bg-black/20 flex inset-0  bg-opacity-50 p-4 flex-col justify-end cursor-pointer">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-100 mt-4 mb-4">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    to={service.path}
                    className="mt-4  flex justify-end   text-white rounded hover:font-semibold transition"
                  >
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-end items-center mt-6 gap-2">
        <button
          onClick={prevSlide}
          className="px-3 py-1 border rounded bg-blue-800 hover:bg-black text-white"
        >
          &lt;
        </button>
        <span className="text-white text-sm">
          {currentSlide + 1} / {maxSlideIndex + 1}
        </span>
        <button
          onClick={nextSlide}
          className="px-3 py-1 border rounded bg-blue-800 hover:bg-black text-white"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;