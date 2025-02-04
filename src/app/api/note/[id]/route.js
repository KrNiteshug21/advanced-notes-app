import jwt from "jsonwebtoken";
import Note from "@/models/Note";
import connectDB from "@/config/DBConn";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
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

    const { id } = params;
    const { content } = await req.json();
    console.log("content", id, content);

    const noteToUpdate = await Note.findById(id);
    if (!noteToUpdate) {
      return NextResponse.json(
        { error: "Note does not exist" },
        { status: 400 }
      );
    }

    noteToUpdate.content = content;
    const updatedNote = await noteToUpdate.save();

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export const DELETE = async (req, res) => {
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

    const { id } = req.query;
    const noteToDelete = await Note.findById(id);
    if (!noteToDelete) {
      return NextResponse.json(
        { error: "Note does not exist" },
        { status: 400 }
      );
    }

    await Note.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
