import mongoose from "mongoose";

export interface UserType {
  name: String;
  email: String;
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
