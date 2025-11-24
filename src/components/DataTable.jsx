import React from "react";

function DataTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full text-sm text-center border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Tarih</th>
            <th className="px-4 py-2">Sıcaklık (°C)</th>
            <th className="px-4 py-2">Nem (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-4 text-gray-400">
                Veri bulunamadı
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="py-2 px-4 text-gray-700">{item.Tarih}</td>
                <td className="py-2 px-4 text-orange-600 font-semibold">
                  {item.Sicaklik}
                </td>
                <td className="py-2 px-4 text-blue-600 font-semibold">
                  {item.Nem}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
