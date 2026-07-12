import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const { attemptId } = await params;
  const { optionId } = await request.json();

  if (!optionId) {
    return NextResponse.json(
      { error: "optionId is required" },
      { status: 400 },
    );
  }

  const option = await prisma.option.findUnique({
    where: { id: optionId },
  });

  if (option?.isCorrect) {
    await prisma.attempt.update({
      where: { id: attemptId },
      data: {
        score: { increment: 1 },
      },
    });
  }

  return NextResponse.json({ isCorrect: option?.isCorrect ?? false });
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ attemptId: string }>;
  },
) {
  const { attemptId } = await params;

  await prisma.attempt.update({
    where: { id: attemptId },
    data: {
      finishedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ attemptId: string }> },
) {
  const { attemptId } = await params;

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
  });

  const total = await prisma.question.count();

  return NextResponse.json({ attempt, total });
}
