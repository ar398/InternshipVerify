import { NextResponse } from "next/server";

export async function GET() {
  const dashboardData = {
    student: {
      name: "Arvind",
      role: "Student",
    },

    stats: {
      organizationsChecked: 12,
      lowRiskResults: 8,
      reportsSubmitted: 2,
      reportsUnderReview: 1,
    },

    recentChecks: [
      {
        id: "ORG001",
        organization: "TechNova Solutions",
        score: 88,
        status: "Verified",
        risk: "Low Risk",
        date: "Today",
      },
      {
        id: "ORG002",
        organization: "QuickSkill Technologies",
        score: 62,
        status: "Medium Risk",
        risk: "Medium Risk",
        date: "Yesterday",
      },
      {
        id: "ORG003",
        organization: "Digital Work Hub",
        score: 35,
        status: "High Risk",
        risk: "High Risk",
        date: "2 days ago",
      },
    ],

    reports: [
      {
        caseId: "CASE-10234",
        organization: "Example Technologies",
        issue: "Fee Demanded",
        status: "Under Review",
        date: "15 Sep 2026",
      },
      {
        caseId: "CASE-10189",
        organization: "Demo Solutions",
        issue: "Fake Offer Letter",
        status: "Submitted",
        date: "10 Sep 2026",
      },
    ],
  };

  return NextResponse.json(dashboardData);
}