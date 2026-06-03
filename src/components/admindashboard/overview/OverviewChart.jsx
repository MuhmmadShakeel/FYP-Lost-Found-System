import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useGetAllClaimsQuery } from "../../../redux/ClaimApi";
import { useGetAllReturnsQuery } from "../../../redux/ReturnApi";
import { useGetAllFoundPostsQuery } from "../../../redux/FoundPost";
import { useGetAllLostPostsQuery } from "../../../redux/LostPost";

function OverviewChart() {
  // ================= APIs =================
  const { data: claimsData, isLoading: claimsLoading } = useGetAllClaimsQuery();
  const { data: returnsData, isLoading: returnsLoading } = useGetAllReturnsQuery();
  const { data: foundData, isLoading: foundLoading } = useGetAllFoundPostsQuery();
  const { data: lostData, isLoading: lostLoading } = useGetAllLostPostsQuery();

  // ================= CALCULATE REAL DATA =================
  const claims = claimsData?.data || claimsData?.claimInfo || [];
  const returns = returnsData?.data || [];
  const foundItems = foundData?.data || foundData?.foundPosts || [];
  const lostItems = lostData?.data || lostData?.lostPosts || [];

  const totalClaims = claims.length;
  const totalReturns = returns.length;
  const totalFound = foundItems.length;
  const totalLost = lostItems.length;

  // ================= PIE CHART DATA =================
  const pieData = [
    { name: "Lost Items", value: totalLost },
    { name: "Found Items", value: totalFound },
    { name: "Claims", value: totalClaims },
    { name: "Returns", value: totalReturns },
  ];

  // ================= BAR CHART DATA =================
  const barData = [
    { name: "Lost", count: totalLost, fill: "#3B82F6" },
    { name: "Found", count: totalFound, fill: "#10B981" },
    { name: "Claimed", count: totalClaims, fill: "#F59E0B" },
    { name: "Returned", count: totalReturns, fill: "#8B5CF6" },
  ];

  // ================= LINE CHART DATA (by status) =================
  const lineData = [
    { 
      category: "Lost", 
      items: totalLost, 
      percentage: Math.round((totalLost / (totalLost + totalFound + totalClaims + totalReturns)) * 100) || 0 
    },
    { 
      category: "Found", 
      items: totalFound, 
      percentage: Math.round((totalFound / (totalLost + totalFound + totalClaims + totalReturns)) * 100) || 0 
    },
    { 
      category: "Claimed", 
      items: totalClaims, 
      percentage: Math.round((totalClaims / (totalLost + totalFound + totalClaims + totalReturns)) * 100) || 0 
    },
    { 
      category: "Returned", 
      items: totalReturns, 
      percentage: Math.round((totalReturns / (totalLost + totalFound + totalClaims + totalReturns)) * 100) || 0 
    },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

  // ================= LOADING STATE =================
  if (claimsLoading || returnsLoading || foundLoading || lostLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 lg:ml-[20px] px-4 sm:px-6 lg:px-8 pb-10">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 h-96 animate-pulse"
              >
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 lg:ml-[20px] px-4 sm:px-6 lg:px-8 pb-10">
      {/* WRAPPER */}
      <div className="w-full max-w-[1400px] mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Dashboard Analytics
          </h1>
          <p className="text-slate-600 mt-2">
            Real-time system statistics and insights
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* PIE CHART - DISTRIBUTION */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all duration-300">
            {/* TOP */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Items Distribution
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Lost, Found, Claimed & Returned items breakdown
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{totalLost}</p>
                  <p className="text-xs text-blue-500">Lost</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{totalFound}</p>
                  <p className="text-xs text-green-500">Found</p>
                </div>
                <div className="text-center p-2 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">{totalClaims}</p>
                  <p className="text-xs text-amber-500">Claimed</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{totalReturns}</p>
                  <p className="text-xs text-purple-500">Returned</p>
                </div>
              </div>
            </div>

            {/* CHART */}
            <div className="w-full h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value} items`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BAR CHART - COMPARISON */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all duration-300">
            {/* TOP */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Items Comparison
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Side-by-side comparison of all item categories
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                  <p className="font-bold text-slate-900">{totalLost}</p>
                  <p className="text-slate-500">Lost Items</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border-l-4 border-green-500">
                  <p className="font-bold text-slate-900">{totalFound}</p>
                  <p className="text-slate-500">Found Items</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border-l-4 border-amber-500">
                  <p className="font-bold text-slate-900">{totalClaims}</p>
                  <p className="text-slate-500">Claims</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border-l-4 border-purple-500">
                  <p className="font-bold text-slate-900">{totalReturns}</p>
                  <p className="text-slate-500">Returns</p>
                </div>
              </div>
            </div>

            {/* CHART */}
            <div className="w-full h-[300px] sm:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value) => `${value} items`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LINE CHART - PERCENTAGE DISTRIBUTION */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all duration-300 xl:col-span-2">
            {/* TOP */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                System Overview
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Percentage distribution and item count across all categories
              </p>

              {/* STATS GRID */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {lineData.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-gray-200 bg-gradient-to-br hover:shadow-md transition"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${COLORS[index]}15, ${COLORS[index]}05)`,
                      borderLeftWidth: "4px",
                      borderLeftColor: COLORS[index],
                    }}
                  >
                    <p className="text-2xl font-bold text-slate-900">{item.percentage}%</p>
                    <p className="text-xs text-slate-600 mt-1">{item.category}</p>
                    <p className="text-sm font-semibold text-slate-800">{item.items} items</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CHART */}
            <div className="w-full h-[280px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: "Items", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: "Percentage (%)", angle: 90, position: "insideRight" }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => {
                      if (name === "items") return `${value} items`;
                      return `${value}%`;
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="items"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#3B82F6" }}
                    activeDot={{ r: 7 }}
                    name="Items Count"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="percentage"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#8B5CF6" }}
                    activeDot={{ r: 7 }}
                    name="Percentage (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all duration-300 xl:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Quick Summary
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* TOTAL ITEMS */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold">Total Items</p>
                    <p className="text-3xl font-bold text-blue-900 mt-2">
                      {totalLost + totalFound + totalClaims + totalReturns}
                    </p>
                  </div>
                  <div className="text-4xl text-blue-300">📦</div>
                </div>
              </div>

              {/* RESOLUTION RATE */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-semibold">Resolution Rate</p>
                    <p className="text-3xl font-bold text-green-900 mt-2">
                      {totalLost > 0 ? Math.round(((totalClaims + totalReturns) / totalLost) * 100) : 0}%
                    </p>
                  </div>
                  <div className="text-4xl text-green-300">✅</div>
                </div>
              </div>

              {/* PENDING ITEMS */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-600 font-semibold">Pending Items</p>
                    <p className="text-3xl font-bold text-amber-900 mt-2">
                      {totalLost - totalClaims - totalReturns}
                    </p>
                  </div>
                  <div className="text-4xl text-amber-300">⏳</div>
                </div>
              </div>

              {/* SUCCESS ITEMS */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-semibold">Success Cases</p>
                    <p className="text-3xl font-bold text-purple-900 mt-2">
                      {totalClaims + totalReturns}
                    </p>
                  </div>
                  <div className="text-4xl text-purple-300">🎉</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewChart;