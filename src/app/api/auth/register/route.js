import bcrypt from "bcryptjs";
import connectDB from "@/config/DBConn.js";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPwd });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
