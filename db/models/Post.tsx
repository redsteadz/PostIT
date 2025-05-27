import mongoose from "mongoose";

export interface PostType {
  id?: String;
  title: String;
  content: String;
  date: String;
  author?: String;
}

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
