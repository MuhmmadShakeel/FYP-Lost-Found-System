import React, { useState } from "react";
import { FaUserCircle, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

function ProfilePanel() {
  const [profile, setProfile] = useState({
    name: "Sara Khan",
    email: "sara.khan@example.com",
    phone: "0321 1234567",
    city: "Karachi, PK",
    memberSince: "May 2024",
    status: "Verified",
  });

  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
  };

  return (
    <div className="space-y-5">
      {/* USER CARD */}
      <div className="bg-gray-50 p-5 rounded-3xl border">
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-5xl text-[#203C8B]" />
          <div>
            <h2 className="font-bold text-lg">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <span className="text-xs bg-blue-100 px-3 py-1 rounded-2xl">
            {profile.memberSince}
          </span>

          <span className="flex items-center gap-2 text-green-600 text-sm font-semibold">
            <FaCheckCircle />
            {profile.status}
          </span>
        </div>
      </div>

      {/* EDIT SECTION */}
      <div className="border rounded-3xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Profile Settings</h3>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-[#203C8B] text-white rounded-xl text-sm"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {editing ? (
          <div className="space-y-3">
            <input
              name="name"
              value={draft.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="email"
              value={draft.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="phone"
              value={draft.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border rounded-xl"
            />

            <input
              name="city"
              value={draft.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 border rounded-xl"
            />

            <button
              onClick={handleSave}
              className="w-full bg-[#203C8B] text-white py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="text-sm text-gray-600 space-y-2">
            <p><b>Phone:</b> {profile.phone}</p>
            <p><b>City:</b> {profile.city}</p>
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