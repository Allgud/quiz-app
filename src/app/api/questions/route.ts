import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const questions = await prisma.question.findMany({
    orderBy: { order: "asc" },
    include: {
      options: {
        omit: { isCorrect: true },
      },
    },
  });

  return NextResponse.json({ questions });
}
