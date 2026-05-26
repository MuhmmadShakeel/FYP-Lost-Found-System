import React, { useState } from "react";
import {
  useGetReturnInfoQuery,
  useDeleteReturnItemMutation,
} from "../../../../redux/ReturnApi.js";
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

function ReturnPanel() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetReturnInfoQuery();
  const [deleteReturnItem, { isLoading: isDeleting }] = useDeleteReturnItemMutation();

  const returns = data?.returnInfo || [];

  return (
    <div className="space-y-6">
      {/* PANEL HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">My Return Requests</h3>
          <p className="text-xs text-slate-500">Track and manage return requests you've submitted</p>
        </div>
        <button
          onClick={() => navigate("/report-lost")}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B1C3D] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#17346E] transition-all shadow-sm hover:shadow cursor-pointer"
        >
          <Search className="h-3.5 w-3.5" />
          Report Lost
        </button>
      </div>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-3">
          <Loader2 className="animate-spin h-8 w-8 text-[#0B1C3D]" />
          <p className="text-sm text-slate-500 font-medium">Loading return requests...</p>
        </div>
      )}

      {/* ERROR STATE */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Failed to load return requests</p>
            <p className="text-xs text-red-700/90 mt-0.5">
              {error?.data?.message || error?.message || "Verify your connection or login status."}
            </p>
          </div>
        </div>
      )}

      {/* RETURNS LIST */}
      <div className="space-y-4">
        {!isLoading && !isError && returns.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl p-6 bg-slate-50/50">
            <ImageIcon className="mx-auto h-10 w-10 text-slate-300 mb-3" />
            <h4 className="text-base font-bold text-slate-700">No return requests</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              You haven't submitted any return requests yet. Report a lost item to return it.
            </p>
          </div>
        ) : (
          returns.map((item) => {
            const lostItem = item.lostItem;
            return (
              <div
                key={item._id}
                className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
              >
                {/* VIEWING MODE */}
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

                  {/* LOST ITEM SECTION */}
                  {lostItem ? (
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                      <img
                        src={lostItem?.lostImage?.url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"}
                        alt="lost item"
                        className="h-14 w-14 rounded-xl object-cover border border-slate-200/80 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Lost Item</p>
                        <h5 className="text-sm font-bold text-slate-800 truncate mt-0.5">{lostItem?.name}</h5>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{lostItem?.location}</span>
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 shrink-0 mr-1" />
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center text-xs text-slate-400 italic">
                      Lost item details are unavailable or item was deleted
                    </div>
                  )}

                  {/* YOUR RETURN DETAILS */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-semibold text-slate-400 block">Returned By:</span>
                        <span className="font-medium text-slate-700">{item.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-400 block">Contact Info:</span>
                        <span className="font-medium text-slate-700">{item.contact}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 block">Return Details:</span>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 mt-1">
                        {item.details}
                      </p>
                    </div>

                    {item.returnImage?.url && (
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block mb-1">Proof Image:</span>
                        <a
                          href={item.returnImage.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block relative rounded-xl overflow-hidden border border-slate-200 hover:opacity-90 transition-all cursor-pointer group"
                        >
                          <img
                            src={item.returnImage.url}
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
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this return request?")) {
                          deleteReturnItem(item._id).unwrap()
                            .then(() => {
                              toast.success("Return request deleted successfully");
                            })
                            .catch((err) => {
                              toast.error(err?.data?.message || "Failed to delete return request");
                            });
                        }
                      }}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-rose-100 transition disabled:opacity-50 cursor-pointer"
                    >
                      {isDeleting ? <Loader2 className="animate-spin h-3 w-3" /> : <Trash2 className="h-3 w-3" />}
                      Delete Request
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ReturnPanel;