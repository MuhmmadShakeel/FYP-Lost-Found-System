import React, { useState } from "react";
import {
  useGetClaimInfoQuery,
  useDeleteClaimItemMutation,
} from "../../../../redux/ClaimApi.js";
import { toast } from "react-toastify";
import {
  MapPin,
  Calendar,
  User,
  Phone,
  FileText,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Loader2,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ClaimPanel() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetClaimInfoQuery();
  const [deleteClaimItem, { isLoading: isDeleting }] = useDeleteClaimItemMutation();

  const claims = data?.claimInfo || [];

  // Edit State
  const [editingItem, setEditingItem] = useState(null);
  const [draftName, setDraftName] = useState("");
  const [draftContact, setDraftContact] = useState("");
  const [draftDetails, setDraftDetails] = useState("");
  const [draftImageUrl, setDraftImageUrl] = useState("");
  const [draftImageFile, setDraftImageFile] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this claim?")) {
      try {
        await deleteClaimItem(id).unwrap();
        toast.success("Claim cancelled and removed successfully");
      } catch (err) {
        console.error("Delete error:", err);
        toast.error(err?.data?.message || "Failed to cancel claim");
      }
    }
  };

  const handleStartEdit = (item) => {
    setEditingItem(item._id);
    setDraftName(item.name || "");
    setDraftContact(item.contact || "");
    setDraftDetails(item.details || "");
    setDraftImageUrl(item.claimImage?.url || "");
    setDraftImageFile(null);
  };

  const handleSaveEdit = async (id) => {
    if (!draftName.trim() || !draftContact.trim() || !draftDetails.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", draftName.trim());
      formData.append("contact", draftContact.trim());
      formData.append("details", draftDetails.trim());
      if (draftImageFile) {
        formData.append("claimImage", draftImageFile);
      }

      await updateClaimItem({ id, formData }).unwrap();
      toast.success("Claim updated successfully");
      setEditingItem(null);
      setDraftImageFile(null);
      setDraftImageUrl("");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Failed to update claim");
    }
  };

  return (
    <div className="space-y-6">
      {/* PANEL HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">My Claims</h3>
          <p className="text-xs text-slate-500">Track and manage claims you've submitted</p>
        </div>
        <button
          onClick={() => navigate("/report-found")}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B1C3D] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#17346E] transition-all shadow-sm hover:shadow cursor-pointer"
        >
          <Search className="h-3.5 w-3.5" />
          Find Items
        </button>
      </div>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <Loader2 className="animate-spin h-8 w-8 text-[#0B1C3D]" />
          <p className="text-sm text-slate-500 font-medium">Loading claims...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Failed to load claims</p>
            <p className="text-xs text-red-700/90 mt-0.5">
              {error?.data?.message || error?.message || "Verify your connection or login status."}
            </p>
          </div>
        </div>
      )}

      {/* CLAIMS LIST */}
      <div className="space-y-4">
        {!isLoading && !isError && claims.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl p-6 bg-slate-50/50">
            <ImageIcon className="mx-auto h-10 w-10 text-slate-300 mb-3" />
            <h4 className="text-base font-bold text-slate-700">No active claims</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              You haven't claimed any found items yet. Click 'Find Items' to browse what has been reported.
            </p>
          </div>
        ) : (
          claims.map((item) => {
            const foundItem = item.foundItemId;
            return (
              <div
                key={item._id}
                className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
              >
                {editingItem === item._id ? (
                  /* EDITING MODE */
                  <div className="space-y-4">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0B1C3D] uppercase tracking-wider">Edit Claim Details</span>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Claimant Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          value={draftName}
                          onChange={(e) => setDraftName(e.target.value)}
                          className="w-full text-sm rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] bg-slate-50"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Contact Information</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          value={draftContact}
                          onChange={(e) => setDraftContact(e.target.value)}
                          className="w-full text-sm rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] bg-slate-50"
                          placeholder="Contact Info"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Claim Reason / Details</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <textarea
                          value={draftDetails}
                          onChange={(e) => setDraftDetails(e.target.value)}
                          rows={3}
                          className="w-full text-sm rounded-xl border border-slate-200 pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-[#0B1C3D] focus:border-[#0B1C3D] bg-slate-50 resize-none"
                          placeholder="Why this item belongs to you..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Change Proof Image</label>
                      <div className="flex items-center gap-4">
                        {draftImageUrl && (
                          <img
                            src={draftImageUrl}
                            alt="Claim preview"
                            className="h-16 w-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setDraftImageFile(file);
                              setDraftImageUrl(URL.createObjectURL(file));
                            }
                          }}
                          className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0B1C3D]/10 file:text-[#0B1C3D] hover:file:bg-[#0B1C3D]/15 cursor-pointer file:cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSaveEdit(item._id)}
                        disabled={isUpdating}
                        className="inline-flex items-center gap-1 bg-[#0B1C3D] px-4 py-2 text-xs font-semibold text-white rounded-xl hover:bg-[#17346E] transition disabled:opacity-50 cursor-pointer"
                      >
                        {isUpdating && <Loader2 className="animate-spin h-3 w-3" />}
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-200 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* VIEWING MODE */
                  <div className="space-y-4">
                    {/* TOP BADGE / DATE */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                          item.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "Rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {item.status || "Pending Verification"}
                      </span>
                    </div>

                    {/* CLAIMED FOUND ITEM SECTION */}
                    {foundItem ? (
                      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                        <img
                          src={foundItem?.foundimage?.url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"}
                          alt="claimed item"
                          className="h-14 w-14 rounded-xl object-cover border border-slate-200/80 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Claimed Item</p>
                          <h5 className="text-sm font-bold text-slate-800 truncate mt-0.5">{foundItem?.name}</h5>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span className="truncate">{foundItem?.location}</span>
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 shrink-0 mr-1" />
                      </div>
                    ) : (
                      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center text-xs text-slate-400 italic">
                        Claimed found item details are unavailable or item was deleted
                      </div>
                    )}

                    {/* YOUR CLAIM DETAILS */}
                    <div className="space-y-2 border-t border-slate-100 pt-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-semibold text-slate-400 block">Claimant:</span>
                          <span className="font-medium text-slate-700">{item.name}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-400 block">Contact Info:</span>
                          <span className="font-medium text-slate-700">{item.contact}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-semibold text-slate-400 block">Proof Details:</span>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 mt-1">
                          {item.details}
                        </p>
                      </div>

                      {item.claimImage?.url && (
                        <div>
                          <span className="text-xs font-semibold text-slate-400 block mb-1">Proof Image:</span>
                          <a
                            href={item.claimImage.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block relative rounded-xl overflow-hidden border border-slate-200 hover:opacity-90 transition-all cursor-pointer group"
                          >
                            <img
                              src={item.claimImage.url}
                              alt="Proof preview"
                              className="h-16 w-24 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ImageIcon className="h-4 w-4 text-white" />
                            </div>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 border-t border-slate-100 pt-3">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
                      >
                        <Edit2 className="h-3 w-3" />
                        Edit Claim
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-rose-100 transition disabled:opacity-50 cursor-pointer"
                      >
                        {isDeleting ? <Loader2 className="animate-spin h-3 w-3" /> : <Trash2 className="h-3 w-3" />}
                        Cancel Claim
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ClaimPanel;