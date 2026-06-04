import React, { useEffect, useState } from "react";
import { FaUserCircle, FaShieldAlt, FaCheckCircle, FaCamera, FaTimes, FaImage, FaTimesCircle, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useCreateProfileMutation,
  useGetProfilebyIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} from "../../../redux/Profile";

function AdminProfilePanel({ open, setOpen }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    profilePicture: null,
    preview: "",
  });

  const { data: profileResponse, error, isLoading, refetch } =
    useGetProfilebyIdQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [createProfile, { isLoading: isCreating }] =
    useCreateProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();
  const [deleteProfile, { isLoading: isDeleting }] =
    useDeleteProfileMutation();

  const profile = profileResponse?.data;
  const hasProfile = !!profile;

  useEffect(() => {
    if (profile) {
      setForm({
        bio: profile.bio || "",
        profilePicture: null,
        preview: profile.profilePicture?.url || "",
      });
      setEditing(false);
    }
  }, [profile]);

  useEffect(() => {
    if (!error) return;

    if (error?.status === 404) {
      setEditing(true);
      return;
    }

    toast.error(
      error?.data?.message || error?.error || "Unable to load profile."
    );
  }, [error]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, bio: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setForm((prev) => ({
      ...prev,
      profilePicture: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSave = async () => {
    if (!form.bio.trim()) return toast.error("Bio is required");

    const payload = new FormData();
    payload.append("bio", form.bio);
    if (form.profilePicture) {
      payload.append("profilePicture", form.profilePicture);
    }

    try {
      const result = hasProfile
        ? await updateProfile(payload).unwrap()
        : await createProfile(payload).unwrap();

      toast.success(result?.message || "Profile saved successfully");
      setEditing(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save profile");
    }
  };

  const handleDelete = async () => {
    if (!hasProfile) return;

    const ok = window.confirm("Delete profile permanently?");
    if (!ok) return;

    try {
      await deleteProfile().unwrap();
      toast.success("Profile deleted");
      setForm({ bio: "", profilePicture: null, preview: "" });
      setEditing(true);
      refetch();
    } catch (err) {
      toast.error("Failed to delete profile");
    }
  };

  const removePicture = () => {
    setForm((prev) => ({
      ...prev,
      profilePicture: null,
      preview: profile?.profilePicture?.url || "",
    }));
  };

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SLIDE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-br from-gray-50 to-white shadow-2xl transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 bg-[#203C8B] text-white">
          <div className="flex items-center gap-3">
            <FaUserShield className="text-2xl" />
            <h2 className="text-xl font-bold">Admin Profile</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <FaTimesCircle className="text-xl" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
          {isLoading && !profile ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#203C8B] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#203C8B] font-medium">Loading profile...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* PROFILE HEADER CARD - Enhanced Design */}
              <div className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">

                <div className="flex items-center gap-6">

                  {/* PROFILE PICTURE SECTION */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#203C8B] to-[#1e3a8a] p-1 shadow-lg">
                      {form.preview ? (
                        <img
                          src={form.preview}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <FaUserCircle className="text-5xl text-[#203C8B]" />
                        </div>
                      )}
                    </div>
                    {editing && (
                      <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#203C8B] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#162a66] transition">
                        <FaCamera className="text-white text-sm" />
                        <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                      </label>
                    )}
                  </div>

                  {/* INFO SECTION */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#203C8B] mb-1">
                      {profile?.user?.name || "Admin User"}
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {profile?.user?.email || "admin@example.com"}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-[#203C8B] text-xs font-semibold">
                        👑 Administrator
                      </span>
                      <span className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                        <FaCheckCircle className="text-lg" />
                        {hasProfile ? "Profile Active" : "Profile Incomplete"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SETTINGS CARD - Enhanced Design */}
              <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">

                {/* HEADER */}
                <div className="flex justify-between items-start md:items-center mb-8 gap-4 flex-col md:flex-row">

                  <div>
                    <h3 className="font-bold text-2xl text-gray-800 mb-2">
                      📝 Profile Settings
                    </h3>
                    <p className="text-sm text-gray-500">
                      Manage your personal information and profile picture
                    </p>
                  </div>

                  <div className="flex gap-3 flex-wrap">

                    {hasProfile && (
                      <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        {isDeleting ? "Deleting..." : "🗑️ Delete"}
                      </button>
                    )}

                    <button
                      onClick={() => setEditing(!editing)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#203C8B] to-[#1e3a8a] hover:from-[#162a66] hover:to-[#0f1e4d] text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      {editing
                        ? "✕ Cancel"
                        : hasProfile
                        ? "✏️ Edit"
                        : "➕ Create Profile"}
                    </button>

                  </div>
                </div>

                {/* EDIT FORM */}
                {editing ? (
                  <div className="space-y-6">

                    {/* BIO TEXTAREA */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Bio
                      </label>
                      <textarea
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself... (max 500 characters)"
                        maxLength={500}
                        className="w-full border-2 border-gray-300 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#203C8B] focus:border-transparent outline-none transition resize-none"
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {form.bio.length}/500 characters
                      </p>
                    </div>

                    {/* IMAGE UPLOAD SECTION */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Profile Picture
                      </label>

                      {/* IMAGE PREVIEW */}
                      {form.preview && (
                        <div className="mb-4 relative inline-block">
                          <img
                            src={form.preview}
                            alt="Preview"
                            className="h-32 w-32 rounded-2xl object-cover border-4 border-[#203C8B] shadow-lg"
                          />
                          <button
                            onClick={removePicture}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition"
                          >
                            <FaTimes className="text-sm" />
                          </button>
                        </div>
                      )}

                      {/* FILE INPUT */}
                      <label className="flex items-center justify-center w-full px-6 py-8 border-3 border-dashed border-[#203C8B] rounded-2xl bg-gradient-to-b from-blue-50 to-white cursor-pointer hover:bg-blue-50 transition group">
                        <div className="text-center">
                          <FaImage className="text-4xl text-[#203C8B] mx-auto mb-3 group-hover:scale-110 transition" />
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>

                    {/* SAVE BUTTON */}
                    <button
                      onClick={handleSave}
                      disabled={isCreating || isUpdating || !form.bio.trim()}
                      className="w-full bg-gradient-to-r from-[#203C8B] to-[#1e3a8a] hover:from-[#162a66] hover:to-[#0f1e4d] text-white py-3 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreating || isUpdating ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </span>
                      ) : (
                        "💾 Save Profile"
                      )}
                    </button>

                  </div>
                ) : (
                  <>
                    {/* DISPLAY MODE */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bio</p>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {profile?.bio || "No bio added yet. Click Edit to add one!"}
                        </p>
                      </div>

                      {form.preview && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Profile Picture</p>
                          <img
                            src={form.preview}
                            alt="Profile"
                            className="h-40 w-40 rounded-2xl object-cover border-4 border-[#203C8B] shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* SECURITY INFO */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 p-5 rounded-2xl border-2 border-green-200">
                <FaShieldAlt className="text-xl flex-shrink-0" />
                <p className="text-sm font-medium">
                  ✓ Your account is protected with secure authentication and encrypted data storage
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminProfilePanel;