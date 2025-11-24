import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function GaugeCard({ title, value, unit, color }) {
  // Maksimum değeri 100'e göre normalize et
  const percentage = Math.min((value / 100) * 100, 100);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-56 text-center hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${value.toFixed(1)} ${unit}`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#374151",
            trailColor: "#E5E7EB",
            textSize: "14px",
          })}
        />
      </div>
    </div>
  );
}

export default GaugeCard;
