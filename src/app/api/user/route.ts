import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";
  const email = searchParams.get("email") || "";
  const password = searchParams.get("password") || "";

  try {
    if (userId) {
      const user = await prisma.user.findFirst({
        where: {
          id: parseInt(userId),
        },
      });
      return NextResponse.json(user);
    } else if (email && password) {
      const user = await prisma.user.findFirst({
        where: { email: email },
      });
      if (user && (await bcrypt.compare(password, user?.password))) {
        return NextResponse.json(user);
      } else {
        return NextResponse.json(
          { error: "Wrong credentials." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, passwordConfirmation } =
      await request.json();

    if (!username || username.length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters long." },
        { status: 500 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 500 }
      );
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters long and contain at least one letter and one number.",
        },
        { status: 500 }
      );
    }

    if (password != passwordConfirmation)
      return NextResponse.json(
        { error: "Passwords does not match." },
        { status: 500 }
      );

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
