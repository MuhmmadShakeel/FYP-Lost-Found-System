import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaSearch,
  FaBoxOpen,
  FaUsers,
  FaStar,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Sidebar() {

  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Overview", icon: <FaTachometerAlt /> },
    { name: "Lost Reports", icon: <FaSearch /> },
    { name: "Found Reports", icon: <FaBoxOpen /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Reviews", icon: <FaStar /> },
  ];

  return (
    <>
      {/* MENU BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 md:hidden bg-white p-3 rounded-lg text-[#203C8B]"
        >
          <FaBars size={18} />
        </button>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#203C8B] text-white shadow-lg transform transition-transform duration-300 z-40
        ${open ? "translate-x-0 w-64" : "-translate-x-full w-64"}
        md:translate-x-0`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">

          <span className="text-xl font-bold tracking-wide">
            Lost & Found
          </span>

          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>

        </div>

        {/* MENU ITEMS */}
        <ul className="mt-6 flex flex-col gap-2 px-4">

          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-white hover:text-[#203C8B]"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </li>
          ))}

        </ul>

        {/* FOOTER */}
        <div className="absolute bottom-6 left-6 text-xs opacity-70">
          Admin Dashboard
        </div>

      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;