import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartPanel = ({ data, isDarkMode }) => {
  const bgColor = isDarkMode ? "#1E293B" : "#FFFFFF";
  const textColor = isDarkMode ? "#E2E8F0" : "#1E293B";
  const gridColor = isDarkMode ? "#475569" : "#CBD5E1";

  return (
    <div
      className="p-4 rounded-2xl shadow-md transition-all duration-300"
      style={{
        backgroundColor: bgColor,
        padding: "1rem",
        borderRadius: "1rem",
        transition: "all 0.3s ease",
      }}
    >
      <h2
        className="text-center font-semibold mb-3"
        style={{
          color: textColor,
          textAlign: "center",
          fontSize: "1.2rem",
          marginBottom: "1rem",
        }}
      >
        🌡️ Sıcaklık ve Nem Grafiği
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
          <XAxis dataKey="Tarih" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF",
              color: textColor,
              borderRadius: "10px",
              border: "none",
            }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
          <Line type="monotone" dataKey="Sıcaklık" stroke="#EF4444" />
          <Line type="monotone" dataKey="Nem" stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPanel;
