import React, { useState, useMemo } from "react";
import {
  FaTrash,
  FaSearch,
  FaBox,
  FaEnvelope,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

import {
  useGetAllFoundPostsQuery,
  useDeleteFoundPostMutation,
} from "../../../redux/FoundPost";

function AdminFoundReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // API
  const { data, isLoading } = useGetAllFoundPostsQuery();
  const [deleteFoundPost] = useDeleteFoundPostMutation();

  const reports = data?.data || [];

  const categoryOptions = [
    "All Categories",
    "Electronics",
    "Keys",
    "Accessories",
    "Bags",
    "Sports",
  ];

  const statusOptions = [
    "All Status",
    "pending",
    "claimed",
    "resolved",
    "archived",
  ];

  // FILTER
  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        const searchMatch =
          r?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r?.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r?.location?.toLowerCase().includes(searchTerm.toLowerCase());

        const categoryMatch =
          selectedCategory === "All Categories" ||
          r?.category === selectedCategory;

        const statusMatch =
          selectedStatus === "All Status" || r?.status === selectedStatus;

        return searchMatch && categoryMatch && statusMatch;
      })
      .reverse();
  }, [reports, searchTerm, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteFoundPost(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  // STATUS UI
  const getStatus = (status) => {
    switch (status) {
      case "claimed":
        return (
          <span className="text-purple-600 flex items-center gap-1 text-xs">
            <FaCheckCircle /> Claimed
          </span>
        );
      case "resolved":
        return (
          <span className="text-green-600 flex items-center gap-1 text-xs">
            <FaCheckCircle /> Resolved
          </span>
        );
      case "archived":
        return (
          <span className="text-gray-500 flex items-center gap-1 text-xs">
            <FaClock /> Archived
          </span>
        );
      default:
        return (
          <span className="text-amber-600 flex items-center gap-1 text-xs">
            <FaClock /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 md:pl-72">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">Found Reports</h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Manage and review all found item reports with a clean responsive dashboard.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              <span>{reports.length} total reports</span>
            </div>
          </div>

        {/* STATS */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Total found</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{reports.length}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="mt-2 text-3xl font-semibold text-amber-600">
                {reports.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Claimed</p>
              <p className="mt-2 text-3xl font-semibold text-purple-600">
                {reports.filter((r) => r.status === "claimed").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Resolved</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-600">
                {reports.filter((r) => r.status === "resolved").length}
              </p>
            </div>
          </div>

        {/* SEARCH */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-3xl border border-slate-200 p-4 flex items-center gap-3">
            <FaSearch className="text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, item, category, or location"
              className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <label className="flex flex-col gap-2 bg-white rounded-3xl border border-slate-200 p-4">
            <span className="text-sm font-medium text-slate-600">Category</span>
            <select
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 focus:border-slate-400 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 bg-white rounded-3xl border border-slate-200 p-4">
            <span className="text-sm font-medium text-slate-600">Status</span>
            <select
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 focus:border-slate-400 focus:outline-none"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        {/* LOADING */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {/* LIST */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {isLoading ? (
            <div className="p-10 text-center text-slate-500">Loading reports...</div>
          ) : paginatedReports.length === 0 ? (
            <div className="p-10 text-center text-slate-500">No reports found</div>
          ) : (
            <div className="divide-y divide-slate-200">
              {paginatedReports.map((item) => (
                <article
                  key={item._id}
                  className="p-5 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-semibold text-slate-900">{item.item}</h2>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {item.name} • {item.location || "Unknown location"}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3">
                 
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                      aria-label="Delete report"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-white px-4 py-4 shadow-sm border border-slate-200">
            <div className="text-sm text-slate-600">
              Showing {paginatedReports.length} of {filteredReports.length} reports
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaChevronLeft />
              </button>
              <span className="min-w-18 text-center text-sm font-semibold text-slate-700">
                {currentPage} / {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  </div>
  );
}

export default AdminFoundReport;