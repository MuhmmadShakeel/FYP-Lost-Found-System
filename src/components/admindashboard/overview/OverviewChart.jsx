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
  Legend
} from "recharts";

function OverviewChart() {

  const pieData = [
    { name: "Lost Items", value: 320 },
    { name: "Found Items", value: 210 },
    { name: "Pending", value: 90 }
  ];

  const lineData = [
    { month: "Jan", reports: 40 },
    { month: "Feb", reports: 65 },
    { month: "Mar", reports: 90 },
    { month: "Apr", reports: 75 },
    { month: "May", reports: 110 },
    { month: "Jun", reports: 140 }
  ];

  const COLORS = ["#203C8B", "#22C55E", "#F59E0B"];

  return (
    <div className="min-h-screen pt-20 px-3 sm:px-6 lg:px-10 lg:pl-80">

      {/* CENTERED WRAPPER (IMPORTANT FOR LAPTOP) */}
      <div className="w-full max-w-7xl mx-auto">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mt-4">

          {/* PIE CHART */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 sm:p-6">

            <div className="mb-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                Reports Distribution
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Lost vs Found item statistics
              </p>
            </div>

            <div className="w-full h-[220px] sm:h-[280px] lg:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* LINE CHART */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 sm:p-6">

            <div className="mb-5">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                Monthly Reports
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Lost & Found activity overview
              </p>
            </div>

            <div className="w-full h-[220px] sm:h-[280px] lg:h-[340px]">
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
                    stroke="#203C8B"
                    strokeWidth={3}
                    dot={{ r: 4 }}
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