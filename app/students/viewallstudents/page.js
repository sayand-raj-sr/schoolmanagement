"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline"; // Optional: npm i @heroicons/react

export default function ViewAllStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (id) => router.push(`/students/addstudent?id=${id}`);
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`/api/students?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Student Directory
            </h1>
            <p className="text-gray-500 mt-1">Manage and view all enrolled students</p>
          </div>
          <button 
            onClick={() => router.push('/students/addstudent')}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm gap-2"
          >
            <UserPlusIcon className="w-5 h-5" />
            Add New Student
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Roll No & Class</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.length > 0 ? (
                  students.map((s) => (
                    <tr key={s._id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            {s.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900">{s.name}</div>
                            <div className="text-sm text-gray-500">{s.age} years old</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="block font-medium">Class {s.class}</span>
                        <span className="text-gray-400">Roll: {s.rollNumber}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span>{s.contactInfo?.email}</span>
                          <span className="text-gray-400 text-xs">{s.contactInfo?.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button
                          onClick={() => handleEdit(s._id)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                      No students found. Add your first student to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}