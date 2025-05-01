import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  return NextResponse.json("og");
}

export async function POST(request: NextRequest) {
  try {
    const { userId, wordsNumber } = await request.json();

    console.log(userId, wordsNumber);

    const record = await prisma.record.create({
      data: {
        userId: parseInt(userId),
        wordsNumber,
      },
    });

    return NextResponse.json(record);
  } catch (err) {
    return NextResponse.json(
      { err: "Something went wrong." + err },
      { status: 500 }
    );
  }
}
