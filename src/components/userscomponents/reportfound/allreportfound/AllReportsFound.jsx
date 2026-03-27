import React, { useState } from "react";

function AllReportsFound() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  const reports = [
    {
      id: 1,
      name: "Silver Wrist Watch",
      category: "Accessories",
      location: "City Mall",
      description:
        "Found near the main entrance of City Mall. Appears to be in good condition.",
      image:
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    },
    {
      id: 2,
      name: "Samsung Galaxy Phone",
      category: "Electronics",
      location: "Central Park",
      description:
        "Black Samsung phone found near jogging track bench area.",
      image:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg",
    },
    {
      id: 3,
      name: "Vehicle Registration File",
      category: "Documents",
      location: "University Gate",
      description:
        "Important vehicle documents found near university main gate.",
      image:
        "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    },
  ];

  const filteredReports = reports.filter((report) => {
    return (
      (category === "All" || report.category === category) &&
      (location === "All" || report.location === location) &&
      report.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>
            <h2 className="text-4xl font-bold text-[#0B1C3D] mb-3">
              All Found Reports
            </h2>
            <p className="text-gray-600 max-w-lg">
              Explore all recently found items reported by our community.
              Use advanced filters to quickly locate items that may belong to you.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

            <input
              type="text"
              placeholder="Search found items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D] w-full sm:w-[250px]"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Documents">Documents</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
            >
              <option value="All">All Locations</option>
              <option value="City Mall">City Mall</option>
              <option value="Central Park">Central Park</option>
              <option value="University Gate">University Gate</option>
            </select>

          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                <div className="overflow-hidden">
                  <img
                    src={report.image}
                    alt={report.name}
                    className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-[#0B1C3D]">
                      {report.name}
                    </h3>
                    <span className="text-xs bg-[#0B1C3D]/10 text-[#0B1C3D] px-3 py-1 rounded-full">
                      {report.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {report.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      📍 {report.location}
                    </span>

                    <button className="bg-[#0B1C3D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#132a5c] transition duration-300">
                      Claim Item
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No items found matching your criteria.
            </p>
          )}

        </div>

      </div>

    </section>
  );
}

export default AllReportsFound;