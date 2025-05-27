import { NextRequest, NextResponse } from "next/server";
import { createNote } from "@/lib/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action_resp = await createNote(body);
    if (action_resp.status === 400) {
      throw new Error("Failed to create note");
    }
    return NextResponse.json(action_resp);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 400 });
  }
}
