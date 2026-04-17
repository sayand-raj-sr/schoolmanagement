import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB(); // Connect to MongoDB

    return NextResponse.json({
      message: "DB connected successfully",
    });
  } catch (err) {
    console.error("DB connection failed:", err);
    return NextResponse.json(
      { message: "DB connection failed", error: err.message },
      { status: 500 }
    );
  }
}