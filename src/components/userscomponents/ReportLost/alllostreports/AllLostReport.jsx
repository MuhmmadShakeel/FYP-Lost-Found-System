import React, { useState } from "react";

function AllLostReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const reports = [
    {
      id: 1,
      name: "Black Leather Wallet",
      description:
        "Lost near City Mall parking area. Contains important ID cards and bank cards. Please contact if found.",
      image:
        "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg",
    },
    {
      id: 2,
      name: "iPhone 13 Pro",
      description:
        "Lost at Central Park jogging track. Blue color with transparent case. Reward will be offered.",
      image:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
    },
    {
      id: 3,
      name: "Car Keys",
      description:
        "Toyota car keys lost near university campus main gate. Attached with small red keychain.",
      image:
        "https://images.pexels.com/photos/3651812/pexels-photo-3651812.jpeg",
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50 relative">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 max-w-6xl mx-auto mb-12">

        <div>
          <h2 className="text-4xl font-bold text-[#0B1C3D] mb-3">
            All Lost Reports
          </h2>
          <p className="text-gray-600 max-w-md mb-6">
            Browse all recently reported lost items. You can update, delete,
            or add additional details anytime to improve recovery visibility.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#0B1C3D] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#132a5c] transition-all duration-300"
          >
            + Report Lost Item
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search lost items..."
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D] w-full sm:w-[250px]"
          />

          <select className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Documents</option>
            <option>Accessories</option>
            <option>Vehicles</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={report.image}
                alt={report.name}
                className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#0B1C3D] mb-3">
                {report.name}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {report.description}
              </p>

              <div className="flex justify-between items-center">
                <button className="bg-[#0B1C3D] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#132a5c] transition duration-300">
                  View Location
                </button>

                <div className="flex gap-3 text-sm">
                  <button className="text-green-600 hover:underline">
                    Update
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-white w-[95%] max-w-xl rounded-2xl shadow-2xl p-8 relative animate-fadeIn">

            {/* Close */}
            <button
              onClick={() => {
                setIsOpen(false);
                setPreviewImage(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-[#0B1C3D] mb-6 text-center">
              Report Lost Item
            </h3>

            <form className="space-y-5">

              {/* Item Name */}
              <input
                type="text"
                placeholder="Item Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0B1C3D] outline-none"
              />

              {/* Description */}
              <textarea
                placeholder="Item Description"
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0B1C3D] outline-none"
              ></textarea>

              {/* Location */}
              <input
                type="text"
                placeholder="Last Known Location"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0B1C3D] outline-none"
              />

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#0B1C3D]">
                  Upload Item Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl cursor-pointer focus:ring-2 focus:ring-[#0B1C3D]"
                />

                {previewImage && (
                  <div className="mt-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-[180px] object-cover rounded-xl shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#0B1C3D] text-white py-3 rounded-xl font-semibold hover:bg-[#132a5c] transition duration-300 shadow-lg"
              >
                Submit Report
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

    </section>
  );
}

export default AllLostReport;