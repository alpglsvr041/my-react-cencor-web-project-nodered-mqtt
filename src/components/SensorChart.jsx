const chartData = {
  labels: data.map((d) =>
    new Date(d.Zaman || d.Tarih).toLocaleString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit"
    })
  ),
  datasets: [
    {
      label: "Sıcaklık (°C)",
      data: data.map((d) => d.Sicaklik),
      borderColor: "red",
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      fill: true,
      tension: 0.3,
      showLine: true,
      pointRadius: 2,
    },
    {
      label: "Nem (%)",
      data: data.map((d) => d.Nem),
      borderColor: "blue",
      backgroundColor: "rgba(54, 162, 235, 0.3)",
      fill: true,
      tension: 0.3,
      showLine: true,
      pointRadius: 2,
    },
  ],
};
