import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const results = await prisma.attempt.findMany({
    where: {
      finishedAt: {
        not: null,
      },
    },
    orderBy: {
      score: "desc",
    },
    take: 10,
  });

  return NextResponse.json({ results });
}
