import dbConnect from "@/lib/mongoose";
import User from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  if (req.method === "POST") {
    try {
      const user = await User.findOneAndUpdate(
        { email: body.email },
        { $setOnInsert: body },
        { new: true, upsert: true },
      );
      return NextResponse.json({ status: 200, user: user });
    } catch (error) {
      return NextResponse.json({ message: "Error: " + error }, { status: 400 });
    }
  }
}
