import React, { useState, useMemo } from "react";
import {
  FaTrash,
  FaSearch,
  FaUndoAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEnvelope,
  FaBox,
  FaMapMarkerAlt,
  FaPhone,
  FaImage,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetAllReturnsQuery, useDeleteReturnItemMutation } from "../../../redux/ReturnApi";

function AllReturnItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const itemsPerPage = 6;

  // API
  const { data, isLoading, error } = useGetAllReturnsQuery();
  const [deleteReturnItem] = useDeleteReturnItemMutation();

  // Debug logging
  React.useEffect(() => {
    console.log("🔍 AllReturnItem Component - useGetAllReturnsQuery Status:");
    console.log("   isLoading:", isLoading);
    console.log("   error:", error);
    console.log("   data:", data);
    
    const token = localStorage.getItem('token');
    console.log("🔑 Token in localStorage:", token ? "✅ EXISTS" : "❌ NOT FOUND");
    
    if (error) {
      console.error("❌ Returns API Error Details:");
      console.error("   Status:", error.status);
      console.error("   Message:", error.data?.message);
      console.error("   Full Error:", error);
    }
    if (data) {
      console.log("✅ Returns Data Received:");
      console.log("   Count:", data.totalReturns);
      console.log("   Items:", data.data?.length);
      console.log("   Full Data:", data);
    }
  }, [error, data, isLoading]);

  const returns = data?.data || [];

  // FILTER & SEARCH
  const filteredReturns = useMemo(() => {
    return returns
      .filter((returnItem) => {
        const searchMatch =
          returnItem?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          returnItem?.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          returnItem?.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          returnItem?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          returnItem?.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          returnItem?.lostItem?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        return searchMatch;
      })
      .reverse();
  }, [returns, searchTerm]);

  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage);

  const paginatedReturns = filteredReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this return request?")) {
      try {
        const response = await deleteReturnItem(id).unwrap();
        toast.success(response?.message || "Return item deleted successfully!");
        console.log("✅ Delete Response:", response);
      } catch (err) {
        console.error("❌ Error deleting return:", err);
        const errorMsg = err?.data?.message || err?.message || "Failed to delete return item";
        toast.error(errorMsg);
      }
    }
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#203C8B] mx-auto"></div>
          <p className="text-slate-600">Loading return items...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    const errorStatus = error?.status || "Unknown";
    const errorMessage = error?.data?.message || error?.message || "Failed to fetch returns";
    const errorDetails = error?.data?.error || error?.statusText || "No additional details";
    const token = localStorage.getItem('token');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 max-w-2xl w-full space-y-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-4xl text-red-600">⚠️</div>
            <h2 className="text-red-800 font-bold text-xl">Error Loading Returns</h2>
          </div>
          
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 space-y-2">
            <p className="text-red-900 font-semibold">Status: {errorStatus}</p>
            <p className="text-red-800">{errorMessage}</p>
            {errorDetails !== "No additional details" && (
              <p className="text-red-700 text-sm">{errorDetails}</p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 space-y-3">
            <p className="font-semibold text-yellow-900">🔍 Debugging Information:</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between bg-white p-2 rounded border border-yellow-200">
                <span className="font-mono text-yellow-800">Token Status:</span>
                <span className={`font-mono font-bold ${token ? 'text-green-600' : 'text-red-600'}`}>
                  {token ? '✅ EXISTS' : '❌ MISSING'}
                </span>
              </div>
              
              <div className="flex justify-between bg-white p-2 rounded border border-yellow-200">
                <span className="font-mono text-yellow-800">Error Code:</span>
                <span className="font-mono font-bold text-red-600">{errorStatus}</span>
              </div>
              
              <div className="flex justify-between bg-white p-2 rounded border border-yellow-200">
                <span className="font-mono text-yellow-800">Message:</span>
                <span className="font-mono text-sm text-red-600">{errorMessage}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-blue-900">💡 What to do:</p>
            <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
              {errorStatus === 401 && (
                <>
                  <li>Your session may have expired - try logging in again</li>
                  <li>Make sure you're authenticated before accessing this page</li>
                  <li>Check browser DevTools (F12) → Application → localStorage for 'token'</li>
                </>
              )}
              {errorStatus === 403 && (
                <>
                  <li>You don't have permission to access this resource</li>
                  <li>Contact an administrator if this is unexpected</li>
                </>
              )}
              {errorStatus === 500 && (
                <>
                  <li>Server error occurred - the backend may be down</li>
                  <li>Check if the server is running on port 5000</li>
                </>
              )}
              <li>Check browser console (F12) for more details</li>
              <li>Check server terminal for error logs</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
            >
              🔄 Retry
            </button>
            <button
              onClick={() => window.location.href = '/admin/overview'}
              className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition"
            >
              ← Go Back
            </button>
          </div>

          {/* Raw Error Data - Hidden by default */}
          <details className="bg-gray-100 border border-gray-300 rounded-lg p-3">
            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
              📊 Raw Error Data
            </summary>
            <pre className="mt-2 text-xs bg-white p-2 rounded overflow-auto max-h-48 text-gray-700">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 md:pl-72">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Return Items
              </h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Monitor and manage all item return requests from users
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-md border border-slate-200 hover:shadow-lg transition-shadow">
              <FaUndoAlt className="text-indigo-600" />
              <span>{returns.length} total returns</span>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
            {/* Total Returns */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Returns</p>
                  <p className="mt-2 text-4xl font-bold text-slate-900">
                    {returns.length}
                  </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-full">
                  <FaUndoAlt className="text-2xl text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Unique Returners */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Unique Returners</p>
                  <p className="mt-2 text-4xl font-bold text-purple-600">
                    {new Set(returns.map(r => r.userId?._id)).size}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-full">
                  <FaUser className="text-2xl text-purple-600" />
                </div>
              </div>
            </div>

            {/* Items Under Return */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Items Under Return</p>
                  <p className="mt-2 text-4xl font-bold text-amber-600">
                    {new Set(returns.map(r => r.lostItem?._id)).size}
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-full">
                  <FaBox className="text-2xl text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTER */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, contact, or item..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition"
              >
                Clear
              </button>
            </div>
          </div>

          {/* RETURNS TABLE - DESKTOP VIEW */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Returner Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Item Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Return Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Proof Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paginatedReturns.length > 0 ? (
                    paginatedReturns.map((returnItem) => (
                      <tr
                        key={returnItem._id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        {/* Returner Info */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <FaUser className="text-indigo-600 text-xs" />
                              <p className="font-semibold text-slate-900">
                                {returnItem?.name || "N/A"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <FaPhone className="text-xs" />
                              {returnItem?.contact || "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <FaEnvelope className="text-xs" />
                              {returnItem?.userId?.email || "N/A"}
                            </div>
                          </div>
                        </td>

                        {/* Item Details */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 font-semibold text-slate-900">
                              <FaBox className="text-amber-600 text-xs" />
                              {returnItem?.lostItem?.name || "N/A"}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <FaMapMarkerAlt className="text-xs" />
                              {returnItem?.lostItem?.location || "N/A"}
                            </div>
                            <div className="text-xs text-slate-500">
                              Lost by: {returnItem?.lostItem?.userId?.name || "Unknown"}
                            </div>
                          </div>
                        </td>

                        {/* Return Details */}
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-sm text-slate-700 line-clamp-2">
                              {returnItem?.details || "No details provided"}
                            </p>
                          </div>
                        </td>

                        {/* Proof Image */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {returnItem?.returnImage?.url ? (
                            <button
                              onClick={() =>
                                setSelectedImage(returnItem?.returnImage?.url)
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium transition"
                            >
                              <FaImage /> View
                            </button>
                          ) : (
                            <span className="text-slate-400 text-sm">
                              No image
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(returnItem._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition"
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="text-slate-500">
                          <FaBox className="text-3xl mx-auto mb-2 opacity-50" />
                          <p>No returns found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RETURNS CARDS - MOBILE VIEW */}
          <div className="lg:hidden space-y-4">
            {paginatedReturns.length > 0 ? (
              paginatedReturns.map((returnItem) => (
                <div
                  key={returnItem._id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {returnItem?.name || "N/A"}
                      </h3>
                      <p className="text-sm text-slate-600 flex items-center gap-2">
                        <FaPhone className="text-xs" />
                        {returnItem?.contact || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
                      <FaUndoAlt className="text-indigo-600 text-sm" />
                      <span className="text-xs font-semibold text-indigo-600">
                        Return
                      </span>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs text-slate-500 font-semibold uppercase">
                      Item Information
                    </p>
                    <p className="font-semibold text-slate-900 flex items-center gap-2">
                      <FaBox className="text-amber-600 text-xs" />
                      {returnItem?.lostItem?.name || "N/A"}
                    </p>
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-xs" />
                      {returnItem?.lostItem?.location || "N/A"}
                    </p>
                    <p className="text-xs text-slate-500">
                      Lost by: {returnItem?.lostItem?.userId?.name || "Unknown"}
                    </p>
                  </div>

                  {/* Returner Details */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs text-slate-500 font-semibold uppercase">
                      Returner Details
                    </p>
                    <p className="text-sm text-slate-700 flex items-center gap-2">
                      <FaEnvelope className="text-xs text-indigo-600" />
                      {returnItem?.userId?.email || "N/A"}
                    </p>
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">Details:</span>{" "}
                      {returnItem?.details || "No details provided"}
                    </p>
                  </div>

                  {/* Proof Image & Actions */}
                  <div className="flex gap-2 pt-2">
                    {returnItem?.returnImage?.url && (
                      <button
                        onClick={() =>
                          setSelectedImage(returnItem?.returnImage?.url)
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg font-medium text-sm transition"
                      >
                        <FaImage /> View Proof
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(returnItem._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium text-sm transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <FaBox className="text-4xl mx-auto mb-4 text-slate-400" />
                <p className="text-slate-500 font-medium">No returns found</p>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FaChevronLeft className="text-slate-600" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <FaChevronRight className="text-slate-600" />
              </button>
            </div>
          )}

          {/* Empty State */}
          {returns.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="space-y-4">
                <FaUndoAlt className="text-5xl mx-auto text-slate-300" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    No Return Items Yet
                  </h3>
                  <p className="text-slate-500 mt-2">
                    When users return lost items, they will appear here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-100 aspect-video flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Return Proof"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-4 text-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllReturnItem;
