import React from "react";
import {
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaStar
} from "react-icons/fa";

function Overview() {

  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <FaUsers />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Lost Reports",
      value: "320",
      icon: <FaSearch />,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Found Reports",
      value: "210",
      icon: <FaBoxOpen />,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Reviews",
      value: "540",
      icon: <FaStar />,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  const activities = [
    { user: "Ali Khan", action: "Reported Lost Wallet", date: "12 Mar 2026" },
    { user: "Sara Ahmed", action: "Found Mobile Phone", date: "11 Mar 2026" },
    { user: "Usman Tariq", action: "Registered Account", date: "10 Mar 2026" },
    { user: "Ayesha Malik", action: "Submitted Review", date: "9 Mar 2026" }
  ];

  return (
    <div className="min-h-screen ml-10 lg:ml-72 pt-20 px-3 sm:px-6 lg:px-10">

      <div className="w-full space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Welcome back! Here's what's happening in your system.
            </p>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition">
            Generate Report
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 sm:p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {item.title}
                </p>

                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </h3>
              </div>

              <div className={`p-3 sm:p-4 rounded-lg text-lg sm:text-xl ${item.color}`}>
                {item.icon}
              </div>
            </div>
          ))}

        </div>

        {/* ACTIVITY SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">
              Recent Activity
            </h3>

            <button className="text-xs sm:text-sm text-blue-600 hover:underline">
              View All
            </button>
          </div>

          {/* ✅ MOBILE VIEW (CARDS) */}
          <div className="block sm:hidden space-y-3">
            {activities.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 shadow-sm"
              >
                <p className="font-semibold text-gray-800 text-sm">
                  {item.user}
                </p>
                <p className="text-gray-600 text-xs">
                  {item.action}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {item.date}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ DESKTOP TABLE */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="py-3">User</th>
                  <th className="py-3">Activity</th>
                  <th className="py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {activities.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium text-gray-800">
                      {item.user}
                    </td>

                    <td className="py-4 text-gray-600">
                      {item.action}
                    </td>

                    <td className="py-4 text-gray-500 text-sm">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Overview;