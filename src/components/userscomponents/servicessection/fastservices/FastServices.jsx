import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function FastServices() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#f4f7fc] overflow-hidden">

      {/* Section Heading */}
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C3D] mb-4">
          Lost & Found Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A secure, intelligent, and community-powered platform designed to
          reconnect individuals with their belongings quickly, safely, and efficiently.
        </p>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">

        {/* LEFT IMAGE */}
        <div className="relative flex justify-center" data-aos="fade-right">
          <img
            src="https://i.pinimg.com/1200x/ad/76/d2/ad76d2fb58fe3caed986276cda5edda8.jpg"
            alt="Report Lost Item"
            className="w-[280px] md:w-[340px] rounded-2xl shadow-xl object-cover"
          />

          {/* Floating Card */}
          <div
            className="absolute -right-12 bottom-12 w-[240px] p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-[#0B1C3D] animate-floatingCard"
            data-aos="zoom-in"
          >
            <h3 className="text-lg font-semibold text-[#0B1C3D] mb-2">
              Report Lost Items
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Quickly submit detailed lost item reports including location,
              category, and identifying details to improve recovery chances.
            </p>

            <div className="absolute -top-3 -left-3 w-8 h-8 border-2 border-[#0B1C3D] rounded-full animate-ringUp opacity-70"></div>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div
          className="text-center lg:text-left max-w-xl"
          data-aos="fade-up"
        >
          <h3 className="text-3xl font-bold text-[#0B1C3D] mb-5">
            Smart • Secure • Community-Driven
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our Lost & Found system leverages structured reporting,
            intelligent matching algorithms, and secure ownership verification
            to ensure fast and trustworthy item recovery. Whether you lost
            something valuable or found a misplaced belonging, our platform
            bridges the gap with efficiency and transparency.
          </p>

          <button className="bg-[#0B1C3D] text-white cursor-pointer px-10 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#132a5c] transition-all duration-300">
            Explore Services
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center" data-aos="fade-left">
          <img
            src="https://i.pinimg.com/736x/29/43/59/2943591324acb2e1dc9c1d2115d8c6fe.jpg"
            alt="Register Found Item"
            className="w-[300px] md:w-[340px] rounded-2xl shadow-xl object-cover"
          />

          {/* Floating Card */}
          <div
            className="absolute -left-12 top-16 w-[240px] p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-[#132a5c] animate-floatingCard"
            data-aos="zoom-in"
          >
            <h3 className="text-lg font-semibold text-[#132a5c] mb-2">
              Register Found Items
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Securely register found belongings into the system and help
              reconnect them with rightful owners through smart matching.
            </p>

            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-2 border-[#132a5c] rounded-full animate-ringUp opacity-70"></div>
          </div>
        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes ringUp {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(-10px); opacity: 0.3; }
        }

        .animate-ringUp {
          animation: ringUp 1.8s infinite alternate ease-in-out;
        }

        @keyframes floatingCard {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }

        .animate-floatingCard {
          animation: floatingCard 2.5s infinite alternate ease-in-out;
        }
      `}</style>

    </section>
  );
}

export default FastServices;