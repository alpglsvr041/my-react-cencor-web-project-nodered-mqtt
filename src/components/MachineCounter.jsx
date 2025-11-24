import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

// MQTT WebSocket sunucusu adresi
const MQTT_BROKER = "ws://127.0.0.1:1884";

// Eğer başka cihazdaysa IP'ni yaz, örn: "ws://10.10.81.157:1884"
const MQTT_OPTIONS = {
  keepalive: 60,
  reconnectPeriod: 1000,
  clientId: "ReactClient_" + Math.random().toString(16).substr(2, 8),
};



const TOPIC_RUNTIME = "makine/sure";          // 🔧 Node-RED'deki MQTT out topic adı
const TOPIC_STATUS = "makine/durum";          // 🔧 opsiyonel (start/stop)

function MachineCounter() {
  const [runtime, setRuntime] = useState(0);
  const [status, setStatus] = useState("Duruyor");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER);

    client.on("connect", () => {
      console.log("✅ MQTT'ye bağlandı:", MQTT_BROKER);
      setConnected(true);
      client.subscribe(TOPIC_RUNTIME);
      client.subscribe(TOPIC_STATUS);
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();
      if (topic === TOPIC_RUNTIME) {
        const value = parseFloat(payload);
        if (!isNaN(value)) setRuntime(value);
      }
      if (topic === TOPIC_STATUS) {
        if (payload === "start") setStatus("Çalışıyor");
        else if (payload === "stop") setStatus("Durdu");
      }
    });

    client.on("error", (err) => {
      console.error("❌ MQTT bağlantı hatası:", err);
      setConnected(false);
    });

    return () => client.end();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 text-center w-60">
      <h2 className="text-lg font-semibold mb-2">Makine Durumu</h2>
      <p
        className={`font-bold ${
          connected
            ? status === "Çalışıyor"
              ? "text-green-600"
              : "text-red-600"
            : "text-gray-400"
        }`}
      >
        {connected ? status : "Bağlanıyor..."}
      </p>
      <p className="mt-2 text-gray-700">Toplam Süre:</p>
      <h3 className="text-2xl font-bold">{runtime.toFixed(1)} sn</h3>
    </div>
  );
}

export default MachineCounter;
