import React, { useState } from "react";
import {
  FaUserCircle,
  FaShieldAlt,
  FaCheckCircle,
  FaTimes,
  FaBoxOpen,
  FaSearchLocation,
  FaFileImage,
} from "react-icons/fa";
import ProfilePanel from "./useraccountpanel/ProfilePanel.jsx";
import LostPostsPanel from "./useraccountpanel/LostPostsPanel.jsx";
import FoundPostsPanel from "./useraccountpanel/FoundPostsPanel.jsx";
import ClaimPanel from "./useraccountpanel/ClaimPanel.jsx";

function UserAccount({ open, setOpen }) {
  const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
      { key: "profile", label: "Profile", icon: <FaUserCircle /> },
      { key: "lost", label: "Lost Items", icon: <FaBoxOpen /> },
      { key: "found", label: "Found Items", icon: <FaSearchLocation /> },
      { key: "claims", label: "Claims", icon: <FaFileImage /> },
    ];

   const renderActivePanel = () => {
     switch (activeTab) {
       case "profile":
         return <ProfilePanel />;
       case "lost":
         return <LostPostsPanel />;
       case "found":
         return <FoundPostsPanel />;
       case "claims":
         return <ClaimPanel />;
       default:
         return <ProfilePanel />;
     }
   };

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* RIGHT DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-125 bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h1 className="text-lg font-bold text-[#203C8B]">
              User Profile
            </h1>
            <p className="text-xs text-gray-500">
              Manage your account
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-xl text-gray-600 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-2 p-4 border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition
              ${
                activeTab === tab.key
                  ? "bg-[#203C8B] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-5 overflow-y-auto h-[calc(100%-140px)]">
          {renderActivePanel()}
        </div>
      </div>
    </>
  );
}

export default UserAccount;