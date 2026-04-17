import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return NextResponse.json(
        { message: "No token" },
        { status: 401 }
      );
    }

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      message: "Valid token",
      userId: decoded.userId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}