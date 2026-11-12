import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Fetching organizations from database...");

    const organizations = await prisma.organization.findMany({
      orderBy: {
        id: "asc",
      },
    });

    console.log("Organizations found:", organizations.length);

    return NextResponse.json(organizations);
  } catch (error) {
    console.error("GET ORGANIZATIONS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch organizations.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}