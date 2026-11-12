import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
          error: "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json(
        {
          authenticated: false,
          error: "Invalid or expired session.",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        name: session.name,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("AUTH CHECK ERROR:", error);

    return NextResponse.json(
      {
        authenticated: false,
        error: "Authentication check failed.",
      },
      {
        status: 500,
      }
    );
  }
}