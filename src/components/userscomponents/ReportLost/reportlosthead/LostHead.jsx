import React from "react";

function LostHead() {
  return (
    <section className="relative bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] text-white py-20 px-6 overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] left-[-100px] w-[300px] h-[300px] bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight fade-in-up">
            Post Your Lost Item Report
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-12 fade-in-up-delay-2">
            Submit a detailed and accurate report to maximize your chances of recovery.
            Our intelligent matching system connects your lost item with potential
            found reports quickly and securely.
          </p>

          {/* Information Cards */}
          <div className="grid md:grid-cols-2 gap-10 text-left">

            {/* How to Post */}
            <div className="bg-white text-[#0B1C3D] rounded-2xl p-8 shadow-2xl hover:scale-105 hover:shadow-2xl transition duration-500 fade-in-up-delay-4">
              <h3 className="text-2xl font-semibold mb-4">
                How to Post
              </h3>

              <ul className="space-y-3 text-sm leading-relaxed">
                <li>• Provide clear item name and category.</li>
                <li>• Mention last known location and time.</li>
                <li>• Add unique identifying features.</li>
                <li>• Upload clear supporting images (if available).</li>
                <li>• Provide accurate contact details for updates.</li>
              </ul>
            </div>

            {/* What to Post */}
            <div className="bg-white text-[#0B1C3D] rounded-2xl p-8 shadow-2xl hover:scale-105 hover:shadow-2xl transition duration-500 fade-in-up-delay-4">
              <h3 className="text-2xl font-semibold mb-4">
                What to Include
              </h3>

              <ul className="space-y-3 text-sm leading-relaxed">
                <li>• Exact item description (color, brand, size).</li>
                <li>• Distinctive marks or damage details.</li>
                <li>• Location specifics (building, area, landmark).</li>
                <li>• Approximate date & time of loss.</li>
                <li>• Any proof of ownership information.</li>
              </ul>
            </div>

          </div>

          <div className="mt-10">
            <button className="bg-white text-[#0B1C3D] px-10 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              Start Posting Now
            </button>
          </div>

        </div>
      </section>
  );
}

export default LostHead;