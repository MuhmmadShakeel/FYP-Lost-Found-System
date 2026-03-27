import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function OurTestimonials() {
  const testimonials = [
    {
      name: "Client 1",
      image: "https://i.ibb.co/8x9xK4H/team.jpg",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries.",
    },
    {
      name: "Client 2",
      image: "https://i.ibb.co/8x9xK4H/team.jpg",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It was popularised in the 1960s.",
    },
    {
      name: "Client 3",
      image: "https://i.ibb.co/8x9xK4H/team.jpg",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section
      className="relative mt-14 py-14 overflow-hidden bg-cover bg-center"
      
      data-aos="fade-up"
    >
      <div className="relative max-w-6xl mx-auto px-6 text-[#1E3A8A] text-center">

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold uppercase mb-16 tracking-wide"
          data-aos="fade-down"
        >
          Testimonials
        </h2>

        {/* Slider Wrapper */}
        <div className="relative overflow-hidden"> 
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center px-6 rounded bg-[#1E3A8A] py-10 overflow-hidden"
              >
                <div className="p-10 rounded-3xl shadow-2xl max-w-3xl bg-white text-[#1E3A8A]">
                  
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl object-cover"
                  />

                  {/* Text */}
                  <p className="mt-8 text-lg md:text-xl leading-relaxed">
                    {item.text}
                  </p>

                  {/* Name */}
                  <h4 className="mt-6 text-2xl font-semibold">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <FaChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-10 space-x-3">

          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                current === index
                  ? "bg-white scale-125"
                  : "bg-gray-400"
              }`}
            ></div>
          ))}

      </div>
      </div>
    </section>
  );
}

export default OurTestimonials;
