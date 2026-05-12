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
  const [form, setForm] = useState({ bio: "", profilePicture: null, preview: "" });

  const {
    data: profileResponse,
    error,
    isLoading,
    refetch,
  } = useGetProfilebyIdQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createProfile, { isLoading: isCreating }] = useCreateProfileMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();

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

    const message =
      error?.data?.message || error?.error || "Unable to load profile.";
    toast.error(message);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      profilePicture: file,
      preview: previewUrl,
    }));
  };

  const handleSave = async () => {
    if (!form.bio?.trim()) {
      return toast.error("Please enter a profile bio.");
    }

    const payload = new FormData();
    payload.append("bio", form.bio.trim());
    if (form.profilePicture) {
      payload.append("profilePicture", form.profilePicture);
    }

    try {
      const result = hasProfile
        ? await updateProfile(payload).unwrap()
        : await createProfile(payload).unwrap();
      toast.success(result?.message || "Profile saved successfully.");
      setEditing(false);
      refetch();
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Unable to save profile.";
      toast.error(message);
    }
  };

  const userData =
    profile && typeof profile.user === "object" ? profile.user : null;
  const displayName =
    userData?.name || userData?.email || profile?.user || "Your name";
  const displayEmail =
    userData?.email || profile?.user?.email || "No email available";
  const memberSince = profile
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "New member";

  const handleDelete = async () => {
    if (!hasProfile) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete your profile? This cannot be undone."
    );
    if (!confirmed) return;

    try {
      const result = await deleteProfile().unwrap();
      toast.success(result?.message || "Profile deleted successfully.");
      setForm({ bio: "", profilePicture: null, preview: "" });
      setEditing(true);
      refetch();
    } catch (err) {
      const message =
        err?.data?.message || err?.error || "Unable to delete profile.";
      toast.error(message);
    }
  };

  if (isLoading && !profile) {
    return (
      <div className="p-6 rounded-3xl border bg-gray-50">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-gray-50 p-5 rounded-3xl border">
        <div className="flex items-center gap-3">
          {form.preview ? (
            <img
              src={form.preview}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-5xl text-[#203C8B]" />
          )}
          <div>
            <h2 className="font-bold text-lg">{displayName}</h2>
            <p className="text-sm text-gray-500">{displayEmail}</p>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <span className="text-xs bg-blue-100 px-3 py-1 rounded-2xl">
            {memberSince}
          </span>

          <span className="flex items-center gap-2 text-green-600 text-sm font-semibold">
            <FaCheckCircle />
            {hasProfile ? "Verified" : "Not created"}
          </span>
        </div>
      </div>

      <div className="border rounded-3xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Profile Settings</h3>
            <p className="text-sm text-gray-500">Update your bio, photo, and account details.</p>
          </div>

          <div className="flex items-center gap-3">
            {hasProfile && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Profile"}
              </button>
            )}

            <button
              onClick={() => setEditing((prev) => !prev)}
              className="px-4 py-2 bg-[#203C8B] text-white rounded-xl text-sm"
            >
              {editing ? "Cancel" : hasProfile ? "Edit Profile" : "Create Profile"}
            </button>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Write a short bio about yourself"
              className="w-full p-3 border rounded-xl"
            />

            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600"
            />

            <button
              onClick={handleSave}
              disabled={isCreating || isUpdating}
              className="w-full bg-[#203C8B] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {isCreating || isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-600 space-y-3">
            <p className="text-gray-800 font-semibold">Bio</p>
            <p>{profile?.bio || "No bio added yet."}</p>
          </div>
        )}
      </div>

      {/* SECURITY */}
      <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-2 text-blue-700">
        <FaShieldAlt />
        Secure account protection enabled
      </div>
    </div>
  );
}

export default ProfilePanel;