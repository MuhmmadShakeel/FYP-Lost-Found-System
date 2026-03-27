import React from "react";
import {
  FaSearch,
  FaBullhorn,
  FaMapMarkerAlt,
  FaBell,
  FaShieldAlt,
  FaCloud,
  FaMobileAlt,
  FaUsers
} from "react-icons/fa";

const SystemServices= () => {
  const leftServices = [
    {
      icon: FaSearch,
      title: "Lost Item Reporting",
      desc: "Instantly report lost belongings to notify nearby users and authorities.",
      position: "lg:mr-[-140px]",
      aos: "fade-right",
    },
    {
      icon: FaBullhorn,
      title: "Found Item Submission",
      desc: "Upload found items and reconnect them with their rightful owners.",
      position: "lg:mr-[-50px]",
      aos: "fade-right",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location Tracking",
      desc: "Track lost and found items using accurate geolocation tools.",
      position: "lg:mr-[-50px]",
      aos: "fade-right",
    },
    {
      icon: FaBell,
      title: "Real-Time Notifications",
      desc: "Receive instant alerts about nearby lost and found items.",
      position: "lg:mr-[-140px]",
      aos: "fade-right",
    },
  ];

  const rightServices = [
    {
      icon: FaShieldAlt,
      title: "Secure & Verified",
      desc: "All reports are verified to ensure authenticity and prevent misuse.",
      position: "lg:ml-[-140px]",
      aos: "fade-left",
    },
    {
      icon: FaCloud,
      title: "Cloud Storage",
      desc: "All item reports are stored securely for quick retrieval anytime.",
      position: "lg:ml-[-50px]",
      aos: "fade-left",
    },
    {
      icon: FaMobileAlt,
      title: "Mobile-Friendly",
      desc: "Access and manage lost & found reports directly from your phone.",
      position: "lg:ml-[-50px]",
      aos: "fade-left",
    },
    {
      icon: FaUsers,
      title: "Community Support",
      desc: "Engage with other users to maximize recovery chances of items.",
      position: "lg:ml-[-140px]",
      aos: "fade-left",
    },
  ];

  const ServiceCard = ({ service, side }) => (
    <div
      data-aos={service.aos}
      data-aos-duration="900"
      className={`
        w-full sm:w-full lg:w-[400px] group relative rounded-lg lg:rounded-xl 
        p-5 shadow-md border border-gray-100
        transition-all duration-500 ease-in-out transform hover:-translate-y-2
        ${service.position} 
        ${side === "left" ? "lg:rounded-r-full" : "lg:rounded-l-full"}
        hover:bg-gradient-to-r hover:from-[#1E3A8A] hover:via-[#1E3A8A] hover:to-[#3A5EDB]
        hover:shadow-[inset_0_0_25px_rgba(30,58,138,0.4)]
      `}
    >
      <div className="flex items-center space-x-4 mb-2">
        <div
          className="p-3 rounded-full transition-all duration-500 ease-in-out 
          group-hover:bg-gradient-to-r group-hover:from-[#1E3A8A] group-hover:to-[#3A5EDB]
          group-hover:shadow-[0_0_20px_rgba(58,94,219,0.5)]"
        >
          <service.icon className="text-[#1E3A8A] text-xl transition-all duration-500 group-hover:text-white" />
        </div>
        <h2
          className="text-lg font-semibold text-[#1E3A8A] transition-all duration-500 
          group-hover:text-white"
        >
          {service.title}
        </h2>
      </div>

      <p
        className={`text-gray-600 transition-all duration-500 group-hover:text-white
        ${side === "right" ? "lg:pl-10" : "lg:pr-10"}`}
      >
        {service.desc}
      </p>
    </div>
  );

  return (
    <div className="w-full bg-[#F0F4FF] py-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center lg:text-left">
        <span
          className="inline-block text-lg font-semibold tracking-wider text-[#1E3A8A] uppercase
          bg-[#1E3A8A0F] px-4 py-2 rounded-full mb-3 shadow-inner"
        >
          System Services
        </span>

        <h1 className="text-4xl font-extrabold text-[#1E3A8A] mb-4">
          City Wide Lost & Found Features
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto lg:mx-0">
          Our system provides a smart, secure, and connected experience for
          reporting, tracking, and recovering lost items across the city.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-7xl mx-auto">
        {/* Left Services */}
        <div className="lg:col-span-4 flex flex-col gap-5 items-center lg:items-end">
          {leftServices.map((s, i) => (
            <ServiceCard key={i} service={s} side="left" />
          ))}
        </div>

        {/* Center Image */}
        <div
          data-aos="zoom-in"
          data-aos-duration="1200"
          className="lg:col-span-4 flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_35px_rgba(30,58,138,0.4)] rounded-full">
            <img
              src="https://www.utm.utoronto.ca/shuttle/sites/files/shuttle/styles/square_l/public/2024-02/Lost%20%26%20Found%20Icon_0.jpg.webp?itok=SERZNOL-"
              alt="Lost and Found"
              className="w-full h-full rounded-full object-cover shadow-xl border-8 border-white"
            />
          </div>
        </div>

        {/* Right Services */}
        <div className="lg:col-span-4 flex flex-col gap-5 items-center lg:items-start">
          {rightServices.map((s, i) => (
            <ServiceCard key={i} service={s} side="right" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SystemServices;
