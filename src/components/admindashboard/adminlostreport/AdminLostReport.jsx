import React, { useState, useMemo } from "react";
import { 
  FaEdit, FaTrash, FaSearch, FaFilter, FaTimes, FaBox, 
  FaEnvelope, FaUser, FaCalendarAlt, FaChevronLeft, 
  FaChevronRight, FaEye, FaCheckCircle, FaClock
} from "react-icons/fa";

function AdminLostReport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const reports = [
    { id: 1, name: "Ali Khan", email: "ali@example.com", product: "Wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop", date: "2024-03-15", status: "pending", location: "Central Park" },
    { id: 2, name: "Sara Ahmed", email: "sara@example.com", product: "Mobile Phone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop", date: "2024-03-14", status: "pending", location: "Shopping Mall" },
    { id: 3, name: "Usman Tariq", email: "usman@example.com", product: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop", date: "2024-03-13", status: "resolved", location: "Coffee Shop" },
    { id: 4, name: "Ayesha Malik", email: "ayesha@example.com", product: "Bag", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop", date: "2024-03-12", status: "pending", location: "University" },
    { id: 5, name: "Bilal Hassan", email: "bilal@example.com", product: "Wallet", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop", date: "2024-03-11", status: "archived", location: "Bus Station" },
    { id: 6, name: "Fatima Zahra", email: "fatima@example.com", product: "Keys", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop", date: "2024-03-10", status: "pending", location: "Gym" }
  ];

  const productOptions = ["All Products", "Wallet", "Mobile Phone", "Laptop", "Bag", "Keys", "Documents"];
  const statusOptions = ["All Status", "pending", "resolved", "archived"];

  const filteredReports = useMemo(() => {
    let filtered = reports.filter((report) => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (report.location && report.location.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesProduct = selectedProduct === "All Products" || report.product === selectedProduct;
      const matchesStatus = selectedStatus === "All Status" || report.status === selectedStatus;
      return matchesSearch && matchesProduct && matchesStatus;
    });
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, selectedProduct, selectedStatus]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status) => {
    if (status === "resolved") return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700"><FaCheckCircle size={10} />Resolved</span>;
    if (status === "archived") return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"><FaClock size={10} />Archived</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700"><FaClock size={10} />Pending</span>;
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    resolved: reports.filter(r => r.status === "resolved").length,
    archived: reports.filter(r => r.status === "archived").length
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 lg:pl-72">
        <div className="w-full max-w-[1440px] mx-auto">
          
          {/* Header with Stats */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Lost Reports</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage and track all lost item reports</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-slate-500 font-medium">Total</p><p className="text-2xl font-bold text-slate-800">{stats.total}</p></div>
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><FaBox className="text-blue-500" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-slate-500 font-medium">Pending</p><p className="text-2xl font-bold text-amber-600">{stats.pending}</p></div>
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center"><FaClock className="text-amber-500" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-slate-500 font-medium">Resolved</p><p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p></div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center"><FaCheckCircle className="text-emerald-500" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs text-slate-500 font-medium">Archived</p><p className="text-2xl font-bold text-slate-600">{stats.archived}</p></div>
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center"><FaEye className="text-slate-500" /></div>
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
                  <input type="text" placeholder="Search by name, email, product, or location..." value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                  {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"><FaTimes size={12} /></button>}
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border rounded-lg">
                  <FaFilter size={12} /><span>Filters</span>
                </button>
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex gap-3`}>
                  <select value={selectedProduct} onChange={(e) => { setSelectedProduct(e.target.value); setCurrentPage(1); }}
                    className="px-3 py-2.5 bg-slate-50 border rounded-lg text-sm cursor-pointer">
                    {productOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                    className="px-3 py-2.5 bg-slate-50 border rounded-lg text-sm cursor-pointer">
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt === "All Status" ? opt : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="hidden md:grid grid-cols-6 bg-slate-50 border-b px-6 py-3 text-xs font-semibold text-slate-500">
              <div>Item</div><div>Reporter</div><div>Contact</div><div>Status</div><div>Date</div><div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {paginatedReports.length > 0 ? paginatedReports.map((item) => (
                <div key={item.id} className="group hover:bg-slate-50 transition">
                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-6 px-6 py-4 items-center">
                    <div className="flex items-center gap-3">
                      <img src={item.image || "https://via.placeholder.com/40"} alt={item.product} className="w-10 h-10 rounded-lg object-cover border" />
                      <div><p className="font-medium text-slate-800 text-sm">{item.product}</p>{item.location && <p className="text-xs text-slate-400">{item.location}</p>}</div>
                    </div>
                    <div className="flex items-center gap-2"><FaUser className="text-slate-400 text-xs" /><span className="text-slate-700 text-sm">{item.name}</span></div>
                    <div className="flex items-center gap-2"><FaEnvelope className="text-slate-400 text-xs" /><span className="text-slate-500 text-sm truncate">{item.email}</span></div>
                    <div>{getStatusBadge(item.status)}</div>
                    <div className="flex items-center gap-2"><FaCalendarAlt className="text-slate-400 text-xs" /><span className="text-slate-500 text-sm">{new Date(item.date).toLocaleDateString()}</span></div>
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaEdit size={14} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FaTrash size={14} /></button>
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="md:hidden ml-14 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <img src={item.image || "https://via.placeholder.com/50"} alt={item.product} className="w-12 h-12 rounded-lg object-cover border" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div><h3 className="font-semibold text-slate-800">{item.name}</h3><p className="text-xs text-slate-400">{item.email}</p></div>
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="flex items-center gap-2 text-sm"><FaBox className="text-slate-400" />{item.product}</p>
                          {item.location && <p className="flex items-center gap-2 text-xs text-slate-500">📍 {item.location}</p>}
                          <p className="flex items-center gap-2 text-xs text-slate-500"><FaCalendarAlt />{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"><FaEdit size={12} />Edit</button>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg"><FaTrash size={12} />Delete</button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="bg-slate-50 rounded-full p-4 mb-4"><FaSearch className="text-slate-300 text-3xl" /></div>
                  <h3 className="text-lg font-medium text-slate-800">No reports found</h3>
                  <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
                  {(searchTerm || selectedProduct !== "All Products" || selectedStatus !== "All Status") && (
                    <button onClick={() => { setSearchTerm(""); setSelectedProduct("All Products"); setSelectedStatus("All Status"); setCurrentPage(1); }}
                      className="mt-4 text-blue-600 text-sm font-medium">Clear all filters</button>
                  )}
                </div>
              )}
            </div>
            {filteredReports.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t">
                <div className="text-xs text-slate-500">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length}</div>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border bg-white disabled:opacity-50"><FaChevronLeft size={12} /></button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                    return <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 rounded-lg text-sm ${currentPage === pageNum ? "bg-blue-500 text-white" : "bg-white border"}`}>{pageNum}</button>;
                  })}
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border bg-white disabled:opacity-50"><FaChevronRight size={12} /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLostReport;