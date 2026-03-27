import React, { useState, useMemo } from "react";
import { FaSearch, FaUser, FaEnvelope, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaUsers, FaUserPlus, FaUserCheck, FaTimes } from "react-icons/fa";

function DashBoardUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const users = [
    { id: 1, name: "Ali Khan", email: "ali.khan@example.com", joinDate: "2024-01-15", status: "active" },
    { id: 2, name: "Sara Ahmed", email: "sara.ahmed@example.com", joinDate: "2024-01-20", status: "active" },
    { id: 3, name: "Usman Tariq", email: "usman.tariq@example.com", joinDate: "2024-02-01", status: "active" },
    { id: 4, name: "Ayesha Malik", email: "ayesha.malik@example.com", joinDate: "2024-02-10", status: "inactive" },
    { id: 5, name: "Bilal Hassan", email: "bilal.hassan@example.com", joinDate: "2024-02-15", status: "active" },
    { id: 6, name: "Fatima Zahra", email: "fatima.zahra@example.com", joinDate: "2024-02-20", status: "active" },
    { id: 7, name: "Omar Farooq", email: "omar.farooq@example.com", joinDate: "2024-03-01", status: "inactive" },
    { id: 8, name: "Zara Ahmed", email: "zara.ahmed@example.com", joinDate: "2024-03-05", status: "active" },
    { id: 9, name: "Hassan Raza", email: "hassan.raza@example.com", joinDate: "2024-03-10", status: "active" }
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 lg:pl-72">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Users Management</h1>
                <p className="text-slate-500 mt-1 text-sm">Manage and view all registered users</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <FaUsers className="text-blue-500 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Active Users</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <FaUserCheck className="text-emerald-500 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Inactive Users</p>
                  <p className="text-3xl font-bold text-slate-600 mt-1">{stats.inactive}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <FaUserPlus className="text-slate-500 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <FaTimes size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Users Grid */}
          {paginatedUsers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedUsers.map((user) => (
                  <div key={user.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200 group">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xl">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 text-lg truncate">{user.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <FaEnvelope className="text-slate-400 text-xs flex-shrink-0" />
                            <p className="text-slate-500 text-sm truncate">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <FaCalendarAlt className="text-slate-400 text-xs" />
                            <p className="text-slate-400 text-xs">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
                          </div>
                          <div className="mt-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "active" 
                                ? "bg-emerald-50 text-emerald-700" 
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {user.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <div className="text-xs text-slate-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
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
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-slate-400 text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-1">No users found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardUsers;