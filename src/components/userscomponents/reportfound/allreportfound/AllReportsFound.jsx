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

import ClaimForm from "../../common/ClaimForm";

function AllReportsFound() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  // ================= MODALS =================
  const [openModal, setOpenModal] = useState(false);

  // CLAIM MODAL
  const [openClaimModal, setOpenClaimModal] = useState(false);

  // STORE CURRENT ITEM
  const [selectedReport, setSelectedReport] = useState(null);

  // ================= FORM =================
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contactInfo: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // ================= API =================
  const {
    data: allFoundPosts,
    isLoading,
    refetch,
  } = useGetAllFoundPostsQuery();

  const [
    createFoundPost,
    {
      isLoading: createLoading,
      isSuccess,
      isError: createError,
      error: createApiError,
    },
  ] = useCreateFoundPostMutation();

  const reports = allFoundPosts?.data || [];

  // ================= FILTERS =================
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

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file,
      });

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

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      submitData.append("name", formData.name.trim());
      submitData.append(
        "description",
        formData.description.trim()
      );
      submitData.append(
        "location",
        formData.location.trim()
      );
      submitData.append(
        "contactInfo",
        formData.contactInfo.trim()
      );

      if (formData.image) {
        submitData.append(
          "foundimage",
          formData.image
        );
      }

      const response = await createFoundPost(
        submitData
      ).unwrap();

      alert(
        response?.message ||
          "Found item created successfully"
      );

      setFormData({
        name: "",
        description: "",
        location: "",
        contactInfo: "",
        image: null,
      });

      setImagePreview(null);

      setOpenModal(false);

      refetch();
    } catch (error) {
      console.error(error);

      alert(
        error?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= CLAIM MODAL =================
  const handleOpenClaim = (report) => {
    setSelectedReport(report);
    setOpenClaimModal(true);
  };

  const handleCloseClaim = () => {
    setOpenClaimModal(false);
    setSelectedReport(null);
  };

  // ================= UNIQUE VALUES =================
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
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-slate-50 to-white min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-[#0B1C3D]/5 px-4 py-2 rounded-full mb-5 border border-[#0B1C3D]/10">
              <PackageSearch
                size={16}
                className="text-[#0B1C3D]"
              />

              <span className="text-sm font-semibold text-[#0B1C3D]">
                Community Found Reports
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1C3D] leading-tight mb-4">
              Found Items
            </h2>

            <p className="text-gray-600 max-w-2xl leading-relaxed text-sm sm:text-base">
              Browse all found items reported by the
              community and claim belongings that belong
              to you securely and professionally.
            </p>

          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#0B1C3D] text-white rounded-[30px] px-7 py-6 shadow-[0_20px_60px_rgba(11,28,61,0.25)] min-w-[280px] flex items-center justify-between">

            <div>
              <p className="text-white/70 text-sm mb-2">
                Total Found Items
              </p>

              <h3 className="text-5xl font-black">
                {filteredReports.length}
              </h3>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-white text-[#0B1C3D] p-4 rounded-2xl hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <Plus size={24} />
            </button>

          </div>

        </div>


        <div className="bg-white border border-gray-200 rounded-[30px] p-5 sm:p-6 mb-14 shadow-lg">

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
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D] text-sm"
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
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full appearance-none pl-11 pr-4 py-3.5 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
              >

                {uniqueCategories.map((cat, index) => (
                  <option
                    key={index}
                    value={cat}
                  >
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
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full appearance-none pl-11 pr-4 py-3.5 rounded-2xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
              >

                {uniqueLocations.map((loc, index) => (
                  <option
                    key={index}
                    value={loc}
                  >
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

            <div className="w-14 h-14 border-4 border-[#0B1C3D]/20 border-t-[#0B1C3D] rounded-full animate-spin"></div>

          </div>
        ) : (
          <>
            {/* ================= CARDS ================= */}

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (

                  <div
                    key={report._id || report.id}
                    className="group bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-md hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500"
                  >

                    {/* IMAGE */}
                    <div className="relative overflow-hidden">

                      <img
                        src={
                          report?.foundimage?.url ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt={
                          report?.name ||
                          report?.title
                        }
                        className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-md text-[#0B1C3D] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                          {report?.category ||
                            "General"}
                        </span>
                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <div className="mb-5">

                        <h3 className="text-2xl font-bold text-[#0B1C3D] mb-3 line-clamp-1">
                          {report?.name ||
                            report?.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                          {report?.description ||
                            "No description available."}
                        </p>

                      </div>

                      {/* FOOTER */}
                      <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-2 text-gray-500 text-sm">

                          <MapPin size={15} />

                          <span className="line-clamp-1">
                            {report?.location ||
                              "Unknown"}
                          </span>

                        </div>

                        <button
                          onClick={() =>
                            handleOpenClaim(report)
                          }
                          className="bg-[#0B1C3D] cursor-pointer hover:bg-[#132a5c] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                        >
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

                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    No Found Items
                  </h3>

                  <p className="text-gray-500">
                    No items matched your search.
                  </p>

                </div>
              )}

            </div>
          </>
        )}

        {/* ================= CLAIM MODAL ================= */}

        {openClaimModal && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">

            <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-300">

              {/* CLOSE */}
              <button
                onClick={handleCloseClaim}
                className="absolute -top-4 -right-4 z-50 bg-white text-[#0B1C3D] w-11 h-11 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* FORM */}
              <div className="bg-white rounded-[35px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-y-auto">

                {/* TOP */}
                <div className="bg-[#0B1C3D] px-8 py-7 text-white">

                  <h2 className="text-3xl font-black mb-2">
                    Claim This Item
                  </h2>

                  <p className="text-white/80 text-sm leading-relaxed">
                    Fill out the ownership verification
                    form carefully. Your request will be
                    sent to the person who posted this
                    item.
                  </p>

                </div>

                {/* ITEM INFO */}
                <div className="px-8 pt-6">

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4">

                    <img
                      src={
                        selectedReport?.foundimage
                          ?.url
                      }
                      alt="item"
                      className="w-20 h-20 rounded-2xl object-cover"
                    />

                    <div>
                      <h3 className="font-bold text-[#0B1C3D] text-lg">
                        {selectedReport?.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {selectedReport?.location}
                      </p>
                    </div>

                  </div>

                </div>

                {/* CLAIM FORM */}
                <div className="p-8">
<ClaimForm
  selectedReport={selectedReport}
  onClose={handleCloseClaim}
/>                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default AllReportsFound;