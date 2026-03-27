import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import systemwork from '../../../../assets/images/systemwork.png'
function HowsystemWork() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="w-full min-h-screen text-white bg-[#1E3A8A] py-8 px-6  item-center flex flex-col justify-center">

      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight">
          How  System Works
        </h2>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
          A secure, intelligent, and structured workflow designed to reconnect
          people with their belongings efficiently and safely.
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">

        <div className="flex justify-center" data-aos="fade-right">
          <div className="relative group">
            <img
              src={systemwork}
              alt="Lost and Found Workflow Diagram"
              className="relative rounded-3xl  w-full max-w-md object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <div data-aos="fade-left" className="space-y-8">

          <p className="text-white text-lg leading-relaxed">
            Users initiate the process by submitting a detailed report of a
            lost or found item, including images and accurate location data.
          </p>

          <p className="text-white text-lg leading-relaxed">
            The platform’s intelligent matching engine analyzes submissions
            to identify potential item correlations quickly and precisely.
          </p>

          <p className="text-white text-lg leading-relaxed">
            A structured verification process confirms rightful ownership,
            ensuring transparency, trust, and system integrity.
          </p>

          <p className="text-white text-lg leading-relaxed">
            Once validated, the platform facilitates secure communication
            and coordinates a safe and organized item recovery.
          </p>

        </div>

      </div>
    </section>
  );
}

export default HowsystemWork;