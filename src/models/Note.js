import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contentType: {
      enum: ["text", "audio"],
      required: true,
    },
    duration: {
      type: String,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema) || mongoose.models.Note;
export default Note;
