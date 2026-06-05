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



  return (
    <>
      <div className="space-y-6">

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
        </div>

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

      </div>
    </>
  );
}

export default Overview;