import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MQTT_BROKER = "ws://172.20.10.11:1884"; // Node-RED WebSocket MQTT portu
const TOPIC_RUNTIME = "makine/runtime";
const TOPIC_STATUS = "makine/status";

function MachineGauge() {
  const [runtime, setRuntime] = useState(0);
  const [status, setStatus] = useState("Duruyor");

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("Makine gauge MQTT bağlı!");
      client.subscribe(TOPIC_RUNTIME);
      client.subscribe(TOPIC_STATUS);
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();
      if (topic === TOPIC_RUNTIME) {
        setRuntime(parseFloat(payload).toFixed(1));
      }
      if (topic === TOPIC_STATUS) {
        if (payload === "start") setStatus("Çalışıyor");
        else if (payload === "stop") setStatus("Durdu");
      }
    });

    return () => client.end();
  }, []);

  const percentage = Math.min((runtime % 100) || 0, 100); // görsel için max 100 döngü

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center justify-center w-52">
      <div className="w-28 h-28">
        <CircularProgressbar
          value={percentage}
          text={`${runtime}s`}
          styles={buildStyles({
            textColor: "#000",
            pathColor: status === "Çalışıyor" ? "#22c55e" : "#ef4444",
            trailColor: "#e5e7eb",
          })}
        />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-gray-700">Makine Süresi</h3>
      <p
        className={`font-bold ${
          status === "Çalışıyor" ? "text-green-600" : "text-red-600"
        }`}
      >
        {status}
      </p>
    </div>
  );
}

export default MachineGauge;
