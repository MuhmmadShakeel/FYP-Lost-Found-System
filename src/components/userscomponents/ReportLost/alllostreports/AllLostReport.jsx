import React, { useState } from "react";

import {
  useCreateLostPostMutation,
  useGetAllLostPostsQuery,
} from "../../../../redux/LostPost";

import ReturnBackForm from "../../common/ReturnBackForm";

import {
  MapPin,
  Plus,
  X,
  Upload,
  Loader2,
  PackageSearch,
  ShieldCheck,
  Search,
} from "lucide-react";

function LostPost() {
  const [isOpen, setIsOpen] = useState(false);

  // ================= RETURN MODAL =================
  const [openReturnModal, setOpenReturnModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: null,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } =
    useGetAllLostPostsQuery();

  const [createLostPost, { isLoading: isCreating }] =
    useCreateLostPostMutation();

  const reports = data?.data || [];

  const filteredReports = reports.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreviewImage(URL.createObjectURL(file));

      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  // ================= OPEN RETURN MODAL =================
  const handleOpenReturn = (item) => {
    setSelectedItem(item);
    setOpenReturnModal(true);
  };

  // ================= SUBMIT LOST ITEM =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();

    sendData.append("name", formData.name);
    sendData.append("description", formData.description);
    sendData.append("location", formData.location);
    sendData.append("lostimage", formData.image);

    try {
      await createLostPost(sendData).unwrap();

      setFormData({
        name: "",
        description: "",
        location: "",
        image: null,
      });

      setPreviewImage(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8faff] via-white to-[#eef3ff] py-14 px-4 sm:px-6 overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-14">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-[#0B1C3D]/5 border border-[#0B1C3D]/10 px-4 py-2 rounded-full mb-5">

              <PackageSearch
                size={16}
                className="text-[#0B1C3D]"
              />

              <span className="text-sm font-semibold text-[#0B1C3D]">
                Community Lost Reports
              </span>

            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#0B1C3D] leading-tight">
              Lost Items
            </h1>

<p className="text-gray-600 mt-4 max-w-2xl leading-relaxed text-sm sm:text-base">
              Browse reported lost belongings and help return
              valuable items back to their rightful owners safely
              and professionally.
            </p>

            <div className="mt-6 relative max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1C3D]"
              />
              <input
                type="text"
                placeholder="Search lost items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
              />
            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#0B1C3D] text-white rounded-[30px] p-6 shadow-[0_20px_60px_rgba(11,28,61,0.25)] min-w-[290px] relative overflow-hidden">

            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/10 rounded-full"></div>

            <div className="relative z-10">

              <p className="text-sm text-white/70 mb-2">
                Total Lost Reports
              </p>

              <h2 className="text-5xl font-black">
                {reports.length}
              </h2>

              <button
                onClick={() => setIsOpen(true)}
                className="mt-6 bg-white text-[#0B1C3D] hover:bg-gray-100 px-2 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Plus size={18} />
                Report Lost Item
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* ================= STATES ================= */}

      {isLoading && (
        <div className="flex justify-center items-center py-24">

          <div className="w-14 h-14 border-4 border-[#0B1C3D]/20 border-t-[#0B1C3D] rounded-full animate-spin"></div>

        </div>
      )}

      {isError && (
        <div className="text-center py-20">

          <div className="bg-red-50 border border-red-100 text-red-500 inline-block px-6 py-4 rounded-2xl font-medium">
            Failed to load lost items
          </div>

        </div>
      )}


      {!isLoading && !isError && filteredReports.length > 0 && (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredReports.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[32px] overflow-hidden border border-gray-200 hover:border-[#0B1C3D]/20 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(11,28,61,0.12)] transition-all duration-500 hover:-translate-y-2"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={
                    item?.lostimage?.url ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={item.name}
                  className="h-64 w-full object-cover group-hover:scale-105 transition-all duration-700"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
                  }}
                />

                {/* STATUS */}
                <div className="absolute top-4 right-4">

                  <span className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-full font-semibold shadow-lg">
                    Lost
                  </span>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <div className="mb-5">

                  <h2 className="text-2xl font-bold text-[#0B1C3D] mb-3 line-clamp-1">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-gray-100">

                  <div className="flex items-center gap-2 text-gray-500 text-sm min-w-0">

                    <MapPin
                      size={16}
                      className="text-[#0B1C3D] flex-shrink-0"
                    />

                    <span className="truncate">
                      {item.location}
                    </span>

                  </div>

                  <button
                    onClick={() => handleOpenReturn(item)}
                    className="bg-[#0B1C3D] hover:bg-[#132a5c] text-white text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl whitespace-nowrap"
                  >
                    Return Back
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EMPTY ================= */}

      {!isLoading && !isError && reports.length > 0 && filteredReports.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-24">

          <div className="w-28 h-28 rounded-full bg-[#0B1C3D]/5 flex items-center justify-center mx-auto mb-6">

            <PackageSearch
              size={42}
              className="text-[#0B1C3D]"
            />

          </div>

          <h3 className="text-2xl font-bold text-[#0B1C3D] mb-3">
            No Lost Items Found
          </h3>

          <p className="text-gray-500">
            No lost reports match your search.
          </p>

        </div>
      )}

      {!isLoading && reports.length === 0 && (
        <div className="max-w-7xl mx-auto text-center py-24">

          <div className="w-28 h-28 rounded-full bg-[#0B1C3D]/5 flex items-center justify-center mx-auto mb-6">

            <PackageSearch
              size={42}
              className="text-[#0B1C3D]"
            />

          </div>

          <h3 className="text-2xl font-bold text-[#0B1C3D] mb-3">
            No Lost Items Found
          </h3>

          <p className="text-gray-500">
            No lost reports are available right now.
          </p>

        </div>
      )}

   {openReturnModal && (
  <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">

    <div className="relative w-full max-w-2xl animate-in zoom-in-95 duration-300">

      {/* CLOSE */}
      <button
        onClick={() => setOpenReturnModal(false)}
        className="absolute -top-4 -right-4 z-50 bg-white text-[#0B1C3D] w-11 h-11 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <X size={20} />
      </button>

      <div className="bg-white rounded-[35px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.25)] max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="bg-[#0B1C3D] px-8 py-7 text-white">

          <h2 className="text-3xl font-black mb-2">
            Return This Item
          </h2>

          <p className="text-white/80 text-sm leading-relaxed">
            Fill out the return verification form carefully.
            Your request will be sent to the owner of this
            lost item.
          </p>

        </div>

        {/* ITEM INFO */}
        <div className="px-8 pt-6">

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4">

            <img
              src={
                selectedItem?.lostimage?.url ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              }
              alt={selectedItem?.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />

            <div>
              <h3 className="font-bold text-[#0B1C3D] text-lg">
                {selectedItem?.name}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {selectedItem?.description}
              </p>
            </div>

          </div>

        </div>

        {/* FORM */}
        <div className="p-8">

          <ReturnBackForm
            selectedLostItem={selectedItem}
            onClose={() => setOpenReturnModal(false)}
          />

        </div>

      </div>

    </div>

  </div>
)}

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-[32px] w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto shadow-[0_20px_80px_rgba(0,0,0,0.25)]">

            {/* CLOSE */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>

            {/* HEADER */}
            <div className="mb-7">

              <h2 className="text-3xl font-bold text-[#0B1C3D]">
                Report Lost Item
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                Share details about your lost belonging.
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="block text-sm font-semibold text-[#0B1C3D] mb-2">
                  Item Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Black Wallet"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="block text-sm font-semibold text-[#0B1C3D] mb-2">
                  Description
                </label>

                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe item but hide one distinct feature..."
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                />

              </div>

              {/* LOCATION */}
              <div>

                <label className="block text-sm font-semibold text-[#0B1C3D] mb-2">
                  Lost Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter location"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                />

              </div>

              {/* IMAGE */}
              <div>

                <label className="block text-sm font-semibold text-[#0B1C3D] mb-3">
                  Upload Image
                </label>

                {previewImage ? (
                  <div className="relative rounded-3xl overflow-hidden border border-gray-200">

                    <img
                      src={previewImage}
                      alt="preview"
                      className="w-full h-44 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);

                        setFormData({
                          ...formData,
                          image: null,
                        });
                      }}
                      className="absolute top-3 right-3 bg-white text-red-500 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                    >
                      <X size={16} />
                    </button>

                  </div>
                ) : (
                  <label className="w-full border-2 border-dashed border-gray-300 rounded-3xl py-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#0B1C3D] hover:bg-blue-50/40 transition-all duration-300 group">

                    <div className="w-14 h-14 rounded-2xl bg-[#0B1C3D]/10 flex items-center justify-center mb-4">

                      <Upload
                        size={24}
                        className="text-[#0B1C3D]"
                      />

                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      Upload Lost Item Image
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or JPEG
                    </p>

                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />

                  </label>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isCreating}
                className="w-full bg-[#0B1C3D] hover:bg-[#132a5c] text-white py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCreating ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Reporting...
                  </>
                ) : (
                  "Submit Lost Report"
                )}
              </button>

            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default LostPost;