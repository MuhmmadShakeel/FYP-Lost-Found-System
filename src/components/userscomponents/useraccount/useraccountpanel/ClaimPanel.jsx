import React, { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {useGetClaimInfoQuery} from '../../../../redux/ClaimApi.js'
function ClaimPanel() {
  const { data: claimInfo, isLoading, isError, isSuccess, error } = useGetClaimInfoQuery();
  const [claims, setClaims] = useState([]);

  // Initialize claims from API data
  React.useEffect(() => {
    if (isSuccess && claimInfo?.claimInfo) {
      setClaims(claimInfo.claimInfo);
    }
  }, [isSuccess, claimInfo]);

  const [editingItem, setEditingItem] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [draftContact, setDraftContact] = useState("");
  const [draftDetails, setDraftDetails] = useState("");
  const [draftImageUrl, setDraftImageUrl] = useState("");
  const handleDelete = async (id) => {
    // In a real application, you would call a delete API here
    // For now, we'll simulate with local state update
    try {
      // TODO: Implement actual delete API call when available
      // await deleteClaimItem(id);
      setClaims((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      // Show error to user in a real implementation
    }
  };

  const handleStartEdit = (item) => {
    setEditingItem(item._id);
    setDraftName(item.name || "");
    setDraftContact(item.contact || "");
    setDraftDetails(item.details || "");
    setDraftImageUrl(item.claimImage?.url || "");
  };

  const handleSaveEdit = () => {
    // In a real application, you would call an update API here
    // For now, we'll simulate with local state update
    try {
      // TODO: Implement actual update API call when available
      setEditingItem(null);
      setDraftName("");
      setDraftContact("");
      setDraftDetails("");
      setDraftImageUrl("");
    } catch (err) {
      console.error("Update error:", err);
      // Show error to user in a real implementation
    }
  };

  const handleAddNew = () => {
    // For adding new claims, you would navigate to the claim form
    // This is just a placeholder
    alert("To add a new claim, please go to the Claim Form section");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Claims</h3>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#203C8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
        >
          <FaPlus />
          Add Claim
        </button>
      </div>

      {isLoading && <div className="text-center py-4">Loading claims...</div>}
      {isError && <div className="text-center py-4 text-red-500">Error loading claims: {error?.message || 'Unknown error'}</div>}

      <div className="space-y-3">
        {claims.length === 0 && (!isLoading && !isError) ? (
          <div className="text-center py-8 text-gray-500">
            <p>No claims found</p>
            <p className="text-sm">You haven't made any claims yet</p>
          </div>
        ) : (
          claims.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:bg-white"
            >
              {editingItem === item._id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Claimant Name</label>
                    <input
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D]"
                      placeholder="Claimant Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                    <input
                      value={draftContact}
                      onChange={(e) => setDraftContact(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D]"
                      placeholder="Contact Information"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Claim Details</label>
                    <textarea
                      value={draftDetails}
                      onChange={(e) => setDraftDetails(e.target.value)}
                      rows={3}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D]"
                      placeholder="Claim Details"
                    />
                  </div>
                  {draftImageUrl ? (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Claim Image Preview</label>
                      <img
                        src={draftImageUrl}
                        alt="Claim preview"
                        className="max-w-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      No image uploaded
                    </div>
                  )}
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
                      <h4 className="text-lg font-semibold text-slate-900">{item.name}</h4>
                      <p className="mt-1 text-sm text-slate-600">{item.details}</p>
                      {item.contact && (
                        <p className="mt-1 text-sm text-slate-600">
                          Contact: {item.contact}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="rounded-full bg-white px-3 py-1 text-slate-700 border border-slate-200">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`rounded-full px-3 py-1 border ${
                        item.status === "Published" || item.status === "Approved"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}>
                        {item.status || "Submitted"}
                      </span>
                    </div>
                  </div>

                  {item.claimImage?.url && (
                    <div className="mt-4">
                      <img
                        src={item.claimImage.url}
                        alt="Claim image"
                        className="max-w-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                    <button
                      onClick={() => alert("Viewing claim: " + item.name)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#203C8B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a336e] transition"
                    >
                      <FaEye /> View
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClaimPanel;