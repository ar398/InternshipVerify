"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getRiskClass(status) {
  if (status.includes("Verified") || status.includes("Low")) {
    return "risk-low";
  }

  if (status.includes("Medium")) {
    return "risk-medium";
  }

  if (status.includes("High")) {
    return "risk-high";
  }

  return "risk-critical";
}

function getReportStatusClass(status) {
  if (status === "Under Review") {
    return "status-review";
  }

  if (status === "Submitted") {
    return "status-submitted";
  }

  if (status === "Resolved") {
    return "status-resolved";
  }

  return "";
}

export default function StudentDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Check authentication first
        const authResponse = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!authResponse.ok) {
          window.location.href = "/login";
          return;
        }

        const authData = await authResponse.json();

        if (!authData.authenticated) {
          window.location.href = "/login";
          return;
        }

        setCheckingAuth(false);

        // Fetch dashboard data
        const [dashboardResponse, reportsResponse] =
          await Promise.all([
            fetch("/api/student/dashboard", {
              cache: "no-store",
            }),
            fetch("/api/reports", {
              cache: "no-store",
            }),
          ]);

        if (!dashboardResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        if (!reportsResponse.ok) {
          throw new Error("Failed to fetch reports");
        }

        const dashboardData = await dashboardResponse.json();
        const reportsData = await reportsResponse.json();

        setDashboard(dashboardData);
        setReports(reportsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (checkingAuth) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <h2>Checking authentication...</h2>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <h2>Loading dashboard...</h2>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dashboard-container">
          <h2>Unable to load dashboard</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">

        {/* Header */}

        <section className="dashboard-welcome">

          <div>
            <p className="dashboard-label">
              STUDENT DASHBOARD
            </p>

            <h1>
              Welcome back, {dashboard.student.name}! 👋
            </h1>

            <p>
              Check internship providers and keep track of your
              verification activity.
            </p>
          </div>

          <Link
            href="/check"
            className="dashboard-primary-button"
          >
            Check Organization
          </Link>

        </section>

        {/* Statistics */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon blue">
              🔍
            </div>

            <div>
              <span>Organizations Checked</span>

              <strong>
                {dashboard.stats.organizationsChecked}
              </strong>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>Low Risk Results</span>

              <strong>
                {dashboard.stats.lowRiskResults}
              </strong>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="stat-icon orange">
              ⚠
            </div>

            <div>
              <span>Reports Submitted</span>

              <strong>
                {reports.length}
              </strong>
            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="stat-icon purple">
              📋
            </div>

            <div>
              <span>Reports Under Review</span>

              <strong>
                {
                  reports.filter(
                    (report) => report.status === "Under Review"
                  ).length
                }
              </strong>
            </div>

          </div>

        </section>

        {/* Quick Actions */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>Quick Actions</h2>

              <p>
                Common actions for internship verification.
              </p>
            </div>

          </div>

          <div className="quick-actions">

            <Link
              href="/check"
              className="quick-action-card"
            >
              <div className="quick-action-icon">
                🔍
              </div>

              <div>
                <h3>Check Organization</h3>

                <p>
                  Search an internship provider and view its
                  verification information.
                </p>
              </div>

              <span>→</span>
            </Link>

            <Link
              href="/report"
              className="quick-action-card"
            >
              <div className="quick-action-icon">
                🚩
              </div>

              <div>
                <h3>Report Internship</h3>

                <p>
                  Submit a structured complaint about a suspicious
                  internship opportunity.
                </p>
              </div>

              <span>→</span>
            </Link>

            <Link
              href="/profile"
              className="quick-action-card"
            >
              <div className="quick-action-icon">
                👤
              </div>

              <div>
                <h3>My Profile</h3>

                <p>
                  View and manage your student account information.
                </p>
              </div>

              <span>→</span>
            </Link>

          </div>

        </section>

        {/* Recent Organization Checks */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>Recent Organization Checks</h2>

              <p>
                Organizations recently checked by students.
              </p>
            </div>

            <Link href="/check">
              View All
            </Link>

          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Score</th>
                  <th>Risk Level</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {dashboard.recentChecks.map((organization) => (

                  <tr key={organization.id}>

                    <td>
                      <div className="table-organization">

                        <div className="table-org-icon">
                          {organization.organization.charAt(0)}
                        </div>

                        <div>
                          <strong>
                            {organization.organization}
                          </strong>

                          <small>
                            {organization.id}
                          </small>
                        </div>

                      </div>
                    </td>

                    <td>
                      <strong>
                        {organization.score}/100
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`risk-badge ${getRiskClass(
                          organization.status
                        )}`}
                      >
                        {organization.status}
                      </span>
                    </td>

                    <td>
                      {organization.date}
                    </td>

                    <td>
                      <Link
                        href={`/organizations/${organization.id}`}
                        className="table-view-button"
                      >
                        View
                      </Link>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* My Reports */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <h2>My Reports</h2>

              <p>
                Track the status of your submitted complaints.
              </p>
            </div>

            <Link href="/report">
              New Report
            </Link>

          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Organization</th>
                  <th>Complaint Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {reports.length === 0 ? (

                  <tr>
                    <td colSpan="5">
                      No reports submitted yet.
                    </td>
                  </tr>

                ) : (

                  reports.map((report) => (

                    <tr key={report.caseId}>

                      <td>
                        <strong className="case-id">
                          {report.caseId}
                        </strong>
                      </td>

                      <td>
                        {report.organization}
                      </td>

                      <td>
                        {report.issue}
                      </td>

                      <td>
                        <span
                          className={`report-status ${getReportStatusClass(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td>
                        {report.date}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* Safety Notice */}

        <section className="student-safety-notice">

          <div className="safety-icon">
            🛡️
          </div>

          <div>

            <h3>
              Stay Safe Before Applying
            </h3>

            <p>
              Always verify the organization, review available
              evidence, and be cautious if an internship asks for
              unexpected fees or sensitive personal information.
            </p>

          </div>

        </section>

      </div>
    </main>
  );
}