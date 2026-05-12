import React, { useState } from "react";
import {
  useCreateLostPostMutation,
  useGetAllLostPostsQuery,
} from "../../../../redux/LostPost";

function LostPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: null,
  });

  const { data, isLoading, isError } = useGetAllLostPostsQuery();

  const [createLostPost, { isLoading: isCreating }] =
    useCreateLostPostMutation();

  const reports = data?.data || [];

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Image Change
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

  // Submit
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
    <section className="min-h-screen bg-[#f4f7ff] py-16 px-5">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 mb-12">

        <div>
          <h1 className="text-4xl font-bold text-[#0B1C3D]">
            Lost Items
          </h1>

          <p className="text-gray-500 mt-2">
            Report and manage lost belongings professionally.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0B1C3D] hover:bg-[#132a5c] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300"
        >
          + Report Lost Item
        </button>

      </div>

      {/* STATES */}
      {isLoading && (
        <p className="text-center text-lg font-medium text-gray-600">
          Loading...
        </p>
      )}

      {isError && (
        <p className="text-center text-red-500 font-medium">
          Failed to load data
        </p>
      )}

      {/* CARDS */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {reports.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={
                  item?.lostimage?.url ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                }
                alt={item.name}
                className="h-60 w-full object-cover hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-[#0B1C3D]">
                  {item.name}
                </h2>

                <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-semibold">
                  Lost
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>

              <div className="mt-5 flex items-center justify-between">

                <p className="text-sm text-gray-500">
                  📍 {item.location}
                </p>

                <button className="px-4 py-2 rounded-xl bg-[#0B1C3D]/10 text-[#0B1C3D] text-sm font-medium hover:bg-[#0B1C3D] hover:text-white transition-all duration-300">
                  Details
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-6">

          {/* MODAL BOX */}
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-100 px-6 py-5 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-[#0B1C3D]">
                  Report Lost Item
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Fill the details carefully
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 flex items-center justify-center transition-all duration-300"
              >
                ✕
              </button>

            </div>

            {/* FORM AREA */}
            <div className="max-h-[75vh] overflow-y-auto px-6 py-5">

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter item name"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    required
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe the lost item"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    required
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Where did you lose it?"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B1C3D]"
                    required
                  />
                </div>

                {/* FILE */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Upload Item Image
                  </label>

                  <div className="border-2 border-dashed border-gray-300 rounded-3xl p-5 bg-gray-50">

                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full"
                      required
                    />

                    <p className="text-xs text-gray-400 mt-3 text-center">
                      JPG, PNG or JPEG supported
                    </p>

                  </div>
                </div>

                {/* IMAGE PREVIEW */}
                {previewImage && (
                  <div className="overflow-hidden rounded-3xl border border-gray-200">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-52 object-cover"
                    />
                  </div>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full bg-[#0B1C3D] hover:bg-[#132a5c] text-white py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                >
                  {isCreating ? "Submitting..." : "Submit Report"}
                </button>

              </form>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LostPost;