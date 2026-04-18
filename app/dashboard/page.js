"use client";

import Sidebar from "../components/Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardLayout() {
  const stats = [
    { title: "Total Students", value: "10", bg: "bg-blue-500", text: "text-white" },
    { title: "Active Teachers", value: "2", bg: "bg-green-500", text: "text-white" },
    { title: "Attendance", value: "0%", bg: "bg-yellow-400", text: "text-white" },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Present",
        data: [20, 22, 18, 24, 19],
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue
        borderRadius: 6,
      },
      {
        label: "Absent",
        data: [2, 1, 4, 0, 3],
        backgroundColor: "rgba(239, 68, 68, 0.7)", // red
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#1e293b" } },
      title: { display: true, text: "Weekly Attendance", color: "#1e293b", font: { size: 18 } },
    },
    scales: {
      x: { ticks: { color: "#1e293b" } },
      y: { ticks: { color: "#1e293b" }, beginAtZero: true },
    },
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-100">
      <Sidebar />

    
      <main className="flex-1 p-8">
       
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
          <div className="bg-white px-5 py-2 rounded-full shadow-md border border-slate-200 text-slate-900 font-medium">
            Admin User
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} p-6 rounded-3xl shadow-lg flex flex-col justify-between`}
            >
              <p className={`text-sm font-medium ${stat.text}`}>{stat.title}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.text}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200">
          <Bar data={chartData} options={chartOptions} className="h-80" />
        </div>
      </main>
    </div>
  );
}