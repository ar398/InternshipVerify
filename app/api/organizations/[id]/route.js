import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log("Fetching organization:", id);

    const organization = await prisma.organization.findUnique({
      where: {
        id: id.toUpperCase(),
      },
    });

    if (!organization) {
      return NextResponse.json(
        {
          error: "Organization not found",
        },
        {
          status: 404,
        }
      );
    }

    console.log("Organization found:", organization.name);

    return NextResponse.json(organization);
  } catch (error) {
    console.error("GET ORGANIZATION ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch organization.",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}