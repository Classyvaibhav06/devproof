import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const users = await sql`
      SELECT
        id,
        username,
        name,
        avatar_url,
        xp,
        streak,
        longest_streak
      FROM users
      ORDER BY xp DESC
      LIMIT ${limit}
    `;

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
