import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function GeneralView() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Test verileri
  const temperatureData = {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    datasets: [
      {
        label: "Sistem Odası Sıcaklık (°C)",
        data: [21.5, 22.1, 22.4, 22.0, 21.8],
        borderColor: "#f97316",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const humidityData = {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    datasets: [
      {
        label: "Sistem Odası Nem (%RH)",
        data: [55, 57, 54, 53, 56],
        borderColor: "#3b82f6",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Sistem Odası Sıcaklık ve Nem Görünümü
      </h1>

      {/* Sıcaklık Grafiği */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Sıcaklık Grafiği</h2>
        <Line data={temperatureData} options={options} />
      </div>

      {/* Nem Grafiği */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Nem Grafiği</h2>
        <Line data={humidityData} options={options} />
      </div>

      {/* Rapor Alanı */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Rapor</h2>

        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Başlangıç Tarih</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border rounded px-3 py-2 w-40"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Son Tarih</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border rounded px-3 py-2 w-40"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Filtrele
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700 text-left">
                <th className="p-2 border">Tarih</th>
                <th className="p-2 border">Konum</th>
                <th className="p-2 border">Sıcaklık</th>
                <th className="p-2 border">Nem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">31/10/2025</td>
                <td className="p-2 border">Sistem Odası</td>
                <td className="p-2 border">22.1 °C</td>
                <td className="p-2 border">55 %RH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GeneralView;



import MachineCounter from "../components/MachineCounter";


<div className="grid grid-cols-3 gap-6 mt-8">
  <ChartPanel data={temperatureData} title="Sıcaklık Grafiği" />
  <ChartPanel data={humidityData} title="Nem Grafiği" />
  <MachineCounter /> {/* Yeni eklenen sayaç kartı */}
</div>

