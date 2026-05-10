import React, { useState } from "react";
import {
  Search,
  MapPin,
  Tag,
  PackageSearch,
  Plus,
  X,
  Upload,
  Loader2,
} from "lucide-react";

import {
  useCreateFoundPostMutation,
  useGetAllFoundPostsQuery,
} from "../../../../redux/FoundPost";

function AllReportsFound() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contactInfo: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const { data: allFoundPosts, isLoading, refetch } = useGetAllFoundPostsQuery();

  const [createFoundPost, { isLoading: createLoading, isSuccess, isError: createError, error: createApiError }] = useCreateFoundPostMutation();

  const reports = allFoundPosts?.data || [];

  /* ================= FILTERS ================= */

  const filteredReports = reports.filter((report) => {

    const reportName =
      report?.name?.toLowerCase() ||
      report?.title?.toLowerCase() ||
      "";

    return (
      (category === "All" ||
        report?.category === category) &&

      (location === "All" ||
        report?.location === location) &&

      reportName.includes(search.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("🚀 Starting found item creation...");
      console.log("Form data:", formData);

      const submitData = new FormData();

      submitData.append("name", formData.name.trim());
      submitData.append("description", formData.description.trim());
      submitData.append("location", formData.location.trim());
      submitData.append("contactInfo", formData.contactInfo.trim());

      if (formData.image) {
        console.log("📎 Adding image to form data:", formData.image.name);
        submitData.append("foundimage", formData.image);
      } else {
        console.log("⚠️ No image selected");
      }

      // Log FormData contents for debugging
      console.log("📋 FormData contents:");
      for (let [key, value] of submitData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await createFoundPost(submitData).unwrap();

      console.log("✅ Success response:", response);

      alert(response?.message || "Found item created successfully");

      setFormData({
        name: "",
        description: "",
        location: "",
        contactInfo: "",
        image: null,
      });

      setImagePreview(null);
      setOpenModal(false);
      refetch(); // Refetch the list after creation
    } catch (error) {
      console.error("❌ Error creating found item:", error);
      alert(error?.data?.message || "Something went wrong while creating item");
    }
  };

  /* ================= UNIQUE FILTER VALUES ================= */

  const uniqueCategories = [
    "All",
    ...new Set(
      reports
        ?.map((item) => item?.category)
        .filter(Boolean)
    ),
  ];

  const uniqueLocations = [
    "All",
    ...new Set(
      reports
        ?.map((item) => item?.location)
        .filter(Boolean)
    ),
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white min-h-screen">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-[#0B1C3D]/5 px-4 py-2 rounded-full mb-4">
              <PackageSearch size={16} className="text-[#0B1C3D]" />
              <span className="text-sm font-medium text-[#0B1C3D]">
                Community Found Reports
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1C3D] mb-4 leading-tight">
              All Found Reports
            </h2>

            <p className="text-gray-600 max-w-2xl leading-relaxed text-sm sm:text-base">
              Explore all recently found items reported by the community.
              Use search and filters to quickly locate items that may belong to you.
            </p>

          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#0B1C3D] text-white rounded-2xl px-6 py-5 shadow-lg min-w-55 flex items-center justify-between">

            <div>
              <p className="text-sm text-white/70 mb-2">
                Total Found Items
              </p>

              <h3 className="text-4xl font-bold">
                {filteredReports.length}
              </h3>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-white text-[#0B1C3D] p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Plus size={20} />
            </button>

          </div>

        </div>

        {/* ================= FILTER SECTION ================= */}

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 sm:p-6 mb-12">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {/* SEARCH */}
            <div className="relative xl:col-span-2">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search found items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
              />

            </div>

            {/* CATEGORY */}
            <div className="relative">

              <Tag
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none pl-11 pr-4 py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
              >

                {uniqueCategories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}

              </select>

            </div>

            {/* LOCATION */}
            <div className="relative">

              <MapPin
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none pl-11 pr-4 py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
              >

                {uniqueLocations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}

              </select>

            </div>

          </div>

        </div>

        {/* ================= LOADING ================= */}

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-4 border-[#0B1C3D]/20 border-t-[#0B1C3D] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>

            {/* ================= CARDS ================= */}

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">

              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (

                  <div
                    key={report._id || report.id}
                    className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                  >

                    {/* IMAGE */}
                    <div className="relative overflow-hidden">

                      <img
                        src={
                          report?.image?.url ||
                          report?.image ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt={report?.name || report?.title}
                        className="w-full h-60 object-cover group-hover:scale-105 transition duration-700"
                      />

                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-[#0B1C3D] text-xs font-semibold px-3 py-1 rounded-full shadow">
                          {report?.category || "General"}
                        </span>
                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <div className="mb-4">

                        <h3 className="text-xl font-bold text-[#0B1C3D] mb-2 line-clamp-1">
                          {report?.name || report?.title}
                        </h3>

                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {report?.description ||
                            "No description available."}
                        </p>

                      </div>

                      {/* FOOTER */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-2 text-gray-500 text-sm">

                          <MapPin size={15} />

                          <span className="line-clamp-1">
                            {report?.location || "Unknown Location"}
                          </span>

                        </div>

                        <button className="bg-[#0B1C3D] hover:bg-[#132a5c] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition duration-300">
                          Claim Item
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              ) : (

                <div className="col-span-full text-center py-24">

                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <PackageSearch
                      size={40}
                      className="text-gray-400"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Found Items
                  </h3>

                  <p className="text-gray-500 text-sm">
                    No items matched your search or filter criteria.
                  </p>

                </div>
              )}

            </div>

          </>
        )}

        {/* ================= MODAL ================= */}
        {openModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">

              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-[#0B1C3D] mb-2">
                Report Found Item
              </h2>

              <p className="text-gray-600 mb-6">
                Help reunite lost belongings with their owners.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    placeholder="e.g., Black Wallet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    placeholder="Describe the item in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location Found *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    placeholder="e.g., Central Park, New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Info *
                  </label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    placeholder="Your phone or email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Image <span className="text-red-500">*</span>
                  </label>
                  {imagePreview ? (
                    <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-lg"
                      >
                        <X size={16} />
                      </button>
                      <label className="absolute inset-0 bg-black/0 hover:bg-black/10 flex items-center justify-center cursor-pointer transition-colors">
                        <div className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                          Change Image
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#0B1C3D] hover:bg-blue-50 transition-all duration-300 group">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="text-gray-400 group-hover:text-[#0B1C3D] transition-colors" size={28} />
                        <p className="text-gray-600 text-sm font-medium group-hover:text-[#0B1C3D] transition-colors">
                          Click to upload image
                        </p>
                        <p className="text-gray-500 text-xs">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                  )}
                </div>

                {isSuccess && (
                  <p className="text-green-600 text-sm">
                    Found item reported successfully!
                  </p>
                )}

                {createError && (
                  <p className="text-red-600 text-sm">
                    {createApiError?.data?.message || "Failed to report item"}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={createLoading}
                  className="w-full bg-[#0B1C3D] text-white py-3 rounded-2xl font-semibold hover:bg-[#0B1C3D]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Reporting...
                    </>
                  ) : (
                    "Report Found Item"
                  )}
                </button>

              </form>

            </div>
          </div>
        )}

      </div>

    </section>
  );
}

export default AllReportsFound;