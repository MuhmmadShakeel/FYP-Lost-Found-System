import React from "react";

function ContactHeader() {
  return (
    <section className="relative  py-24 px-6 overflow-hidden">


      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center text-[#1E3A8A]">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide">
          Get in Touch With Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
          We’re here to help! Whether you have questions, suggestions, or need assistance, 
          feel free to reach out. Our team responds quickly and is ready to guide you.
        </p>

        {/* Call to Action Button */}
        <a
          href="#contactForm"
          className="inline-block px-8 py-3 bg-[#1E3A8A] text-white font-semibold rounded-lg shadow-lg  transition-all duration-300"
        >
          Contact Us Now
        </a>
      </div>

    </section>
  );
}

export default ContactHeader;