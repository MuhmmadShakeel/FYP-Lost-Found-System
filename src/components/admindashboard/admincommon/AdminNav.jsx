import React from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

function AdminNav({ setOpen }) {

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-30">

      <div className="flex items-center gap-4">

        <button
          onClick={() => setOpen(true)}
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

        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-[#203C8B]" />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium">Admin</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </div>

      </div>

    </header>
  );
}
export default AdminNav;