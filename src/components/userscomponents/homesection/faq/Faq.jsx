import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Faq() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const faqs = [
    {
      question: "How do I report a lost item?",
      answer:
        "You can report a lost item by clicking on the 'Lost Item Reporting' section and filling out the form with the details and location of the item.",
    },
    {
      question: "How do I submit a found item?",
      answer:
        "Go to the 'Found Item Submission' section, provide an image and details of the item, and our system will help match it with the rightful owner.",
    },
    {
      question: "How does the Smart Matching System work?",
      answer:
        "Our AI-powered Smart Matching System automatically connects lost and found reports using location, description, and time of report to maximize recovery chances.",
    },
    {
      question: "Will I get alerts for lost items in my area?",
      answer:
        "Yes! Our Citywide Alerts & Notifications system sends you real-time updates for lost and found items nearby so you never miss an important alert.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFaq = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          <div
            data-aos="fade-right"
            className="bg-white/70 backdrop-blur-xl rounded-3xl  p-10 flex flex-col justify-center"
          >
            <h2 className="text-4xl font-extrabold text-[#1e3a8a] mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Find answers to the most common questions about our City Wide Lost & Found platform.
            </p>

            <div className="space-y-5">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden  hover:shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="text-lg font-semibold text-[#1e3a8a]">
                      {item.question}
                    </span>

                    <span
                      className={`text-2xl font-bold transition-transform duration-300 ${
                        activeIndex === index ? "rotate-45 text-[#1e3a8a]" : "text-gray-400"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`px-5 transition-all duration-500 ease-in-out ${
                      activeIndex === index
                        ? "max-h-40 opacity-100 pb-5"
                        : "max-h-0 opacity-0"
                    } overflow-hidden text-gray-600`}
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="relative rounded-3xl overflow-hidden"
          >
            <img
              src="https://www.erpexams.com/faqbig.jpg"
              alt="Lost & Found"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;