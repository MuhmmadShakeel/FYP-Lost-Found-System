import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShieldCheck, Search, Users, ArrowRight } from "lucide-react";

function OurMission() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <section
      className="relative w-full py-4 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/185276302/photo/isolated-box-of-lost-and-found-items.jpg?s=612x612&w=0&k=20&c=qj_KMuDGWCVVLOsimBf7n-7cz5CwNZu0W_lVKp0Ua2o=')",
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#1E3A8A]">Mission</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Building a trusted lost & found ecosystem that reconnects people,
            protects communities, and restores what truly matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="group bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-10 text-white min-h-[280px] flex flex-col justify-between transition duration-500 hover:bg-[#1e3a8a] hover:shadow-2xl"
          >
            <div>
              <ShieldCheck
                size={42}
                className="mb-6 text-[#1E3A8A] transition duration-500 group-hover:text-white"
              />
              <h3 className="text-xl font-semibold mb-3">
                Secure Reporting
              </h3>
              <p className="text-gray-300 group-hover:text-white transition leading-relaxed">
                A safe and verified platform for reporting lost items, pets,
                and important belongings with confidence.
              </p>
            </div>

            <ArrowRight className="mt-6 text-white/60 group-hover:text-white transition" />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="group bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-10 text-white min-h-[280px] flex flex-col justify-between transition duration-500 hover:bg-[#1e3a8a] hover:shadow-2xl"
          >
            <div>
              <Search
                size={42}
                className="mb-6 text-[#1E3A8A] transition duration-500 group-hover:text-white"
              />
              <h3 className="text-xl font-semibold mb-3">
                Smart Tracking
              </h3>
              <p className="text-gray-300 group-hover:text-white transition leading-relaxed">
                Intelligent search and matching tools that speed up recovery
                and reduce the time items remain lost.
              </p>
            </div>

            <ArrowRight className="mt-6 text-white/60 group-hover:text-white transition" />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="group bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-10 text-white min-h-[280px] flex flex-col justify-between transition duration-500 hover:bg-[#1e3a8a] hover:shadow-2xl"
          >
            <div>
              <Users
                size={42}
                className="mb-6 text-[#1E3A8A] transition duration-500 group-hover:text-white"
              />
              <h3 className="text-xl font-semibold mb-3">
                Community Powered
              </h3>
              <p className="text-gray-300 group-hover:text-white transition leading-relaxed">
                Empowering citizens to collaborate and help each other
                reconnect with what truly matters.
              </p>
            </div>

            <ArrowRight className="mt-6 text-white/60 group-hover:text-white transition" />
          </div>

        </div>
      </div>
    </section>
  );
}
export default OurMission;