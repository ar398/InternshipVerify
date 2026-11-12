import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
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

    const currentPassword = body.currentPassword;
    const newPassword = body.newPassword;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          error:
            "Current password and new password are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        {
          error:
            "New password must contain at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.userId),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 401 }
      );
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return NextResponse.json(
        {
          error:
            "New password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await prisma.user.update({
      where: {
        id: Number(session.userId),
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("PASSWORD UPDATE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to change password.",
      },
      { status: 500 }
    );
  }
}