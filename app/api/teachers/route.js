import { connectDB } from "@/lib/db";
import Teacher from "../../models/Teacher";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();
    const teachers = await Teacher.find();
    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error("GET /api/teachers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

// POST add new teacher
export async function POST(req) {
  try {
    await connectDB();
    const { name, subjects, experience, contactInfo } = await req.json();

    if (!name) return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });

    const teacher = new Teacher({
      name,
      subjects: Array.isArray(subjects) ? subjects : [],
      experience: experience || 0,
      contactInfo: {
        phone: contactInfo?.phone || "",
        email: contactInfo?.email || "",
      },
    });

    await teacher.save();
    return new Response(JSON.stringify(teacher), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to add teacher" }), { status: 500 });
  }
}

// PATCH edit teacher
export async function PATCH(req) {
  try {
    await connectDB();
    const { id, name, subjects, experience, contactInfo } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id))
      return new Response(JSON.stringify({ error: "Invalid teacher ID" }), { status: 400 });

    const teacher = await Teacher.findByIdAndUpdate(
      id,
      {
        name,
        subjects: Array.isArray(subjects) ? subjects : [],
        experience,
        contactInfo: {
          phone: contactInfo?.phone || "",
          email: contactInfo?.email || "",
        },
      },
      { new: true }
    );

    if (!teacher) return new Response(JSON.stringify({ error: "Teacher not found" }), { status: 404 });

    return new Response(JSON.stringify(teacher), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update teacher" }), { status: 500 });
  }
}

// DELETE teacher
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!mongoose.Types.ObjectId.isValid(id))
      return new Response(JSON.stringify({ error: "Invalid teacher ID" }), { status: 400 });

    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) return new Response(JSON.stringify({ error: "Teacher not found" }), { status: 404 });

    return new Response(JSON.stringify({ message: "Teacher deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete teacher" }), { status: 500 });
  }
}