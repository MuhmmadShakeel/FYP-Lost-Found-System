import React, { useState, useMemo } from "react";
import {
  FaTrash,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  useGetAllLostPostsQuery,
  useDeleteLostPostMutation,
} from "../../../redux/LostPost";

function AdminLostReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ✅ API
  const { data, isLoading, refetch } = useGetAllLostPostsQuery();
  const [deleteLostPost] = useDeleteLostPostMutation();

  // ✅ Safe data
  const reports = data?.data || [];

  const productOptions = [
    "All Products",
    "Wallet",
    "Mobile Phone",
    "Laptop",
    "Bag",
    "Keys",
    "Documents",
  ];

  const statusOptions = ["All Status", "pending", "resolved", "archived"];

  // ✅ DELETE HANDLER
  const handleDelete = async (id) => {
    try {
      await deleteLostPost(id).unwrap();
      refetch(); // refresh data after delete
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ✅ FILTERING
  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => {
        const name = report?.name || "";
        const product = report?.product || "";
        const location = report?.location || "";

        const matchesSearch =
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProduct =
          selectedProduct === "All Products" ||
          product === selectedProduct;

        const matchesStatus =
          selectedStatus === "All Status" ||
          report?.status === selectedStatus;

        return matchesSearch && matchesProduct && matchesStatus;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [reports, searchTerm, selectedProduct, selectedStatus]);

  // reset page if filter changes
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ STATUS BADGE
  const getStatusBadge = (status) => {
    if (status === "resolved") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
          <FaCheckCircle size={10} /> Resolved
        </span>
      );
    }

    if (status === "archived") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
          <FaClock size={10} /> Archived
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
        <FaClock size={10} /> Pending
      </span>
    );
  };

  // reset page when filters change
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 md:pl-72">
        <div className="max-w-[1440px] mx-auto">

          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                Lost Reports
              </h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Manage and track all lost item reports with a clean responsive dashboard.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              <span>{reports.length} total reports</span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Total reports</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{reports.length}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="mt-2 text-3xl font-semibold text-amber-600">
                {reports.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Resolved</p>
              <p className="mt-2 text-3xl font-semibold text-emerald-600">
                {reports.filter((r) => r.status === "resolved").length}
              </p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Archived</p>
              <p className="mt-2 text-3xl font-semibold text-slate-700">
                {reports.filter((r) => r.status === "archived").length}
              </p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-4 flex items-center gap-3">
              <FaSearch className="text-slate-400" />
              <input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, product, or location"
                className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <label className="flex flex-col gap-2 bg-white rounded-3xl border border-slate-200 p-4">
              <span className="text-sm font-medium text-slate-600">Product</span>
              <select
                value={selectedProduct}
                onChange={(e) => handleFilterChange(setSelectedProduct)(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 focus:border-slate-400 focus:outline-none"
              >
                {productOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 bg-white rounded-3xl border border-slate-200 p-4">
              <span className="text-sm font-medium text-slate-600">Status</span>
              <select
                value={selectedStatus}
                onChange={(e) => handleFilterChange(setSelectedStatus)(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 focus:border-slate-400 focus:outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* REPORT LIST */}
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
                      <p className="text-lg sm:text-xl font-semibold text-slate-900">
                        {item.product}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {item.name} • {item.location || "Unknown location"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Reported on: {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3">
                      {getStatusBadge(item.status)}
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
                <span className="min-w-[72px] text-center text-sm font-semibold text-slate-700">
                  {currentPage} / {totalPages}
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

export default AdminLostReport;