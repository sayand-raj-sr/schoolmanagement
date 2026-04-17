"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Fetch all students from API
  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  // Delete a student
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`/api/students?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete student");

      // Remove deleted student from state
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setMessage("✅ Student deleted successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3s
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="text-center mt-10 text-lg">Loading students...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Students</h1>
        <button
          onClick={() => router.push("/students/addstudent")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Add New Student
        </button>
      </div>

      {message && (
        <div className="mb-4 text-center text-green-600 font-medium">{message}</div>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left border-collapse bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Name</th>
              <th className="p-4 font-semibold text-gray-700">Email</th>
              <th className="p-4 font-semibold text-gray-700">Phone</th>
              <th className="p-4 font-semibold text-gray-700">Class</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4 text-gray-600">{s.contactInfo?.email || "N/A"}</td>
                  <td className="p-4">{s.contactInfo?.phone || "N/A"}</td>
                  <td className="p-4">{s.class || "N/A"}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                    onClick={() => router.push(`/students/addstudent?id=${s._id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                    >
                    Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
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
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}