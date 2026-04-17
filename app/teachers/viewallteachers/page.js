"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();

  // Fetch all teachers
  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await fetch("/api/teachers");
        if (!res.ok) throw new Error("Failed to fetch teachers");
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, []);

  // Delete a teacher
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const res = await fetch(`/api/teachers?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete teacher");

      // Remove deleted teacher from state
      setTeachers(prev => prev.filter(t => t._id !== id));
      alert("✅ Teacher deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Teachers</h1>
        <button 
          onClick={() => router.push("/teachers/addteacher")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add New Teacher
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Subjects</th>
              <th className="p-4 font-semibold text-gray-700">Experience</th>
              <th className="p-4 font-semibold text-gray-700">Contact</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {teachers.length > 0 ? (
              teachers.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{t.name}</td>
                  <td className="p-4">{t.subjects?.join(", ") || "N/A"}</td>
                  <td className="p-4">{t.experience || 0} yrs</td>
                  <td className="p-4 text-sm text-gray-600">{t.contactInfo?.email || "N/A"}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => router.push(`/teachers/addteacher?id=${t._id}`)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}