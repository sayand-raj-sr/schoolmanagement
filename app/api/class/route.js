// app/api/classes/route.js
import { connectDB } from "@/lib/db";
import ClassModel from "../../models/Class";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const classes = await ClassModel.find()
      .populate("teacher", "name")
      .populate("students", "name rollNumber");
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, teacherId, studentIds } = await req.json();

    const newClass = new ClassModel({
      name,
      teacher: teacherId || null,
      students: Array.isArray(studentIds) ? studentIds : [],
    });
    await newClass.save();
    await newClass.populate("teacher", "name").populate("students", "name rollNumber");

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, teacherId, studentIds } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid class ID" }, { status: 400 });
    }

    const updateData = {};
    if (teacherId !== undefined) updateData.teacher = teacherId;
    if (studentIds !== undefined) updateData.students = Array.isArray(studentIds) ? studentIds : [];

    const updatedClass = await ClassModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("teacher", "name").populate("students", "name rollNumber");

    if (!updatedClass) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(updatedClass, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    // Extract query parameter safely
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const deletedClass = await ClassModel.findByIdAndDelete(id);
    if (!deletedClass) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Class deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}