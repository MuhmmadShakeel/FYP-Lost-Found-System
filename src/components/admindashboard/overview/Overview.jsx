import React from "react";
import {
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaStar,
} from "react-icons/fa";

import { useGetAllFoundPostsQuery } from "../../../redux/FoundPost";
import { useGetAllLostPostsQuery } from "../../../redux/LostPost";
import { useGetAllUsersQuery } from "../../../redux/UserApi";
import { useGetAllReviewsQuery } from "../../../redux/Reviews";

function Overview() {

  // ================= API =================
  const { data: usersData, isLoading: usersLoading } =
    useGetAllUsersQuery();

  const { data: lostData, isLoading: lostLoading } =
    useGetAllLostPostsQuery();

  const { data: foundData, isLoading: foundLoading } =
    useGetAllFoundPostsQuery();

  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetAllReviewsQuery();

  // ================= COUNTS =================
  const totalUsers =
    usersData?.data?.length || usersData?.length || 0;

  const lostReports =
    lostData?.data?.length || lostData?.length || 0;

  const foundReports =
    foundData?.data?.length || foundData?.length || 0;

  const reviews =
    reviewsData?.reviews?.length ||
    reviewsData?.data?.length ||
    reviewsData?.length ||
    0;

  const isLoading =
    usersLoading ||
    lostLoading ||
    foundLoading ||
    reviewsLoading;

  // ================= STATS =================
  const stats = [
    {
      title: "Total Users",
      value: usersLoading ? "..." : totalUsers,
      icon: <FaUsers />,
      color:
        "bg-blue-50 text-blue-600 border border-blue-100",
    },

    {
      title: "Lost Reports",
      value: lostLoading ? "..." : lostReports,
      icon: <FaSearch />,
      color:
        "bg-red-50 text-red-600 border border-red-100",
    },

    {
      title: "Found Reports",
      value: foundLoading ? "..." : foundReports,
      icon: <FaBoxOpen />,
      color:
        "bg-green-50 text-green-600 border border-green-100",
    },

    {
      title: "Reviews",
      value: reviewsLoading ? "..." : reviews,
      icon: <FaStar />,
      color:
        "bg-yellow-50 text-yellow-600 border border-yellow-100",
    },
  ];

  // ================= ACTIVITIES =================
  const activities = [
    {
      user: "Ali Khan",
      action: "Reported Lost Wallet",
      date: "12 Mar 2026",
    },

    {
      user: "Sara Ahmed",
      action: "Found Mobile Phone",
      date: "11 Mar 2026",
    },

    {
      user: "Usman Tariq",
      action: "Registered Account",
      date: "10 Mar 2026",
    },

    {
      user: "Ayesha Malik",
      action: "Submitted Review",
      date: "9 Mar 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FB] lg:ml-[20px] pt-[90px] px-4 sm:px-6 lg:px-8 pb-8">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-[1400px] mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isLoading
                ? "Loading platform analytics..."
                : "Real-time analytics of your platform"}
            </p>
          </div>

          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer w-full sm:w-auto">
            Generate Report
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500 font-medium">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-extrabold text-[#0F172A] mt-2">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${item.color}`}
                >
                  {item.icon}
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">

          {/* TOP */}
          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                Recent Activity
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest updates from your platform
              </p>

            </div>

            <button className="text-[#2563EB] text-sm font-semibold hover:underline cursor-pointer">
              View All
            </button>

          </div>

          {/* MOBILE CARDS */}
          <div className="flex flex-col gap-4 lg:hidden">

            {activities.map((item, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all duration-300"
              >

                <div className="flex items-center justify-between mb-2">

                  <h3 className="font-semibold text-[#0F172A]">
                    {item.user}
                  </h3>

                  <span className="text-xs text-gray-400">
                    {item.date}
                  </span>

                </div>

                <p className="text-sm text-gray-600">
                  {item.action}
                </p>

              </div>
            ))}

          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden lg:block overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-100">

                  <th className="text-left py-4 text-sm font-semibold text-gray-500">
                    User
                  </th>

                  <th className="text-left py-4 text-sm font-semibold text-gray-500">
                    Activity
                  </th>

                  <th className="text-left py-4 text-sm font-semibold text-gray-500">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {activities.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-300"
                  >

                    <td className="py-5 font-semibold text-[#0F172A]">
                      {item.user}
                    </td>

                    <td className="py-5 text-gray-600">
                      {item.action}
                    </td>

                    <td className="py-5 text-sm text-gray-500">
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