import React, { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

function FoundPostsPanel() {
  const [foundPosts, setFoundPosts] = useState([
    {
      id: 11,
      title: "Silver watch",
      details: "Found at park entrance. Black leather strap, silver dial.",
      date: "May 01, 2026",
      status: "Open",
      location: "Park Entrance",
    },
    {
      id: 12,
      title: "White headphones",
      details: "Left in cafe. Wireless, with charging case.",
      date: "Apr 28, 2026",
      status: "Claimed",
      location: "Cafe",
    },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDetails, setDraftDetails] = useState("");

  const handleDelete = (id) => {
    setFoundPosts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartEdit = (item) => {
    setEditingItem(item.id);
    setDraftTitle(item.title);
    setDraftDetails(item.details);
  };

  const handleSaveEdit = () => {
    setFoundPosts((prev) =>
      prev.map((item) =>
        item.id === editingItem
          ? { ...item, title: draftTitle, details: draftDetails }
          : item
      )
    );
    setEditingItem(null);
    setDraftTitle("");
    setDraftDetails("");
  };

  const handleAddNew = () => {
    const newItem = {
      id: Date.now(),
      title: "New found item report",
      details: "Describe the found item in detail.",
      date: "Today",
      status: "Open",
      location: "Unknown",
    };
    setFoundPosts((prev) => [newItem, ...prev]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Found Items</h3>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#203C8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
        >
          <FaPlus />
          Add New
        </button>
      </div>

      <div className="space-y-3">
        {foundPosts.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:bg-white"
          >
            {editingItem === item.id ? (
              <div className="space-y-4">
                <input
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Item title"
                />
                <textarea
                  value={draftDetails}
                  onChange={(e) => setDraftDetails(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Item details"
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="rounded-2xl bg-[#203C8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{item.details}</p>
                    <p className="mt-2 text-xs text-slate-500">📍 {item.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">
                      {item.date}
                    </span>
                    <span className={`rounded-full px-3 py-1 border ${
                      item.status === "Open"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : item.status === "Claimed"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                  <button
                    onClick={() => alert("Viewing details for " + item.title)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#203C8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
                  >
                    <FaEye /> View
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoundPostsPanel;