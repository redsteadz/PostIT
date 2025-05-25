import { NextRequest, NextResponse } from "next/server";
import { createBlogPost } from "@/lib/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action_resp = await createBlogPost(body);
    if (action_resp.status === 400) {
      throw new Error("Failed to create blog post");
    }
    return NextResponse.json(action_resp);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 400 });
  }
}
