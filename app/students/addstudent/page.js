"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function StudentFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Check if editing
  
  const [form, setForm] = useState({
    name: "", class: "", rollNumber: "", age: "", phone: "", email: ""
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      async function fetchStudent() {
        const res = await fetch(`/api/students`); // If your API handles single ID, use `/api/students?id=${id}`
        const data = await res.json();
        const student = data.find(s => s._id === id);
        if (student) {
          setForm({
            name: student.name,
            class: student.class,
            rollNumber: student.rollNumber,
            age: student.age,
            phone: student.contactInfo?.phone || "",
            email: student.contactInfo?.email || ""
          });
        }
      }
      fetchStudent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      id, 
      name: form.name.trim(),
      class: form.class.trim(),
      rollNumber: form.rollNumber.trim(),
      age: Number(form.age),
      contactInfo: { phone: form.phone.trim(), email: form.email.trim() }
    };

    try {
      const res = await fetch("/api/students", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });

      if (res.ok) {
        router.push("/students/viewallstudents");
      } else {
        setMessage(" Failed to save student.");
      }
    } catch (error) {
      setMessage(" Server error.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? "Edit Student" : "Add New Student"}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Name" className="w-full border p-2 rounded-lg" required />
        <input name="class" value={form.class} onChange={(e) => setForm({...form, class: e.target.value})} placeholder="Class" className="w-full border p-2 rounded-lg" required />
        <input name="rollNumber" value={form.rollNumber} onChange={(e) => setForm({...form, rollNumber: e.target.value})} placeholder="Roll Number" className="w-full border p-2 rounded-lg" required />
        <input type="number" name="age" value={form.age} onChange={(e) => setForm({...form, age: e.target.value})} placeholder="Age" className="w-full border p-2 rounded-lg" required />
        <input name="phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Phone" className="w-full border p-2 rounded-lg" />
        <input name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Email" className="w-full border p-2 rounded-lg" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{isEditing ? "Update Student" : "Add Student"}</button>
      </form>
    </div>
  );
}

export default function AddStudent() {
  return <Suspense fallback={<div>Loading...</div>}><StudentFormContent /></Suspense>;
}