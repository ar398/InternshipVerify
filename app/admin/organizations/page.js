"use client";

import Link from "next/link";

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

function getRiskClass(risk) {
  if (risk.includes("Verified")) return "risk-low";
  if (risk.includes("Medium")) return "risk-medium";
  if (risk.includes("High")) return "risk-high";

  return "risk-critical";
}

export default function AdminOrganizationsPage() {
  return (
    <main className="admin-page">

      <div className="admin-container">

        <div className="admin-section">

          <Link href="/admin" className="back-link">
            ← Back to Admin Dashboard
          </Link>

          <p className="admin-label">
            AICTE ADMINISTRATION
          </p>

          <h1>Organization Management</h1>

          <p>
            Monitor organizations and review their internship verification
            information.
          </p>

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
                  <h3>{organization.name}</h3>

                  <small>{organization.id}</small>
                </div>

              </div>

              <p>
                📍 {organization.location}
              </p>

              <div className="admin-org-score">

                <div>
                  <span>Risk Score</span>

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

      </div>

    </main>
  );
}