import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeHeader = () => {
  const slides = [
    {
      id: 1,
      title: "Lost Items Reunited With Owners",
      whiteWords: ["Lost", "With"],
      subtitle: "A Smart City-Wide Lost & Found System",
      description:
        "Report lost belongings instantly and connect with verified finders through a secure digital platform designed for speed, trust, and reliability.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      id: 2,
      title: "Report Lost Or Found In Seconds",
      whiteWords: ["Lost", "Found"],
      subtitle: "Simple  Secure  Efficient",
      description:
        "Post lost or found items using your mobile phone with accurate details and location tagging to maximize recovery success.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      id: 3,
      title: "Connecting Communities Through Technology",
      whiteWords: ["Connecting", "Through"],
      subtitle: "People Helping People",
      description:
        "Our system bridges the gap between owners and finders, promoting honesty, transparency, and social responsibility.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      id: 4,
      title: "Safe Recovery With Verified Users",
      whiteWords: ["Safe", "Verified"],
      subtitle: "Trust Built Into The System",
      description:
        "Every interaction is protected with user verification and controlled communication to ensure secure and safe item recovery.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    },
    {
      id: 5,
      title: "More Than Items Reuniting Lives",
      whiteWords: ["More", "Lives"],
      subtitle: "Because Some Losses Are Personal",
      description:
        "From important documents to beloved pets, we help reunite what truly matters and restore peace of mind.",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, offset: 100 });

    
   //keep index inside array length
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    },5000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative h-[90vh] overflow-hidden bg-[#F8FAFC]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-40" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A]/90 to-[#1E3A8A]/50 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-5 md:px-6 lg:px-8">
        <div className="max-w-3xl animate-fadeIn">
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-6 transition-all duration-1000"
            data-aos="zoom-in"
            key={currentSlide.id}>
            {currentSlide.title.split(" ").map((word, i) => {
              const isWhite = currentSlide.whiteWords.includes(word);
              return (
                <span
                  key={i}
                  className={
                    isWhite
                      ? "text-white"
                      : "bg-white bg-clip-text text-transparent"
                  }
                >
                  {word + " "}
                </span>
              );
            })}
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 mb-4"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            {currentSlide.subtitle}
          </p>

          <p
            className="text-md md:text-lg text-white/80 leading-relaxed mb-8"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {currentSlide.description}
          </p>
        </div>

        {/* Dots */}
        <div className="flex space-x-3 mt-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 cursor-pointer rounded-full ${
                currentIndex === index
                  ? "bg-white w-8 h-3 shadow-lg"
                  : "bg-white/40 w-3 h-3 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
      `}</style>
    </section>
  );
};

export default HomeHeader;






