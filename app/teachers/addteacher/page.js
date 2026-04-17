"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddTeacher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("id"); // Get teacher id from URL

  const [form, setForm] = useState({
    name: "",
    subjects: "",
    experience: "",
    phone: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  // Prefill form if editing
  useEffect(() => {
    if (!teacherId) return;

    async function fetchTeacher() {
      try {
        const res = await fetch("/api/teachers");
        if (!res.ok) throw new Error("Failed to fetch teachers");
        const data = await res.json();
        const teacher = data.find(t => t._id === teacherId);
        if (!teacher) throw new Error("Teacher not found");

        setForm({
          name: teacher.name,
          subjects: teacher.subjects?.join(", ") || "",
          experience: teacher.experience || "",
          phone: teacher.contactInfo?.phone || "",
          email: teacher.contactInfo?.email || "",
        });
      } catch (err) {
        setMessage(err.message);
      }
    }

    fetchTeacher();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("⚠️ Name is required");
      return;
    }

    const teacherData = {
      name: form.name.trim(),
      subjects: form.subjects.split(",").map(s => s.trim()).filter(Boolean),
      experience: Number(form.experience) || 0,
      contactInfo: {
        phone: form.phone.trim(),
        email: form.email.trim(),
      },
    };

    try {
      const res = await fetch("/api/teachers" + (teacherId ? `?id=${teacherId}` : ""), {
        method: teacherId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherId ? { id: teacherId, ...teacherData } : teacherData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Operation failed");

      setMessage(teacherId ? "✅ Teacher updated successfully!" : "✅ Teacher added successfully!");
      if (!teacherId) setForm({ name: "", subjects: "", experience: "", phone: "", email: "" });

      setTimeout(() => router.push("/teachers"), 1000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {teacherId ? "Edit Teacher" : "Add New Teacher"}
      </h2>

      {message && <p className="mb-4 text-center text-red-600">{message}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter teacher name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Subjects (comma separated)</label>
          <input
            type="text"
            name="subjects"
            value={form.subjects}
            onChange={handleChange}
            placeholder="e.g., Math, Science, English"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g., 5"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
        >
          {teacherId ? "Update Teacher" : "Add Teacher"}
        </button>
      </form>
    </div>
  );
}