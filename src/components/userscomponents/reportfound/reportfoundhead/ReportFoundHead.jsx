import React from "react";

function ReportFoundHead() {
  return (
    <section className="relative bg-[#1E3A8A] text-white py-24 px-6 overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">

        <p className="uppercase tracking-widest text-sm text-gray-300 mb-4">
          Lost & Found System
        </p>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Report a Found Item
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-gray-200 text-lg leading-relaxed mb-10">
          Found something that belongs to someone else? Help reunite lost
          items with their rightful owners by submitting a detailed and
          accurate report. Your small action can make a big difference.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-left mb-12">

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h3 className="font-semibold text-lg mb-2">
              What to Include
            </h3>
            <p className="text-sm text-gray-200">
              Provide clear item name, category, distinctive features,
              and where it was found to increase recovery chances.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h3 className="font-semibold text-lg mb-2">
              Add Clear Image
            </h3>
            <p className="text-sm text-gray-200">
              Upload a high-quality photo of the found item to make
              identification easier and faster.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <h3 className="font-semibold text-lg mb-2">
              Accurate Location
            </h3>
            <p className="text-sm text-gray-200">
              Mention the exact location where the item was found to
              help the rightful owner verify ownership.
            </p>
          </div>

        </div>

        {/* CTA Button */}
        <button className="bg-white text-[#0B1C3D] px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:scale-105 hover:bg-gray-100 transition-all duration-300">
          Start Reporting Now
        </button>

      </div>
    </section>
  );
}

export default ReportFoundHead;