"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClass() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", teacherId: "", studentIds: [] });
  const [message, setMessage] = useState("");

  // Fetch teachers and students
  useEffect(() => {
    async function fetchData() {
      try {
        const [teacherRes, studentRes] = await Promise.all([
          fetch("/api/teachers"),
          fetch("/api/students")
        ]);
        const [teacherData, studentData] = await Promise.all([teacherRes.json(), studentRes.json()]);
        setTeachers(teacherData);
        setStudents(studentData);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load teachers or students");
      }
    }
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        router.push("/classes"); // Go back to classes list
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to save class");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Class</h1>

        {message && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Class Name</label>
            <input
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Advanced Mathematics"
              required
            />
          </div>

          {/* Lead Teacher */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lead Teacher</label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              value={form.teacherId}
              onChange={e => setForm({ ...form, teacherId: e.target.value })}
              required
            >
              <option value="">Select a teacher...</option>
              {teachers.map(t => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Enrolled Students */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Enrolled Students</label>
            <select
              multiple
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              value={form.studentIds}
              onChange={e => setForm({ ...form, studentIds: Array.from(e.target.selectedOptions).map(o => o.value) })}
            >
              {students.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-colors"
          >
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
}