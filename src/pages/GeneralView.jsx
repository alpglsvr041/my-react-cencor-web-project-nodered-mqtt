import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import mqtt from "mqtt";
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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function GeneralView() {
  const [runtime, setRuntime] = useState(0);
  const [status, setStatus] = useState("Duruyor");

  useEffect(() => {
    const MQTT_BROKER = "ws://localhost:1884";
    const MQTT_OPTIONS = {
      keepalive: 60,
      reconnectPeriod: 2000,
      clientId: "ReactClient_" + Math.random().toString(16).substring(2, 8),
    };

    const TOPIC_RUNTIME = "makine/runtime";
    const TOPIC_STATUS = "makine/status";

    const client = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);

    client.on("connect", () => {
      console.log("✅ MQTT bağlantısı kuruldu:", MQTT_BROKER);
      client.subscribe([TOPIC_RUNTIME, TOPIC_STATUS]);
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();
      if (topic === TOPIC_RUNTIME) setRuntime(Number(parseFloat(payload).toFixed(1)));
      if (topic === TOPIC_STATUS) {
        if (payload === "start") setStatus("Çalışıyor");
        else if (payload === "stop") setStatus("Duruyor");
      }
    });

    client.on("error", (err) => {
      console.error("❌ MQTT Hatası:", err);
    });

    return () => client.end();
  }, []);

  // ⏱ Sayaç artışı (makine çalışıyorsa)
  useEffect(() => {
    let interval;
    if (status === "Çalışıyor") {
      interval = setInterval(() => {
        setRuntime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [status]);

  const temperatureData = {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00"],
    datasets: [
      {
        label: "Sıcaklık (°C)",
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
        label: "Nem (%RH)",
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

  const percentage = Math.min(runtime % 100, 100);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sistem Odası İzleme Paneli</h1>

      {/* Sayaç Kartı */}
      <div className="flex justify-center gap-8 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center w-44">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={percentage}
              text={`${runtime}s`}
              styles={buildStyles({
                textColor: status === "Çalışıyor" ? "#22c55e" : "#ef4444",
                pathColor: status === "Çalışıyor" ? "#22c55e" : "#ef4444",
                trailColor: "#e5e7eb",
              })}
            />
          </div>
          <h3
            className={`mt-2 font-semibold ${
              status === "Çalışıyor" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </h3>
        </div>
      </div>

      {/* Grafikler */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Sıcaklık Grafiği</h2>
        <Line data={temperatureData} options={options} />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Nem Grafiği</h2>
        <Line data={humidityData} options={options} />
      </div>
    </div>
  );
}

export default GeneralView;
