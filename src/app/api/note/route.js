import jwt from "jsonwebtoken";
import Note from "@/models/Note";
import connectDB from "@/config/DBConn";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const notes = await Note.find();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const POST = async (req, res) => {
  try {
    await connectDB();

    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const { title, content, contentType } = body;

    const noteExists = await Note.findOne({ title });
    if (noteExists) {
      return NextResponse.json(
        { error: "Note with this title already exists" },
        { status: 400 }
      );
    }

    let noteToAdd = { title, content, contentType };
    if (contentType === "audio") {
      const { duration } = body;
      noteToAdd = { ...noteToAdd, duration };
    }

    const newNote = await Note.create(noteToAdd);
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
