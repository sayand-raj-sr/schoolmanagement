"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddStudentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    className: "",
    rollNumber: "",
    age: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");

 
  useEffect(() => {
    if (searchParams) {
      setStudentId(searchParams.get("id"));
    }
  }, [searchParams]);

  // Prefill form if editing
  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students`);
        const students = await res.json();
        const student = students.find((s) => s._id === studentId);
        if (!student) throw new Error("Student not found");

        setForm({
          name: student.name || "",
          className: student.class || "",
          rollNumber: student.rollNumber || "",
          age: student.age || "",
          phone: student.contactInfo?.phone || "",
          email: student.contactInfo?.email || "",
        });
      } catch (err) {
        setMessage(err.message);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      class: form.className.trim(),
      rollNumber: form.rollNumber.trim(),
      age: Number(form.age),
      contactInfo: { phone: form.phone.trim(), email: form.email.trim() },
    };

    try {
      const res = await fetch("/api/students" + (studentId ? `?id=${studentId}` : ""), {
        method: studentId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentId ? { id: studentId, ...payload } : payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      router.push("/students/viewallstudents");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {studentId ? "Edit Student" : "Add Student"}
      </h2>
      {message && <p className="text-red-600 mb-4 text-center">{message}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="className"
          placeholder="Class"
          value={form.className}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={form.rollNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-2">
          {studentId ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}