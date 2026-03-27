import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useInView } from "react-intersection-observer";

// Example static data for review ratings
const initialData = [
  { rating: "5⭐", count: 12 },
  { rating: "4⭐", count: 8 },
  { rating: "3⭐", count: 4 },
  { rating: "2⭐", count: 2 },
  { rating: "1⭐", count: 1 },
];

function ReviewsGraph() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animatedData, setAnimatedData] = useState(
    initialData.map((item) => ({ ...item, current: 0 }))
  );

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setAnimatedData((prev) => {
        let allComplete = true;

        const newData = prev.map((item, index) => {
          if (item.current < initialData[index].count) {
            allComplete = false;
            return {
              ...item,
              current: Math.min(item.current + 1, initialData[index].count),
            };
          }
          return item;
        });

        if (allComplete) clearInterval(interval);
        return newData;
      });
    }, 100); // update every 100ms

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="w-full max-w-xs bg-white p-5 rounded-2xl shadow-2xl hover:shadow-xl transition duration-300"
    >
      <h3 className="text-lg font-semibold text-[#1F3B8A] mb-4 text-center">
        Review Ratings
      </h3>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={animatedData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="rating"
            type="category"
            axisLine={false}
            tickLine={false}
            width={50}
            style={{ fontSize: 13, fill: "#1F3B8A", fontWeight: 500 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(31,59,138,0.1)" }}
            contentStyle={{
              fontSize: 13,
              borderRadius: 8,
              border: "none",
              padding: "6px 10px",
            }}
          />
          <Bar
            dataKey="current"
            fill="#1F3B8A"
            radius={[4, 4, 4, 4]}
            barSize={20}
            isAnimationActive={true}
            animationDuration={1000}
          >
            <LabelList
              dataKey="current"
              position="right"
              formatter={(value, index) => `${value}`}
              style={{
                fill: "#1F3B8A",
                fontWeight: 600,
                fontSize: 13,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReviewsGraph;
