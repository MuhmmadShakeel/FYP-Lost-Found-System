import React, { useState, useMemo } from "react";
import { 
  FaEdit, FaTrash, FaSearch, FaFilter, FaTimes, FaBox, 
  FaEnvelope, FaUser, FaCalendarAlt, FaChevronLeft, 
  FaChevronRight, FaEye, FaCheckCircle, FaClock, FaMapMarkerAlt
} from "react-icons/fa";

function AdminFoundReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const reports = [
    { 
      id: 1, 
      name: "Ahmed Raza", 
      email: "ahmed@example.com", 
      item: "iPhone 14", 
      category: "Electronics",
      date: "2024-03-15", 
      status: "pending", 
      location: "City Mall Food Court"
    },
    { 
      id: 2, 
      name: "Fatima Khan", 
      email: "fatima@example.com", 
      item: "Car Keys", 
      category: "Keys",
      date: "2024-03-14", 
      status: "claimed", 
      location: "Central Park Entrance"
    },
    { 
      id: 3, 
      name: "Omar Farooq", 
      email: "omar@example.com", 
      item: "Wallet", 
      category: "Accessories",
      date: "2024-03-13", 
      status: "resolved", 
      location: "Bus Stop #12"
    },
    { 
      id: 4, 
      name: "Zara Ahmed", 
      email: "zara@example.com", 
      item: "Laptop Bag", 
      category: "Bags",
      date: "2024-03-12", 
      status: "pending", 
      location: "University Library"
    },
    { 
      id: 5, 
      name: "Hassan Ali", 
      email: "hassan@example.com", 
      item: "Sunglasses", 
      category: "Accessories",
      date: "2024-03-11", 
      status: "archived", 
      location: "Beach Side Cafe"
    },
    { 
      id: 6, 
      name: "Amina Sheikh", 
      email: "amina@example.com", 
      item: "Water Bottle", 
      category: "Sports",
      date: "2024-03-10", 
      status: "claimed", 
      location: "Gymnasium"
    }
  ];

  const categoryOptions = ["All Categories", "Electronics", "Keys", "Accessories", "Bags", "Sports"];
  const statusOptions = ["All Status", "pending", "claimed", "resolved", "archived"];

  const filteredReports = useMemo(() => {
    let filtered = reports.filter((report) => {
      const matchesSearch = 
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (report.location && report.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All Categories" || report.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || report.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
    
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, selectedCategory, selectedStatus]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "claimed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            <FaCheckCircle size={10} />
            Claimed
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FaCheckCircle size={10} />
            Resolved
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <FaClock size={10} />
            Archived
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <FaClock size={10} />
            Pending
          </span>
        );
    }
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    claimed: reports.filter(r => r.status === "claimed").length,
    resolved: reports.filter(r => r.status === "resolved").length,
    archived: reports.filter(r => r.status === "archived").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 lg:pl-72">
        <div className="w-full max-w-[1440px] mx-auto">
          
          {/* Header with Stats */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Found Reports</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage and track all found item reports from users</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Total</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FaBox className="text-blue-500 text-lg" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Pending</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</p>
                  </div>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                    <FaClock className="text-amber-500 text-lg" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Claimed</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">{stats.claimed}</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-purple-500 text-lg" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Resolved</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.resolved}</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <FaCheckCircle className="text-emerald-500 text-lg" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Archived</p>
                    <p className="text-2xl font-bold text-slate-600 mt-1">{stats.archived}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <FaEye className="text-slate-500 text-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search by name, email, item, category, or location..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <FaTimes size={12} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                >
                  <FaFilter size={12} />
                  <span className="text-sm">Filters</span>
                </button>
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex gap-3`}>
                  <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                    className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt} value={opt}>
                        {opt === "All Status" ? opt : opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Table - Desktop View */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hidden lg:block">
            <div className="grid grid-cols-6 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Item</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reporter</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</div>
            </div>
            <div className="divide-y divide-slate-100">
              {paginatedReports.length > 0 ? (
                paginatedReports.map((item) => (
                  <div key={item.id} className="grid grid-cols-6 px-6 py-4 items-center hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaBox className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{item.item}</p>
                        <p className="text-xs text-slate-400">{item.category}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt size={8} /> {item.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser className="text-slate-400 text-xs" />
                      <span className="text-slate-700 text-sm">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-slate-400 text-xs" />
                      <span className="text-slate-500 text-sm truncate">{item.email}</span>
                    </div>
                    <div>{getStatusBadge(item.status)}</div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-slate-400 text-xs" />
                      <span className="text-slate-500 text-sm">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <FaEdit size={14} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="bg-slate-50 rounded-full p-4 mb-4">
                    <FaSearch className="text-slate-300 text-3xl" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 mb-1">No found reports</h3>
                  <p className="text-slate-400 text-sm">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>
          </div>

          {/* Reports Cards - Mobile/Tablet View */}
          <div className="lg:hidden space-y-3">
            {paginatedReports.length > 0 ? paginatedReports.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaBox className="text-blue-500 text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-800">{item.item}</h3>
                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{item.category}</span>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <FaUser className="text-slate-400 text-xs" />
                          <span className="text-slate-700">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaEnvelope className="text-slate-400 text-xs" />
                          <span className="text-slate-500 truncate">{item.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaMapMarkerAlt className="text-slate-400 text-xs" />
                          <span className="text-slate-500">{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FaCalendarAlt className="text-slate-400 text-xs" />
                          <span className="text-slate-500">{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-slate-100">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <FaEdit size={12} /> Edit
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                      <FaTrash size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <FaSearch className="text-slate-300 text-4xl mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-800">No reports found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredReports.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-xs text-slate-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                >
                  <FaChevronLeft size={12} />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                >
                  <FaChevronRight size={12} />
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