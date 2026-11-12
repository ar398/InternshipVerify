import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatStatus(status) {
  const statusMap = {
    PENDING: "Submitted",
    UNDER_REVIEW: "Under Review",
    MORE_INFO_REQUESTED: "More Information Requested",
    VERIFIED: "Verified",
    ESCALATED: "Escalated",
    CLOSED: "Resolved",
  };

  return statusMap[status] || status;
}

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedReports = reports.map((report) => ({
      id: report.id,
      caseId: report.caseId,
      organization: report.organization,
      internshipTitle: report.internshipTitle,
      issue: report.issue,
      description: report.description,
      email: report.email,
      phone: report.phone,
      status: formatStatus(report.status),
      priority: report.priority,
      date: new Date(report.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));

    return NextResponse.json(formattedReports);
  } catch (error) {
    console.error("GET REPORTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch reports.",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (
      !data.organizationName ||
      !data.complaintType ||
      !data.description ||
      !data.email
    ) {
      return NextResponse.json(
        {
          error:
            "Organization name, complaint type, description, and email are required.",
        },
        {
          status: 400,
        }
      );
    }

    const newReport = await prisma.report.create({
      data: {
        caseId: `CASE-${Math.floor(Math.random() * 90000) + 10000}`,
        organization: data.organizationName,
        internshipTitle: data.internshipTitle || null,
        issue: data.complaintType,
        description: data.description,
        email: data.email,
        phone: data.phone || null,
        status: "PENDING",
        priority: "MEDIUM",
      },
    });

    return NextResponse.json(
      {
        message: "Report submitted successfully.",
        report: {
          ...newReport,
          status: formatStatus(newReport.status),
          date: new Date(newReport.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST REPORT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to submit report.",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}