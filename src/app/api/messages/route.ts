import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversation_id");
    const before = searchParams.get("before");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    if (!conversationId) {
      return NextResponse.json({ error: "conversation_id is required" }, { status: 400 });
    }

    const messages = before
      ? await sql`
          SELECT
            m.id, m.content, m.created_at, m.edited_at,
            u.id as user_id, u.username, u.name, u.avatar_url
          FROM messages m
          JOIN users u ON u.id = m.user_id
          WHERE m.conversation_id = ${conversationId}
            AND m.created_at < ${before}::timestamptz
          ORDER BY m.created_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT
            m.id, m.content, m.created_at, m.edited_at,
            u.id as user_id, u.username, u.name, u.avatar_url
          FROM messages m
          JOIN users u ON u.id = m.user_id
          WHERE m.conversation_id = ${conversationId}
          ORDER BY m.created_at DESC
          LIMIT ${limit}
        `;

    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { conversation_id, user_id, content } = await req.json();

    if (!conversation_id || !user_id || !content?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [message] = await sql`
      INSERT INTO messages (conversation_id, user_id, content)
      VALUES (${conversation_id}, ${user_id}, ${content.trim()})
      RETURNING id, content, created_at
    `;

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error("Message send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
