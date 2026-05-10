import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  useGetFoundpoatsbyidQuery,
  useDeleteFoundPostMutation,
  useUpdatefoundpostMutation,
} from "../../../../redux/FoundPost";

function FoundPostsPanel() {

  /* ================= API ================= */

  const {
    data,
    isLoading,
    refetch,
  } = useGetFoundpoatsbyidQuery();

  const [deleteFoundPost] = useDeleteFoundPostMutation();

  const [updatefoundpost, { isLoading: updating }] =
    useUpdatefoundpostMutation();

  /* ================= STATES ================= */

  const [foundPosts, setFoundPosts] = useState([]);

  const [editingItem, setEditingItem] = useState(null);

  const [draftTitle, setDraftTitle] = useState("");

  const [draftDetails, setDraftDetails] = useState("");

  const [draftLocation, setDraftLocation] = useState("");

  const [draftImage, setDraftImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [currentItemImage, setCurrentItemImage] = useState(null);

  /* ================= SET DATA ================= */

  useEffect(() => {

    if (data?.data) {

      const posts = Array.isArray(data.data)
        ? data.data
        : [data.data];

      setFoundPosts(posts);

    }

  }, [data]);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this found item?"
    );

    if (!confirmDelete) return;

    try {

      const res = await deleteFoundPost(id).unwrap();

      toast.success(
        res?.message || "Found item deleted successfully"
      );

      setFoundPosts((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (error) {

      toast.error(
        error?.data?.message || "Delete failed"
      );

    }

  };

  /* ================= START EDIT ================= */

  const handleStartEdit = (item) => {

    setEditingItem(item._id);

    setDraftTitle(item.name || "");

    setDraftDetails(item.description || "");

    setDraftLocation(item.location || "");

    setDraftImage(null);

    setImagePreview(null);

    setCurrentItemImage(item.foundimage?.url || null);

  };

  /* ================= IMAGE HANDLERS ================= */

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDraftImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveNewImage = () => {
    setDraftImage(null);
    setImagePreview(null);
  };

  const handleRemoveCurrentImage = () => {
    setCurrentItemImage(null);
  };

  /* ================= SAVE EDIT ================= */

  const handleSaveEdit = async () => {

    try {
      console.log("🔄 Starting found item update...");
      console.log("Item ID:", editingItem);
      console.log("Draft data:", { draftTitle, draftDetails, draftLocation });

      const updateData = new FormData();

      updateData.append("name", draftTitle.trim());
      updateData.append("description", draftDetails.trim());
      updateData.append("location", draftLocation.trim());

      if (draftImage) {
        console.log("📎 Adding new image:", draftImage.name);
        updateData.append("foundimage", draftImage);
      } else {
        console.log("📷 No new image selected");
      }

      // Log FormData contents for debugging
      console.log("📋 Update FormData contents:");
      for (let [key, value] of updateData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const res = await updatefoundpost({
        id: editingItem,
        data: updateData,
      }).unwrap();

      console.log("✅ Update success response:", res);

      toast.success(
        res?.message || "Found item updated successfully"
      );

      setFoundPosts((prev) =>
        prev.map((item) =>
          item._id === editingItem
            ? {
                ...item,
                name: draftTitle,
                description: draftDetails,
                location: draftLocation,
              }
            : item
        )
      );

      setEditingItem(null);
      setDraftTitle("");
      setDraftDetails("");
      setDraftLocation("");
      setDraftImage(null);
      setImagePreview(null);
      setCurrentItemImage(null);

      refetch();

    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error(
        error?.data?.message || "Update failed"
      );
    }

  };

  /* ================= CANCEL EDIT ================= */

  const handleCancelEdit = () => {
    setEditingItem(null);
    setDraftImage(null);
    setImagePreview(null);
    setCurrentItemImage(null);
  };

  /* ================= ADD NEW ================= */

  const handleAddNew = () => {

    toast(
      "Create functionality can be connected here",
      {
        icon: "ℹ️",
      }
    );

  };

  /* ================= LOADING ================= */

  if (isLoading) {

    return (

      <div className="flex justify-center items-center py-20">

        <div className="w-12 h-12 border-4 border-[#203C8B]/20 border-t-[#203C8B] rounded-full animate-spin"></div>

      </div>

    );

  }

  return (

    <div className="space-y-6">

      {/* ================= TOP BAR ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h3 className="text-2xl font-bold text-slate-900">
            Found Items
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Manage your reported found items
          </p>

        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#203C8B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1a336e] transition shadow-md"
        >
          <FaPlus />
          Add New
        </button>

      </div>

      {/* ================= TOTAL CARD ================= */}

      <div className="bg-gradient-to-r from-[#203C8B] to-[#3558c8] rounded-3xl p-6 text-white shadow-lg">

        <p className="text-sm text-white/80 mb-2">
          Total Found Reports
        </p>

        <h2 className="text-4xl font-bold">
          {foundPosts.length}
        </h2>

      </div>

      {/* ================= POSTS ================= */}

      <div className="space-y-5">

        {foundPosts.length > 0 ? (

          foundPosts.map((item) => (

            <div
              key={item._id}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
            >

              {editingItem === item._id ? (

                // EDIT MODE
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 space-y-5">

                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FaEdit className="text-[#203C8B]" />
                    Edit Found Item
                  </h3>

                  <div className="space-y-4 bg-white rounded-2xl p-5 border border-slate-200">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Item Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#203C8B] focus:border-transparent bg-white transition-all"
                        placeholder="e.g., Black Wallet"
                        required
                      />
                    </div>

                    {/* Description Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={draftDetails}
                        onChange={(e) => setDraftDetails(e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#203C8B] focus:border-transparent bg-white transition-all resize-none"
                        placeholder="Describe the item in detail..."
                        required
                      />
                    </div>

                    {/* Location Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Location Found <span className="text-red-500">*</span>
                      </label>
                      <input
                        value={draftLocation}
                        onChange={(e) => setDraftLocation(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#203C8B] focus:border-transparent bg-white transition-all"
                        placeholder="e.g., Central Park"
                        required
                      />
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Item Image
                    </label>

                    {imagePreview ? (
                      // New Image Preview
                      <div className="relative w-full rounded-xl overflow-hidden bg-slate-200">
                        <img
                          src={imagePreview}
                          alt="New preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group cursor-pointer">
                          <button
                            type="button"
                            onClick={handleRemoveNewImage}
                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2.5 transition-colors shadow-lg"
                          >
                            <FaTimes size={14} />
                          </button>
                          <label className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium text-slate-700 cursor-pointer">
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
                      </div>
                    ) : currentItemImage ? (
                      // Current Image Display
                      <div className="relative w-full rounded-xl overflow-hidden bg-slate-200">
                        <img
                          src={currentItemImage}
                          alt="Current"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group">
                          <button
                            type="button"
                            onClick={handleRemoveCurrentImage}
                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2.5 transition-colors shadow-lg"
                          >
                            <FaTimes size={14} />
                          </button>
                          <label className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-medium text-slate-700 cursor-pointer">
                              Update Image
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      // Upload Placeholder
                      <label className="w-full border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#203C8B] hover:bg-blue-50 transition-all duration-300 py-10 group">
                        <div className="flex flex-col items-center gap-2">
                          <FaImage className="w-8 h-8 text-slate-400 group-hover:text-[#203C8B] transition-colors" />
                          <p className="text-slate-600 text-sm font-medium group-hover:text-[#203C8B] transition-colors">
                            Click to upload image
                          </p>
                          <p className="text-slate-500 text-xs">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={handleSaveEdit}
                      disabled={updating}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#203C8B] to-[#1a336e] px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updating ? "Saving..." : "💾 Save Changes"}
                    </button>

                    <button
                      onClick={handleCancelEdit}
                      className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                  </div>

                </div>

              ) : (

                // VIEW MODE
                <div className="p-6">

                  {/* Image Display */}
                  {item.foundimage?.url && (
                    <div className="mb-5 rounded-2xl overflow-hidden bg-slate-200 h-48 w-full">
                      <img
                        src={item.foundimage.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div>

                    <h4 className="text-xl font-bold text-slate-900">
                      {item.name || "Untitled Item"}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.description ||
                        "No description available"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">

                      <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-700">
                        📍 {item.location || "Unknown"}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-xs font-medium text-green-700">
                        {item.status || "Open"}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-600">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "Recent"}
                      </span>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="mt-6 flex flex-wrap gap-3">

                    <button
                      onClick={() => handleStartEdit(item)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
                    >
                      <FaTrash />
                      Delete
                    </button>

                    <button
                      onClick={() =>
                        toast.success(item.name || "Viewing item")
                      }
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#203C8B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
                    >
                      <FaEye />
                      View Details
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))

        ) : (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-16 text-center">

            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              No Found Posts
            </h3>

            <p className="text-sm text-slate-500">
              You have not reported any found items yet.
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default FoundPostsPanel;
