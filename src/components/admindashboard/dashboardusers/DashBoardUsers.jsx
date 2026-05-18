import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaUserPlus,
  FaUserCheck,
  FaTimes,
} from "react-icons/fa";

import {
  useGetAllUsersQuery,
    useDeleteuserMutation,
} from "../../../redux/UserApi";

function DashBoardUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ API
  const { data, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] =   useDeleteuserMutation();

  // ✅ SAFE DATA
  const users = data?.data || [];

  // ✅ DELETE USER
  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      refetch(); // refresh UI
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  // ✅ FILTER USERS
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = user?.name || "";
      const email = user?.email || "";

      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ STATS (REAL DATA)
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 md:pl-72">
        <div className="max-w-360 mx-auto">

          {/* HEADER */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                Users Management
              </h1>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Manage and view all registered users
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              <span>{users.length} total users</span>
            </div>
          </div>

          {/* STATS */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-6">

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Total Users</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.total}</p>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Active Users</p>
              <p className="mt-2 text-3xl font-semibold text-green-600">
                {stats.active}
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Inactive Users</p>
              <p className="mt-2 text-3xl font-semibold text-slate-600">
                {stats.inactive}
              </p>
            </div>

          </div>

          {/* SEARCH */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-10 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
          </div>

          {/* USERS LIST */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {isLoading ? (
              <div className="p-10 text-center text-slate-500">Loading users...</div>
            ) : paginatedUsers.length === 0 ? (
              <div className="p-10 text-center text-slate-500">No users found</div>
            ) : (
              <div className="divide-y divide-slate-200">
                {paginatedUsers.map((user) => (
                  <article
                    key={user._id}
                    className="p-5 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-lg sm:text-xl font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {user.email}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Joined on: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                        aria-label="Delete user"
                      >
                        <FaTimes />
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
                Showing {paginatedUsers.length} of {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaChevronLeft />
                </button>
                <span className="min-w-18 text-center text-sm font-semibold text-slate-700">
                  {currentPage} / {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
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

export default DashBoardUsers;