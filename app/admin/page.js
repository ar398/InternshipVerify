"use client";

import Link from "next/link";
import { useState } from "react";

// ===============================
// DEMO COMPLAINT DATA
// ===============================

const complaints = [
  {
    id: "CASE-10234",
    organization: "Example Technologies",
    type: "Fee Demanded",
    date: "15 Sep 2026",
    priority: "High",
    status: "Pending Review",
  },
  {
    id: "CASE-10189",
    organization: "Demo Solutions",
    type: "Fake Offer Letter",
    date: "14 Sep 2026",
    priority: "Medium",
    status: "Pending Review",
  },
  {
    id: "CASE-10176",
    organization: "Career Growth Hub",
    type: "No Response After Selection",
    date: "13 Sep 2026",
    priority: "Medium",
    status: "Under Review",
  },
  {
    id: "CASE-10152",
    organization: "WorkFast Services",
    type: "Personal Data Misuse",
    date: "12 Sep 2026",
    priority: "High",
    status: "Pending Review",
  },
];

// ===============================
// DEMO ORGANIZATION DATA
// ===============================

const organizations = [
  {
    id: "ORG001",
    name: "TechNova Solutions",
    location: "Chandigarh, India",
    score: 88,
    risk: "Verified / Low Risk",
    complaints: 1,
  },
  {
    id: "ORG002",
    name: "QuickSkill Technologies",
    location: "Delhi, India",
    score: 62,
    risk: "Medium Risk",
    complaints: 4,
  },
  {
    id: "ORG003",
    name: "Digital Work Hub",
    location: "Mumbai, India",
    score: 35,
    risk: "High Risk",
    complaints: 12,
  },
];

// ===============================
// DEMO ACTIVITY DATA
// ===============================

const activities = [
  {
    action: "Complaint submitted",
    details: "CASE-10234",
    time: "15 minutes ago",
  },
  {
    action: "Organization checked",
    details: "QuickSkill Technologies",
    time: "32 minutes ago",
  },
  {
    action: "Evidence uploaded",
    details: "CASE-10189",
    time: "1 hour ago",
  },
  {
    action: "Case moved to review",
    details: "CASE-10176",
    time: "2 hours ago",
  },
];

// ===============================
// RISK CLASS
// ===============================

function getRiskClass(risk) {
  if (risk.includes("Verified")) {
    return "risk-low";
  }

  if (risk.includes("Medium")) {
    return "risk-medium";
  }

  if (risk.includes("High")) {
    return "risk-high";
  }

  return "risk-critical";
}

// ===============================
// PRIORITY CLASS
// ===============================

function getPriorityClass(priority) {
  if (priority === "High") {
    return "priority-high";
  }

  if (priority === "Medium") {
    return "priority-medium";
  }

  return "priority-low";
}

// ===============================
// ADMIN DASHBOARD
// ===============================

export default function AdminDashboard() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseList, setCaseList] = useState(complaints);

  // ===============================
  // CASE ACTION
  // ===============================

  function handleCaseAction(action) {
    if (!selectedCase) {
      return;
    }

    if (action === "Close Case") {
      setCaseList((previous) =>
        previous.map((item) =>
          item.id === selectedCase.id
            ? {
                ...item,
                status: "Closed",
              }
            : item
        )
      );
    }

    if (action === "Request More Info") {
      setCaseList((previous) =>
        previous.map((item) =>
          item.id === selectedCase.id
            ? {
                ...item,
                status: "More Information Requested",
              }
            : item
        )
      );
    }

    if (action === "Mark Under Review") {
      setCaseList((previous) =>
        previous.map((item) =>
          item.id === selectedCase.id
            ? {
                ...item,
                status: "Under Review",
              }
            : item
        )
      );
    }

    setSelectedCase(null);
  }

  // ===============================
  // RETURN
  // ===============================

  return (
    <main className="admin-page">
      <div className="admin-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <section className="admin-header">

          <div>
            <p className="admin-label">
              AICTE ADMINISTRATION
            </p>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Monitor internship verification activity,
              complaints, organizations, and review cases.
            </p>
          </div>

          <div className="admin-user">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>
                AICTE Reviewer
              </strong>

              <small>
                Administrator
              </small>
            </div>

          </div>

        </section>

        {/* =====================================
            STATISTICS
        ===================================== */}

        <section className="admin-stats">

          {/* Pending Complaints */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon blue">
              📋
            </div>

            <div>
              <span>
                Pending Complaints
              </span>

              <strong>
                24
              </strong>
            </div>

          </div>

          {/* Flagged Organizations */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon orange">
              ⚠
            </div>

            <div>
              <span>
                Flagged Organizations
              </span>

              <strong>
                8
              </strong>
            </div>

          </div>

          {/* Cases Reviewed */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon green">
              ✓
            </div>

            <div>
              <span>
                Cases Reviewed
              </span>

              <strong>
                156
              </strong>
            </div>

          </div>

          {/* Registered Students */}

          <div className="admin-stat-card">

            <div className="admin-stat-icon purple">
              👥
            </div>

            <div>
              <span>
                Registered Students
              </span>

              <strong>
                1,248
              </strong>
            </div>

          </div>

        </section>

        {/* =====================================
            ADMIN ACTIONS
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Admin Actions
              </h2>

              <p>
                Manage verification and complaint review tasks.
              </p>

            </div>

          </div>

          <div className="admin-actions">

            <Link href="/admin/complaints">
              📋 Review Complaints
            </Link>

            <Link href="/admin/organizations">
              🏢 Organizations
            </Link>

            <Link href="/admin/cases">
              📁 Case Management
            </Link>

            <Link href="/admin/dashboard">
              📊 View Analytics
            </Link>

          </div>

        </section>

        {/* =====================================
            COMPLAINT REVIEW QUEUE
        ===================================== */}

        <section
          className="admin-section"
          id="complaints"
        >

          <div className="admin-section-heading">

            <div>

              <h2>
                Complaint Review Queue
              </h2>

              <p>
                Review recently submitted internship complaints.
              </p>

            </div>

            <span className="queue-count">
              {caseList.length} shown
            </span>

          </div>

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Case ID
                  </th>

                  <th>
                    Organization
                  </th>

                  <th>
                    Complaint
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {caseList.map((complaint) => (

                  <tr key={complaint.id}>

                    <td>

                      <strong className="case-id">
                        {complaint.id}
                      </strong>

                    </td>

                    <td>
                      {complaint.organization}
                    </td>

                    <td>
                      {complaint.type}
                    </td>

                    <td>

                      <span
                        className={`priority-badge ${getPriorityClass(
                          complaint.priority
                        )}`}
                      >
                        {complaint.priority}
                      </span>

                    </td>

                    <td>

                      <span className="admin-status">
                        {complaint.status}
                      </span>

                    </td>

                    <td>
                      {complaint.date}
                    </td>

                    <td>

                      <button
                        className="review-button"
                        onClick={() =>
                          setSelectedCase(complaint)
                        }
                      >
                        Review
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* =====================================
            ORGANIZATION MONITORING
        ===================================== */}

        <section
          className="admin-section"
          id="organizations"
        >

          <div className="admin-section-heading">

            <div>

              <h2>
                Organization Monitoring
              </h2>

              <p>
                Review organizations and their current
                verification information.
              </p>

            </div>

            <Link href="/check">
              Search Organizations
            </Link>

          </div>

          <div className="organization-admin-grid">

            {organizations.map((organization) => (

              <div
                className="organization-admin-card"
                key={organization.id}
              >

                <div className="organization-admin-top">

                  <div className="admin-org-icon">
                    {organization.name.charAt(0)}
                  </div>

                  <div>

                    <h3>
                      {organization.name}
                    </h3>

                    <small>
                      {organization.id}
                    </small>

                  </div>

                </div>

                <p>
                  📍 {organization.location}
                </p>

                <div className="admin-org-score">

                  <div>

                    <span>
                      Score
                    </span>

                    <strong>
                      {organization.score}/100
                    </strong>

                  </div>

                  <span
                    className={`risk-badge ${getRiskClass(
                      organization.risk
                    )}`}
                  >
                    {organization.risk}
                  </span>

                </div>

                <div className="admin-org-footer">

                  <span>
                    Complaints: {organization.complaints}
                  </span>

                  <Link
                    href={`/organizations/${organization.id}`}
                  >
                    View Details →
                  </Link>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =====================================
            ANALYTICS
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Verification Overview
              </h2>

              <p>
                Current distribution of organization
                verification results in the demo dataset.
              </p>

            </div>

          </div>

          <div className="analytics-grid">

            {/* Verification Distribution */}

            <div className="analytics-card">

              <h3>
                Verification Distribution
              </h3>

              <div className="analytics-item">

                <span>
                  Verified / Low Risk
                </span>

                <strong>
                  68%
                </strong>

              </div>

              <div className="analytics-bar">

                <div
                  className="analytics-fill low"
                  style={{
                    width: "68%",
                  }}
                ></div>

              </div>

              <div className="analytics-item">

                <span>
                  Medium Risk
                </span>

                <strong>
                  21%
                </strong>

              </div>

              <div className="analytics-bar">

                <div
                  className="analytics-fill medium"
                  style={{
                    width: "21%",
                  }}
                ></div>

              </div>

              <div className="analytics-item">

                <span>
                  High / Critical Risk
                </span>

                <strong>
                  11%
                </strong>

              </div>

              <div className="analytics-bar">

                <div
                  className="analytics-fill high"
                  style={{
                    width: "11%",
                  }}
                ></div>

              </div>

            </div>

            {/* Complaint Categories */}

            <div className="analytics-card">

              <h3>
                Complaint Categories
              </h3>

              <div className="complaint-category">

                <span>
                  Fee Demanded
                </span>

                <strong>
                  34%
                </strong>

              </div>

              <div className="complaint-category">

                <span>
                  Fake Offer Letter
                </span>

                <strong>
                  26%
                </strong>

              </div>

              <div className="complaint-category">

                <span>
                  No Response
                </span>

                <strong>
                  18%
                </strong>

              </div>

              <div className="complaint-category">

                <span>
                  Personal Data Misuse
                </span>

                <strong>
                  12%
                </strong>

              </div>

              <div className="complaint-category">

                <span>
                  Other
                </span>

                <strong>
                  10%
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            RECENT ACTIVITY
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Recent Activity
              </h2>

              <p>
                Latest activity on the platform.
              </p>

            </div>

          </div>

          <div className="activity-list">

            {activities.map((activity, index) => (

              <div
                className="activity-item"
                key={index}
              >

                <div className="activity-dot"></div>

                <div className="activity-content">

                  <strong>
                    {activity.action}
                  </strong>

                  <span>
                    {activity.details}
                  </span>

                </div>

                <time>
                  {activity.time}
                </time>

              </div>

            ))}

          </div>

        </section>

      </div>

      {/* =====================================
          REVIEW MODAL
      ===================================== */}

      {selectedCase && (

        <div className="modal-overlay">

          <div className="review-modal">

            <button
              className="modal-close"
              onClick={() => setSelectedCase(null)}
              aria-label="Close review"
            >
              ×
            </button>

            <p className="modal-label">
              CASE REVIEW
            </p>

            <h2>
              {selectedCase.id}
            </h2>

            <div className="modal-details">

              <div>

                <span>
                  Organization
                </span>

                <strong>
                  {selectedCase.organization}
                </strong>

              </div>

              <div>

                <span>
                  Complaint Type
                </span>

                <strong>
                  {selectedCase.type}
                </strong>

              </div>

              <div>

                <span>
                  Priority
                </span>

                <strong>
                  {selectedCase.priority}
                </strong>

              </div>

              <div>

                <span>
                  Date
                </span>

                <strong>
                  {selectedCase.date}
                </strong>

              </div>

            </div>

            {/* Evidence */}

            <div className="evidence-placeholder">

              <h3>
                Evidence
              </h3>

              <p>
                Evidence files associated with this case
                would appear here in the complete backend
                implementation.
              </p>

              <button
                type="button"
                onClick={() =>
                  alert(
                    "Evidence viewer will be connected to the backend later."
                  )
                }
              >
                📎 View Evidence
              </button>

            </div>

            {/* Review Actions */}

            <div className="review-actions">

              <button
                onClick={() =>
                  handleCaseAction("Mark Under Review")
                }
              >
                Mark Under Review
              </button>

              <button
                onClick={() =>
                  handleCaseAction("Request More Info")
                }
              >
                Request More Info
              </button>

              <button
                onClick={() =>
                  handleCaseAction("Close Case")
                }
              >
                Close Case
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
