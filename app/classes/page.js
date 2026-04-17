// app/classes/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllClasses() {
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchClasses() {
      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data);
    }
    fetchClasses();
  }, []);

  return (
    <div>
      <h1>All Classes</h1>
      <button onClick={() => router.push("/classes/addclass")}>Add Class</button>
      <ul>
        {classes.map(c => (
          <li key={c._id}>
            <strong>{c.name}</strong> | Teacher: {c.teacher?.name || "None"} | Students: {c.students.length}
            <button onClick={() => router.push(`/classes/editclass?id=${c._id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}