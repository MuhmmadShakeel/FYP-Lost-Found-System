import React, { useState, useEffect, useRef } from "react";
import { FaTasks, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

function OurProgress() {
  // Ref for detecting if section is in viewport
  const sectionRef = useRef(null);

  // State for counting numbers
  const [totalCases, setTotalCases] = useState(0);
  const [coveredCases, setCoveredCases] = useState(0);
  const [pendingCases, setPendingCases] = useState(0);
  const [startCount, setStartCount] = useState(false);

  // Target numbers
  const totalTarget = 1200;
  const coveredTarget = 850;
  const pendingTarget = 350;

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!startCount) return;

    const duration = 2000; // 2 seconds
    const steps = 50; // number of increments
    const totalStep = Math.ceil(totalTarget / steps);
    const coveredStep = Math.ceil(coveredTarget / steps);
    const pendingStep = Math.ceil(pendingTarget / steps);

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setTotalCases((prev) => Math.min(prev + totalStep, totalTarget));
      setCoveredCases((prev) => Math.min(prev + coveredStep, coveredTarget));
      setPendingCases((prev) => Math.min(prev + pendingStep, pendingTarget));

      if (currentStep >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [startCount]);

  const stats = [
    { label: "Total Cases", value: totalCases, icon: <FaTasks size={28} />, color: "#1E3A8A" },
    { label: "Covered Cases", value: coveredCases, icon: <FaCheckCircle size={28} />, color: "#1E3A8A" },
    { label: "Pending Cases", value: pendingCases, icon: <FaHourglassHalf size={28} />, color: "#1E3A8A" },
  ];

  return (
    <section ref={sectionRef} className="py-2 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">

        {/* Heading */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-[#1E3A8A] leading-tight"
            data-aos="fade-down"
          >
            Our Progress
          </h2>
          <p
            className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Track the impact and achievements of our platform in real-time. See how we are
            delivering results and improving outcomes every day.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center justify-between transition-transform transform hover:shadow-[0_20px_50px_rgba(30,58,138,0.35)] relative group"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              {/* Icon on top-right hover */}
              <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all text-[#1E3A8A]">
                {stat.icon}
              </div>

              {/* Rounded Number Circle */}
              <div
                className="w-28 h-28 flex items-center justify-center rounded-full text-white text-3xl font-bold mb-8 shadow-lg"
                style={{ backgroundColor: stat.color }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {stat.label}
              </h3>

              {/* Button */}
              <button
                className="w-full py-3 rounded-lg text-white font-medium text-lg transition-all hover:opacity-90"
                style={{ backgroundColor: stat.color }}
              >
                {stat.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default OurProgress;
