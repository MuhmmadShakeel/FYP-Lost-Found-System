import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaSearch,
  FaBoxOpen,
  FaUsers,
  FaStar,
  FaBars,
  FaTimes,
  FaUndoAlt
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ open: controlledOpen, setOpen: setControlledOpen }) {

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = setControlledOpen ?? setInternalOpen;
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: <FaTachometerAlt />, path: "/admin/overview" },
    { name: "Lost Reports", icon: <FaSearch />, path: "/admin/lostreport" },
    { name: "Found Reports", icon: <FaBoxOpen />, path: "/admin/foundreport" },
    { name: "Claimed Items", icon: <FaBoxOpen />, path: "/admin/claimeditem" },
    { name: "Return Items", icon: <FaUndoAlt />, path: "/admin/returnitem" },
    { name: "Users", icon: <FaUsers />, path: "/admin/dashboarduser" },
    { name: "Reviews", icon: <FaStar />, path: "/admin/userreviews" },
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
            <Link
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition duration-300 ${
                location.pathname === item.path
                  ? "bg-white text-[#203C8B]"
                  : "hover:bg-white hover:text-[#203C8B]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
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