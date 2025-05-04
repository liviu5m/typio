import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "";
    console.log("this user Id", userId);
    
    const records = await prisma.record.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    console.log(records);
    
    return NextResponse.json(records);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, wordsNumber } = await request.json();

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
