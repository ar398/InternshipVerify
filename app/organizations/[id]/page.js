"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrganizationDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadOrganization() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/organizations/${id}`, {
          cache: "no-store",
        });

        const text = await response.text();

        if (!response.ok) {
          let message = `Request failed with status ${response.status}`;

          try {
            const errorData = JSON.parse(text);
            message = errorData.error || errorData.details || message;
          } catch {
            if (text) {
              message = text;
            }
          }

          throw new Error(message);
        }

        if (!text.trim()) {
          throw new Error("Organization API returned an empty response.");
        }

        let data;

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Organization API returned invalid JSON.");
        }

        setOrganization(data);
      } catch (error) {
        console.error("ORGANIZATION DETAILS ERROR:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrganization();
  }, [id]);

  function getRiskClass(riskLevel) {
    if (riskLevel?.includes("Verified")) {
      return "risk-low";
    }

    if (riskLevel?.includes("Medium")) {
      return "risk-medium";
    }

    if (riskLevel?.includes("High")) {
      return "risk-high";
    }

    return "risk-critical";
  }

  if (loading) {
    return (
      <main className="check-page">
        <div className="check-container">
          <div className="check-heading">
            <span className="small-title">
              ORGANIZATION VERIFICATION
            </span>
            <h1>Loading...</h1>
            <p>Loading organization details...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !organization) {
    return (
      <main className="check-page">
        <div className="check-container">
          <div className="check-heading">
            <span className="small-title">
              ORGANIZATION VERIFICATION
            </span>

            <h1>Organization Not Found</h1>

            <p>{error || "Organization does not exist."}</p>
          </div>

          <Link href="/check" className="details-button">
            ← Back to Search
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="check-page">
      <div className="check-container">

        <Link href="/check" className="details-button">
          ← Back to Search
        </Link>

        <div className="check-heading">
          <span className="small-title">
            ORGANIZATION VERIFICATION
          </span>

          <h1>{organization.name}</h1>

          <p>
            Review verification information, risk indicators,
            and complaint history before applying.
          </p>
        </div>

        {/* Organization Information */}

        <section className="results-section">

          <div className="results-title">
            <h2>Organization Information</h2>
            <span>{organization.id}</span>
          </div>

          <div className="organization-result">

            <div className="organization-info">

              <div className="organization-icon">
                {organization.name?.charAt(0)}
              </div>

              <div>
                <h3>{organization.name}</h3>

                <p>
                  📍 {organization.location}
                </p>

                <p>
                  Registration:{" "}
                  {organization.registrationNumber}
                </p>

                <p>
                  GSTIN: {organization.gstin}
                </p>

                <p>
                  Website: {organization.website}
                </p>
              </div>

            </div>

            <div className="organization-risk">

              <span
                className={`risk-badge ${getRiskClass(
                  organization.riskLevel
                )}`}
              >
                {organization.riskLevel}
              </span>

              <div className="result-score">
                <span>Verification Score</span>

                <strong>
                  {organization.score}/100
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* Score Breakdown */}

        <section className="results-section">

          <div className="results-title">
            <h2>Verification Score Breakdown</h2>

            <span>
              {organization.score}/100
            </span>
          </div>

          <div className="score-breakdown">

            <div className="score-item">
              <span>Legal Registration</span>

              <strong>
                {organization.legalRegistration}/25
              </strong>
            </div>

            <div className="score-item">
              <span>Digital Footprint</span>

              <strong>
                {organization.digitalFootprint}/20
              </strong>
            </div>

            <div className="score-item">
              <span>Internship Offer Content</span>

              <strong>
                {organization.offerContent}/20
              </strong>
            </div>

            <div className="score-item">
              <span>Contact Verifiability</span>

              <strong>
                {organization.contactVerifiability}/15
              </strong>
            </div>

            <div className="score-item">
              <span>Complaint History</span>

              <strong>
                {organization.complaintHistory}/20
              </strong>
            </div>

          </div>

        </section>

        {/* Complaint History */}

        <section className="results-section">

          <div className="results-title">

            <h2>Complaint History</h2>

            <span>
              {organization.complaints} complaint
              {organization.complaints !== 1 ? "s" : ""}
            </span>

          </div>

          <div className="complaint-summary">

            <div>
              <strong>
                {organization.complaints}
              </strong>

              <span>
                Reported Complaints
              </span>
            </div>

            <div>
              <strong>
                {organization.risk}
              </strong>

              <span>
                Current Risk Level
              </span>
            </div>

          </div>

        </section>

        {/* About Organization */}

        <section className="results-section">

          <div className="results-title">
            <h2>About This Organization</h2>
          </div>

          <p>
            {organization.description}
          </p>

        </section>

        {/* Important Notice */}

        <section className="verification-notice">

          <h2>Important</h2>

          <p>
            This verification information is provided to help
            students review an internship provider before applying.
            Always verify the organization's information independently
            before sharing personal information or making payments.
          </p>

        </section>

      </div>
    </main>
  );
}
