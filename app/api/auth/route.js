// app/api/auth/route.js
import { connectDB } from "@/lib/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET 

export async function POST(req) {
  await connectDB();

  try {
    const { type, name, email, password } = await req.json();

    if (!type) {
      return NextResponse.json({ message: "Request type is required" }, { status: 400 });
    }
    if (type === "register") {
      if (!name || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

    
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "Teacher",
      });

      await newUser.save();

      return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    }


    if (type === "login") {
      if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

      return NextResponse.json({
        token,
        role: user.role,
        name: user.name,
        email: user.email,
      });
    }

    return NextResponse.json({ message: "Invalid request type" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}