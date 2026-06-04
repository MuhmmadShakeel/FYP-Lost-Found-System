import React from "react";
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
  Trash2,
  Image as ImageIcon,
  Loader2,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  FileText,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ClaimPanel() {
  const navigate = useNavigate();
  
  // API Hooks
  const { data, isLoading, isError, error } = useGetClaimInfoQuery();
  const [deleteClaimItem, { isLoading: isDeleting }] = useDeleteClaimItemMutation();

  const claims = data?.claimInfo || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this claim? This action cannot be undone.")) {
      try {
        await deleteClaimItem(id).unwrap();
        toast.success("Claim cancelled and removed successfully");
      } catch (err) {
        console.error("Delete error:", err);
        toast.error(err?.data?.message || "Failed to cancel claim");
      }
    }
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case "Approved":
        return { icon: CheckCircle, color: "emerald", bg: "emerald-50", text: "emerald-700", border: "emerald-200", dot: "bg-emerald-500" };
      case "Rejected":
        return { icon: XCircle, color: "rose", bg: "rose-50", text: "rose-700", border: "rose-200", dot: "bg-rose-500" };
      default:
        return { icon: Clock, color: "amber", bg: "amber-50", text: "amber-700", border: "amber-200", dot: "bg-amber-500" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* PANEL HEADER */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-1 bg-gradient-to-b from-[#0B1C3D] to-[#17346E] rounded-full"></div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#0B1C3D] to-[#17346E] bg-clip-text text-transparent">
                    My Claims
                  </h1>
                  <p className="text-gray-500 mt-1 text-sm lg:text-base">
                    Track and manage your item claims
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/report-found")}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B1C3D] to-[#17346E] rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#17346E] to-[#0B1C3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Search className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Browse Items</span>
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C3D]/20 to-[#17346E]/20 rounded-full blur-xl animate-pulse"></div>
              <Loader2 className="animate-spin h-12 w-12 text-[#0B1C3D] relative" />
            </div>
            <p className="mt-6 text-gray-500 font-medium">Loading your claims...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {isError && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 text-lg">Unable to Load Claims</h3>
                <p className="text-red-600 mt-1">
                  {error?.data?.message || error?.message || "Please check your connection and try again."}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CLAIMS LIST */}
        <div className="space-y-6">
          {!isLoading && !isError && claims.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 h-32 w-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Claims Yet</h3>
                <p className="text-gray-500 mb-6">
                  You haven't claimed any found items. Start browsing to claim items you've lost.
                </p>
                <button
                  onClick={() => navigate("/report-found")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1C3D] text-white rounded-xl font-medium hover:bg-[#17346E] transition-all shadow-md hover:shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  Browse Found Items
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              {claims.map((item, index) => {
                const foundItem = item.foundItemId;
                const statusConfig = getStatusConfig(item.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div
                    key={item._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 animate-in slide-in-from-bottom-4 fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Header Bar */}
                    <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">
                            {new Date(item.createdAt).toLocaleDateString(undefined, {
                              month: "long",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-${statusConfig.bg} text-${statusConfig.text} border border-${statusConfig.border} self-start sm:self-auto`}>
                          <StatusIcon className={`h-3.5 w-3.5 text-${statusConfig.color}-500`} />
                          {item.status || "Pending Verification"}
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 lg:p-8">
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Claimed Item Section */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wider">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <span>Claimed Item</span>
                            <div className="h-px flex-1 bg-gray-200"></div>
                          </div>
                          
                          {foundItem ? (
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all duration-300 group/item">
                              <div className="flex gap-4">
                                <div className="relative">
                                  <img
                                    src={foundItem?.foundimage?.url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"}
                                    alt="claimed item"
                                    className="h-20 w-20 rounded-xl object-cover border-2 border-white shadow-md"
                                  />
                                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink className="h-5 w-5 text-white" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-800 text-lg truncate">{foundItem?.name}</h4>
                                  <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-sm">
                                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="truncate">{foundItem?.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                              <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm">Item details unavailable</p>
                            </div>
                          )}
                        </div>

                        {/* Claim Details Section */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold uppercase tracking-wider">
                            <div className="h-px flex-1 bg-gray-200"></div>
                            <span>Claim Information</span>
                            <div className="h-px flex-1 bg-gray-200"></div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-3">
                              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                                <User className="h-3.5 w-3.5" />
                                <span>Claimant</span>
                              </div>
                              <p className="text-gray-800 font-semibold text-sm">{item.name}</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-3">
                              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                                <Phone className="h-3.5 w-3.5" />
                                <span>Contact</span>
                              </div>
                              <p className="text-gray-800 font-semibold text-sm">{item.contact}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-2">
                              <FileText className="h-3.5 w-3.5" />
                              <span>Additional Details</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{item.details}</p>
                          </div>

                          {item.claimImage?.url && (
                            <div>
                              <a
                                href={item.claimImage.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-[#0B1C3D] font-medium hover:text-[#17346E] transition-colors group/link"
                              >
                                <div className="relative">
                                  <img
                                    src={item.claimImage.url}
                                    alt="Proof preview"
                                    className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                  />
                                </div>
                                <span className="group-hover/link:underline">View Proof Document</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting}
                          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="animate-spin h-4 w-4" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              <span>Cancel Claim</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ClaimPanel;