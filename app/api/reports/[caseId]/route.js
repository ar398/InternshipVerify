import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const statusLabels = {
  PENDING: "Submitted",
  UNDER_REVIEW: "Under Review",
  MORE_INFO_REQUESTED: "More Information Requested",
  VERIFIED: "Verified",
  ESCALATED: "Escalated",
  CLOSED: "Resolved",
};

export async function GET(request, { params }) {
  try {
    const { caseId } = await params;

    const report = await prisma.report.findUnique({
      where: {
        caseId: caseId.toUpperCase(),
      },
    });

    if (!report) {
      return NextResponse.json(
        {
          error: "Report not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      id: report.id,
      caseId: report.caseId,
      organization: report.organization,
      internshipTitle: report.internshipTitle,
      issue: report.issue,
      description: report.description,
      status: statusLabels[report.status] || report.status,
      priority: report.priority,
      date: report.date.toISOString(),
    });
  } catch (error) {
    console.error("GET REPORT BY CASE ID ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch report.",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}