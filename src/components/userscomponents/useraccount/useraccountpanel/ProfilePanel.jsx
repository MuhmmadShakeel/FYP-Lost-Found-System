import React, { useEffect, useState } from "react";
import { FaUserCircle, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useCreateProfileMutation,
  useGetProfilebyIdQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} from "../../../../redux/Profile";

function ProfilePanel() {
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

  if (isLoading && !profile) {
    return (
      <div className="p-6 rounded-2xl bg-gray-50 border text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* PROFILE HEADER CARD */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">

        <div className="flex items-center gap-5">

          {form.preview ? (
            <img
              src={form.preview}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#203C8B]"
            />
          ) : (
            <FaUserCircle className="text-6xl text-[#203C8B]" />
          )}

          <div>
            <h2 className="text-xl font-bold text-[#203C8B]">
              {profile?.user?.name || "Your Name"}
            </h2>
            <p className="text-sm text-gray-500">
              {profile?.user?.email || "email not available"}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-5 text-sm">

          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#203C8B]">
            Member
          </span>

          <span className="flex items-center gap-2 text-green-600 font-medium">
            <FaCheckCircle />
            {hasProfile ? "Active" : "Not Created"}
          </span>
        </div>
      </div>

      {/* SETTINGS CARD */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h3 className="font-bold text-lg text-gray-800">
              Profile Settings
            </h3>
            <p className="text-sm text-gray-500">
              Manage your personal information
            </p>
          </div>

          <div className="flex gap-3">

            {hasProfile && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}

            <button
              onClick={() => setEditing(!editing)}
              className="px-4 py-2 rounded-xl bg-[#203C8B] text-white text-sm hover:bg-[#162a66] transition"
            >
              {editing
                ? "Cancel"
                : hasProfile
                ? "Edit"
                : "Create Profile"}
            </button>

          </div>
        </div>

        {/* EDIT FORM */}
        {editing ? (
          <div className="space-y-5">

            <textarea
              value={form.bio}
              onChange={handleChange}
              placeholder="Write your bio..."
              className="w-full border rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#203C8B] outline-none"
              rows={4}
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="text-sm"
            />

            <button
              onClick={handleSave}
              disabled={isCreating || isUpdating}
              className="w-full bg-[#203C8B] text-white py-3 rounded-2xl font-semibold hover:bg-[#162a66] transition"
            >
              {isCreating || isUpdating ? "Saving..." : "Save Profile"}
            </button>

          </div>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">
            {profile?.bio || "No bio added yet."}
          </p>
        )}
      </div>

      {/* SECURITY */}
      <div className="flex items-center gap-3 bg-blue-50 text-[#203C8B] p-4 rounded-2xl text-sm">
        <FaShieldAlt />
        Your account is protected with secure authentication
      </div>
    </div>
  );
}

export default ProfilePanel;