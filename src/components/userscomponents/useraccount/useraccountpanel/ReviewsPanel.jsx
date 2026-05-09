import React, { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash, FaStar } from "react-icons/fa";

function ReviewsPanel() {
  const [reviews, setReviews] = useState([
    {
      id: 21,
      title: "Fast response",
      comment: "Support helped me recover a lost bag in one day. Excellent service!",
      date: "May 03, 2026",
      rating: 5,
      status: "Published",
    },
    {
      id: 22,
      title: "Great platform",
      comment: "Easy to report and track lost items. Very user-friendly interface.",
      date: "Apr 20, 2026",
      rating: 4,
      status: "Published",
    },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftComment, setDraftComment] = useState("");
  const [draftRating, setDraftRating] = useState(3);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartEdit = (item) => {
    setEditingItem(item.id);
    setDraftTitle(item.title);
    setDraftComment(item.comment);
    setDraftRating(item.rating);
  };

  const handleSaveEdit = () => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === editingItem
          ? { ...item, title: draftTitle, comment: draftComment, rating: draftRating }
          : item
      )
    );
    setEditingItem(null);
    setDraftTitle("");
    setDraftComment("");
    setDraftRating(3);
  };

  const handleAddNew = () => {
    const newItem = {
      id: Date.now(),
      title: "New review",
      comment: "Share your experience with our service.",
      date: "Today",
      rating: 3,
      status: "Draft",
    };
    setReviews((prev) => [newItem, ...prev]);
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={interactive ? () => setDraftRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Reviews</h3>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#203C8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
        >
          <FaPlus />
          Add Review
        </button>
      </div>

      <div className="space-y-3">
        {reviews.map((item) => (
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
                  placeholder="Review title"
                />
                <textarea
                  value={draftComment}
                  onChange={(e) => setDraftComment(e.target.value)}
                  rows={3}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none"
                  placeholder="Your review"
                />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Rating:</span>
                  {renderStars(draftRating, true)}
                </div>
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
                    <p className="mt-1 text-sm text-slate-600">{item.comment}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {renderStars(item.rating)}
                      <span className="text-xs text-slate-500">({item.rating}/5)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">
                      {item.date}
                    </span>
                    <span className={`rounded-full px-3 py-1 border ${
                      item.status === "Published"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
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
                    onClick={() => alert("Viewing review: " + item.title)}
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

export default ReviewsPanel;