import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function AboutHeader() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative w-full bg-[#f5f7fb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 py-24">

        <div
          className="lg:w-1/2 text-left"
          data-aos="fade-right">
          <h1 className="text-5xl font-bold text-[#1e3a8a] relative z-10 mb-6">
            About Us
          </h1>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
            Our City-Wide Lost & Found system is designed to connect communities,
            making it easier than ever to report, track, and recover lost items. 
            We believe in leveraging technology to ensure nothing is ever truly lost.
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Whether you’re reporting a lost item or helping someone reunite with theirs,
            our platform is user-friendly, efficient, and built to keep communities connected.
          </p>
        </div>

        <div
          className="lg:w-1/2 relative flex justify-center items-center"
          data-aos="fade-left"
        >
          <span className="absolute top-10 left-[-30px] text-8xl md:text-9xl font-extrabold text-white/20 select-none pointer-events-none">
            About Us
          </span>

          <img
            src="https://media.istockphoto.com/id/520874874/photo/futuristic-about-us-concept-on-hi-tech-touchscreen.jpg?b=1&s=1024x1024&w=0&k=20&c=r6rG2XQLSpkxm6HddXWRjhH8ieChmy23n4BXv5kZhMY="
            alt="About Us"
            className="relative w-full h-[400px] object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
}

export default AboutHeader;