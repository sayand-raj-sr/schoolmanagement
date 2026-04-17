// app/api/dashboard/route.js
import { connectDB } from "@/lib/db";
import Student from "../../models/Student";
import Teacher from "../../models/Teacher";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();

    // If you don't track daily attendance, we'll just show placeholders
    const attendanceData = [
      { day: "Mon", present: 0, absent: 0 },
      { day: "Tue", present: 0, absent: 0 },
      { day: "Wed", present: 0, absent: 0 },
      { day: "Thu", present: 0, absent: 0 },
      { day: "Fri", present: 0, absent: 0 },
    ];

    return NextResponse.json({ totalStudents, totalTeachers, attendanceData });
  } catch (error) {
    console.error("GET /api/dashboard error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}