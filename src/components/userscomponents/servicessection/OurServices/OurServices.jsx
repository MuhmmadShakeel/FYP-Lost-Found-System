import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import pinterestimg from "../../../../assets/images/pinterest.mp4";
import lostpost from "../../../../assets/images/lostpost.mp4";


function OurServices() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const services = [
    {
      title: "Report Lost Items",
      description:
        "Submit detailed reports including item category, distinguishing features, location, and time of loss. Our structured workflow ensures accurate documentation and increases recovery success through organized digital case management.",
      video: lostpost,
    },
    {
      title: "Register Found Items",
      description:
        "Individuals can securely register discovered belongings. Each entry is categorized and intelligently indexed, improving discoverability while maintaining complete data privacy and transparency.",
      image:
        "https://media.istockphoto.com/id/1319763415/photo/african-mid-woman-using-smartphone-at-home.jpg?s=612x612&w=0&k=20&c=vSYvylj1ykCwdIZ5ZHg0R2-NEzCXDkNjgBA2CPBVtDM=",
    },
    {
      title: "Smart Matching System",
      description:
        "Our intelligent engine analyzes descriptions, timestamps, and location data to automatically identify high-probability matches. This significantly reduces manual effort while maximizing speed and accuracy.",
      video: pinterestimg,
    },
    {
      title: "Secure Ownership Verification",
      description:
        "Before final handover, our secure verification process confirms rightful ownership through identity validation and item-specific confirmation checkpoints — ensuring safe and fraud-free returns.",
      image:
        "https://cdn.authenticating.com/public/cms/cm9jj09yk001odgoe13pyhkwt_md.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 px-6 relative overflow-hidden">
      {/* Header */}
      <div
        className="text-center max-w-3xl mx-auto mb-28"
        data-aos="fade-up"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#0B1C3D] mb-6">
          Our Professional Services
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Our Lost & Found platform delivers a secure, intelligent, and
          community-driven ecosystem that reconnects individuals with their
          valuables through automation, structured workflows, and trusted
          verification systems.
        </p>
      </div>

      {/* Center Vertical Timeline Line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-[320px] bottom-0 w-[3px] bg-[#0B1C3D] opacity-15"></div>

      {/* Services Section */}
      <div className="space-y-28 max-w-6xl mx-auto relative">
        {services.map((service, index) => (
          <div
            key={index}
            className="grid md:grid-cols-2 gap-16 items-center relative"
          >
            {/* Timeline Dot */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#0B1C3D] rounded-full border-4 border-white shadow-lg z-10"></div>

            <div
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={`${index % 2 !== 0 ? "md:order-2" : ""}`}
            >
              {service.video ? (
                <video
                  src={service.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="rounded-xl shadow-xl w-full h-[220px] object-cover"
                />
              ) : (
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-xl shadow-xl w-full h-[220px] object-cover hover:scale-105 transition duration-500"
                />
              )}
            </div>

            <div
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              className="space-y-4"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-[#0B1C3D]">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurServices;