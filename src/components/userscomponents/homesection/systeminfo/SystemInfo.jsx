import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://i.pinimg.com/1200x/98/e9/97/98e9979ef1e6c7985bff181a548191e2.jpg",
  "https://i.pinimg.com/1200x/c3/d6/6a/c3d66aaf47faee1fd7da8ed909c6fcc7.jpg",
  "https://www.shutterstock.com/image-vector/grunge-rubber-stamp-text-lost-260nw-2188447711.jpg"
];

function SystemInfo() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-2  items-center">

          {/* TEXT SECTION */}
          <div
            className="md:pr-6 lg:pr-10 mb-8"
            data-aos="fade-right"
          >
            {/* TITLE */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-[#1E3A8A] leading-tight">
              About System
            </h2>

            {/* SUBTITLE */}
            <p className="text-gray-600 text-base md:text-lg mb-2">
              A secure, intelligent platform designed to reconnect people.
            </p>

            {/* PARAGRAPHS */}
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Our Lost &amp; Found System is built to help individuals recover lost belongings
              in a fast, reliable, and transparent way. By connecting item owners with
              verified finders, the platform removes uncertainty and delays.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Users can report lost or found items in seconds, track updates in real time,
              and communicate securely. Location-based reporting and smart notifications
              ensure accurate matching.
            </p>

            <p className="text-gray-700 md:text-lg leading-relaxed">
              Designed for smart cities, institutions, and communities, the system promotes
              trust, responsibility, and social cooperation.
            </p>
          </div>

          {/* SLIDER SECTION */}
          <div
            className="md:pl-6 lg:pl-10 flex justify-center"
            data-aos="fade-left"
          >
            <div className="relative w-full max-w-xl">

              {/* Soft Glow Background */}
              <div className="absolute -inset-4 rounded-3xl shadow-2xl bg-blue-100 blur-3xl opacity-40"></div>

              <Slider {...settings} className="relative">
                {images.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Lost and Found Preview ${index + 1}`}
                      className=" w-full h-[340px] rounded-3xl  md:h-[420px]  object-cover object-fill transition-all duration-500"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SystemInfo;
