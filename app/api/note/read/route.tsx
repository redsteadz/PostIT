import { NextRequest, NextResponse } from "next/server";
import { getNotes } from "@/lib/actions";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const noteId = searchParams.get("id")!;
    const allStr = searchParams.get("all");
    const action_resp = await getNotes({
      id: noteId,
      all: allStr && allStr == "true" ? true : false,
    });
    if (action_resp.status === 400) {
      throw new Error("Failed to get note post");
    }
    return NextResponse.json(action_resp);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 400 });
  }
}
