import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import mymobileaap from '../../../../assets/images/mymobileaap.png'
function MobileApp() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="bg-[#1E3A8A] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-18 flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left Content */}
        <div
          className="text-white max-w-xl"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Mobile App <br />
            <span className="text-gray-200">Coming Soon</span>
          </h2>

          <p className="text-lg text-gray-200 leading-relaxed mb-10">
            Experience the future of city-wide lost & found management.
            Our upcoming mobile application will allow you to report,
            track, and recover lost items instantly — anytime, anywhere.
          </p>
        </div>

        {/* Right Image */}
        <div
          className="relative"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl"></div>

          <img
            src={mymobileaap}
            alt="Mobile App Preview"
            className="relative w-[320px] lg:w-[400px] rounded-3xl"
          />
        </div>

      </div>
    </section>
  );
}

export default MobileApp;