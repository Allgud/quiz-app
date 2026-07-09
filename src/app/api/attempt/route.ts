import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json(
      { error: "sessionId is required" },
      { status: 400 },
    );
  }

  const attempt = await prisma.attempt.create({
    data: {
      sessionId,
    },
  });

  return NextResponse.json({ attemptId: attempt.id });
}
