import React, { useState, useEffect } from "react";

function ServicesHeader() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      title: "Smart Lost & Found Solutions",
      description:
        "Connecting people with their belongings through secure and intelligent recovery services.",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
      title: "Secure & Verified Process",
      description:
        "Ensuring safe reporting, smart matching, and trusted verification every step of the way.",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg",
      title: "Community Powered Network",
      description:
        "Building a collaborative ecosystem that restores trust and reconnects communities.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">

      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#0B1C3D]/80"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
                {slide.description}
              </p>

              <div className="flex gap-4">
                <button className="px-6 py-3 cursor-pointer bg-white text-[#0B1C3D] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition">
                  Explore Services
                </button>
                <button className="px-6 cursor-pointer py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0B1C3D] transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute cursor-pointer top-0 left-0 h-full px-6 flex items-center text-white text-3xl font-bold hover:bg-black/20 transition"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-0 cursor-pointer right-0 h-full px-6 flex items-center text-white text-3xl font-bold hover:bg-black/20 transition"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default ServicesHeader;