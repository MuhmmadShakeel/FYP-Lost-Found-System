import React, { useState } from "react";
import { FaBell, FaBars, FaUserShield } from "react-icons/fa";
import AdminProfilePanel from "./AdminProfilePanel";
import { useGetProfilebyIdQuery } from "../../../redux/Profile";

function AdminNav({ setOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const { data: profileResponse } = useGetProfilebyIdQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const profile = profileResponse?.data;

  return (
    <>
      <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-30">

        <div className="flex items-center gap-4">

          <button
            onClick={() => setOpen?.(true)}
            className="md:hidden text-xl text-[#203C8B]"
          >
            <FaBars />
          </button>

          <h1 className="text-lg font-semibold text-gray-700">
            Admin Dashboard
          </h1>

        </div>

        <div className="flex items-center gap-6">

          <button className="relative text-gray-600">
            <FaBell />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 text-[#203C8B] hover:text-[#162a66] transition"
          >
            <div className="relative">
              {profile?.profilePicture?.url ? (
                <img
                  src={profile.profilePicture.url}
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#203C8B]"
                />
              ) : (
                <FaUserShield className="text-2xl" />
              )}
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-medium">{profile?.user?.name || "Admin User"}</span>
              <span className="text-xs text-gray-500">Administrator</span>
            </div>
          </button>

        </div>

      </header>

      <AdminProfilePanel open={profileOpen} setOpen={setProfileOpen} />
    </>
  );
}
export default AdminNav;