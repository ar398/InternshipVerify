"use client";

import Link from "next/link";
import RiskBadge from "./RiskBadge";

export default function OrganizationCard({ organization }) {
  return (
    <div className="organization-card">

      <div className="card-header">
        <div>
          <h2>{organization.name}</h2>
          <p>{organization.location}</p>
        </div>

        <RiskBadge level={organization.riskLevel} />
      </div>

      <div className="score">
        <span>Risk Score</span>
        <strong>{organization.score}/100</strong>
      </div>

      <p className="description">
        {organization.description}
      </p>

      <div className="card-details">
        <div>
          <span>Complaints</span>
          <strong>{organization.complaints}</strong>
        </div>

        <div>
          <span>Registration</span>
          <strong>
            {organization.registrationNumber === "Not Available"
              ? "Not Available"
              : "Available"}
          </strong>
        </div>
      </div>

      <Link
        href={`/organizations/${organization.id}`}
        className="view-button"
      >
        View Details
      </Link>

    </div>
  );
}