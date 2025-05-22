import dbConnect from "@/lib/mongoose";
import Post from "@/db/models/Post";
import User from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const session = await auth();
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const post = await Post.create({
      title: body.title,
      content: body.content,
      author: user._id,
      date: body.date,
    });
    return NextResponse.json({ status: 200, post: post });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 400 });
  }
}
