import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const session = await verifySession(token);

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Invalid or expired session." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "Name must contain at least 2 characters." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: Number(session.userId),
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already being used." },
        { status: 409 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(session.userId),
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update profile.",
      },
      { status: 500 }
    );
  }
}