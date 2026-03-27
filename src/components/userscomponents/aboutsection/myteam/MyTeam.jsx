import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const MyTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const teamData = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      name: "Ahmed Khan",
      role: "Founder & System Architect",
      description:
        "Ahmed leads the vision and technical architecture of the Lost & Found System, ensuring a secure, scalable, and intelligent platform that connects communities efficiently.",
      bgColor: "bg-white",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      name: "Sara Malik",
      role: "UI/UX Design Lead",
      description:
        "Sara designs seamless and intuitive user experiences, making the platform accessible, user-friendly, and visually professional across all devices.",
      bgColor: "bg-[#0B1C3D]",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      name: "Bilal Hussain",
      role: "Backend & Security Engineer",
      description:
        "Bilal ensures system reliability and data security, implementing strong authentication and verification processes for safe item recovery.",
      bgColor: "bg-white",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
      name: "Hina Ahmed",
      role: "Community & Operations Manager",
      description:
        "Hina coordinates community engagement and operational workflows, ensuring fast response times and smooth communication between users.",
      bgColor: "bg-[#0B1C3D]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full bg-[#F8FAFC] min-h-screen py-20">
      {/* Section Heading */}
      <div
        className="max-w-7xl mx-auto px-6 text-center mb-16"
        data-aos="fade-up"
      >
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-6">
          Meet Our Professional Team
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A dedicated group of professionals committed to building a secure,
          intelligent, and community-driven Lost & Found System.
        </p>
      </div>

      {/* Dual Carousel */}
      <div
        className="max-w-7xl mx-auto px-6"
        data-aos="zoom-in-up"
      >
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT SIDE - TEAM IMAGE */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {teamData.map((member) => (
                  <div key={member.id} className="w-full flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {teamData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-[#1E3A8A] scale-125"
                        : "bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative overflow-hidden rounded-3xl h-full">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {teamData.map((member) => (
                  <div
                    key={member.id}
                    className={`w-full flex-shrink-0 p-10 rounded-3xl ${member.bgColor} h-full flex flex-col justify-center`}
                  >
                    <h2
                      className={`text-3xl font-bold mb-3 ${
                        member.bgColor === "bg-[#1E3A8A]"
                          ? "text-white"
                          : "text-[#1E3A8A]"
                      }`}
                    >
                      {member.name}
                    </h2>

                    <h4
                      className={`text-lg font-semibold mb-6 ${
                        member.bgColor === "bg-[#1E3A8A]"
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      {member.role}
                    </h4>

                    <p
                      className={`text-lg leading-relaxed ${
                        member.bgColor === "bg-[#1E3A8A]"
                          ? "text-white/90"
                          : "text-gray-700"
                      }`}
                    >
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MyTeam;