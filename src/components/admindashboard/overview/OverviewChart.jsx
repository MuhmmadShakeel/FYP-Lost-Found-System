import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function OverviewChart() {

  const pieData = [
    { name: "Lost Items", value: 320 },
    { name: "Found Items", value: 210 },
    { name: "Pending", value: 90 },
  ];

  const lineData = [
    { month: "Jan", reports: 40 },
    { month: "Feb", reports: 65 },
    { month: "Mar", reports: 90 },
    { month: "Apr", reports: 75 },
    { month: "May", reports: 110 },
    { month: "Jun", reports: 140 },
  ];

  const COLORS = [
    "#2563EB",
    "#22C55E",
    "#F59E0B",
  ];

  return (
    <div className="bg-[#F5F7FB] lg:ml-[20px] px-4 sm:px-6 lg:px-8 pb-10">

      {/* WRAPPER */}
      <div className="w-full max-w-[1400px] mx-auto">

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* PIE CHART */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-300">

            {/* TOP */}
            <div className="mb-6">

              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                Reports Distribution
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Lost vs Found reports analytics
              </p>

            </div>

            {/* CHART */}
            <div className="w-full h-[280px] sm:h-[340px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="75%"
                    label
                  >

                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* LINE CHART */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-xl transition-all duration-300">

            {/* TOP */}
            <div className="mb-6">

              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                Monthly Reports
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Monthly lost & found activities
              </p>

            </div>

            {/* CHART */}
            <div className="w-full h-[280px] sm:h-[340px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={lineData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis
                    tick={{ fontSize: 12 }}
                  />

                  <Tooltip />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 7 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default OverviewChart;