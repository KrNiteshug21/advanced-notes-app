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
      type: String,
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

export default mongoose.models.Note || mongoose.model("Note", noteSchema);
