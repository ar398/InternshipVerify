import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const session = await verifySession(token);

    if (!session || !session.userId) {
      return NextResponse.json(
        {
          error: "Invalid or expired session.",
        },
        {
          status: 401,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("PROFILE API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch profile.",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}