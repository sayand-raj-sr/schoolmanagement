"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Note: If you don't have heroicons installed, you can use text or standard SVGs
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function AllTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      const res = await fetch(`/api/teachers?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete teacher");

      setTeachers(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section - Matches Student Page */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Teacher Directory
            </h1>
            <p className="text-gray-500 mt-1">Manage and view all faculty members</p>
          </div>
          <button 
            onClick={() => router.push("/teachers/addteacher")}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm gap-2"
          >
            <UserPlusIcon className="w-5 h-5" />
            Add New Teacher
          </button>
        </div>

        {/* Table Container - Matches Student Page */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Teacher</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Specialization</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {teachers.length > 0 ? (
                  teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-blue-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                            {t.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900">{t.name}</div>
                            <div className="text-sm text-gray-500">{t.experience || 0} yrs experience</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="flex flex-wrap gap-1">
                          {t.subjects?.map((sub, i) => (
                            <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 text-xs">
                              {sub}
                            </span>
                          )) || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex flex-col">
                          <span>{t.contactInfo?.email || "N/A"}</span>
                          <span className="text-gray-400 text-xs">Faculty Office</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button
                          onClick={() => router.push(`/teachers/addteacher?id=${t._id}`)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
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
                      No teachers found. Click "Add New Teacher" to populate the list.
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