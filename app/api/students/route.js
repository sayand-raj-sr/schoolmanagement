// app/api/students/route.js
import { connectDB } from "@/lib/db";
import Student from "../../models/Student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// GET all students
export async function GET() {
  try {
    await connectDB();
    const students = await Student.find();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("GET /api/students error:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("Incoming student data:", body); // <-- check what frontend sends

    const { name, class: className, rollNumber, age, contactInfo } = body;

    if (!name || !className || !rollNumber || !age) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const student = new Student({
      name,
      class: className,
      rollNumber,
      age,
      contactInfo: {
        phone: contactInfo?.phone || "",
        email: contactInfo?.email || ""
      },
    });

    const savedStudent = await student.save();
    console.log("Student saved:", savedStudent);
    return NextResponse.json(savedStudent, { status: 201 });
  } catch (error) {
    console.error("POST /api/students error:", error); // <-- full error log
    return NextResponse.json({ error: error.message || "Failed to add student" }, { status: 500 });
  }
}
// PATCH edit student
export async function PATCH(req) {
  try {
    await connectDB();
    const { id, name, class: className, rollNumber, age, contactInfo } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid student ID" }, { status: 400 });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { name, class: className, rollNumber, age, contactInfo },
      { new: true }
    );

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/students error:", error);
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 });
  }
}

// DELETE student
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid student ID" }, { status: 400 });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/students error:", error);
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 });
  }
}