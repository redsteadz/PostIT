import mongoose from "mongoose";

export interface NoteType {
  id?: string;
  src: string;
  type: "txt" | "img" | "vid" | "audio";
  description: string;
  date?: string;
  author?: string;
}

const NoteSchema = new mongoose.Schema({
  src: { type: String, required: true, trim: true },
  // img: file, link, gif
  // vid: file, yt, insta
  // audio: file, spotify
  type: {
    type: String,
    enum: ["txt", "img", "vid", "audio"],
    default: "text",
    required: true,
  },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
