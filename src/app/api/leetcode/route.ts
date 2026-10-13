import { NextRequest, NextResponse } from "next/server";
import { getLeetCodeProfile } from "@/lib/leetcode/api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || "ev7utG9eiZ";

    const stats = await getLeetCodeProfile(username);
    if (!stats) {
      return NextResponse.json(
        { error: `LeetCode user '${username}' not found or profile is private.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode profile", details: String(error) },
      { status: 500 }
    );
  }
}
