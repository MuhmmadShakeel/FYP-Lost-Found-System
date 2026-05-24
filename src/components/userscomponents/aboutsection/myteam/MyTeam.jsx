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
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      name: "Umar Lateef",
      role: "UI/UX Design Lead",
      description:
        "Sara designs seamless and intuitive user experiences, making the platform accessible, user-friendly, and visually professional across all devices.",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      name: "Maria Gillani",
      role: "Backend & Security Engineer",
      description:
        "Bilal ensures system reliability and data security, implementing strong authentication and verification processes for safe item recovery.",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
      name: "Hina Ahmed",
      role: "Community & Operations Manager",
      description:
        "Hina coordinates community engagement and operational workflows, ensuring fast response times and smooth communication between users.",
    },
  ];

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teamData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [teamData.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#F8FAFC] to-[#EAF1FF] py-24 overflow-hidden">
      {/* HEADING */}
      <div
        className="max-w-7xl mx-auto px-6 text-center mb-20"
        data-aos="fade-up"
      >
        <span className="inline-block px-5 py-2 rounded-full bg-[#DBEAFE] text-[#1E3A8A] font-semibold text-sm tracking-wide mb-6">
          OUR PROFESSIONAL TEAM
        </span>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight mb-6">
          Meet The Experts Behind <br />
          Our Lost & Found System
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Our dedicated team combines innovation, security, and user-focused
          design to build a trusted and professional Lost & Found platform for
          communities.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div
        className="max-w-7xl mx-auto px-6"
        data-aos="zoom-in-up"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE CAROUSEL */}
          <div className="relative">
            <div className="overflow-hidden rounded-[30px] shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                }}
              >
                {teamData.map((member) => (
                  <div
                    key={member.id}
                    className="min-w-full relative"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[500px] object-cover" />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                    {/* Name Overlay */}
                    <div className="absolute bottom-8 left-8 text-white">
                      <h2 className="text-3xl font-bold mb-2">
                        {member.name}
                      </h2>

                      <p className="text-white/80 text-lg">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-6 gap-3">
              {teamData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${activeIndex === index
                    ? "w-10 h-3 bg-[#1E3A8A]"
                    : "w-3 h-3 bg-gray-300 hover:bg-[#93C5FD]"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT CAROUSEL */}
          <div className="relative overflow-hidden h-[500px]">

            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {teamData.map((member) => (
                <div
                  key={member.id}
                  className="min-w-full h-full"
                >
                  <div className="bg-white h-full rounded-[30px] shadow-2xl border border-gray-100 p-10 md:p-14 flex flex-col justify-center">

                    {/* SMALL TAG */}
                    <div className="mb-6">
                      <span className="px-4 py-2 bg-[#DBEAFE] text-[#1E3A8A] rounded-full text-sm font-semibold">
                        Team Member
                      </span>
                    </div>

                    <h2 className="text-4xl font-extrabold text-[#1E3A8A] mb-4 leading-tight">
                      {member.name}
                    </h2>

                    <h4 className="text-xl font-semibold text-[#334155] mb-8">
                      {member.role}
                    </h4>


                    <div className="w-24 h-1 bg-[#1E3A8A] rounded-full mb-8"></div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                      {member.description}
                    </p>



                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MyTeam;