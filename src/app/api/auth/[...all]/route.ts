import { auth } from "@/lib/auth/config";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
  try {
    return await handlers.GET(req);
  } catch (error) {
    console.error("Auth GET error:", error);
    return NextResponse.json(
      { error: "Auth handler failed", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlers.POST(req);
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: "Auth handler failed", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
