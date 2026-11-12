"use client";

import { useState } from "react";

export default function TrackReportPage() {
  const [caseId, setCaseId] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    const enteredCaseId = caseId.trim();

    if (!enteredCaseId) {
      setError("Please enter a Case ID.");
      setReport(null);
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);

    try {
      const response = await fetch(
        `/api/reports/${encodeURIComponent(enteredCaseId)}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Report not found.");
      }

      setReport(data);
    } catch (error) {
      console.error("TRACK REPORT ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function getStatusStep(status) {
    const steps = [
      "Submitted",
      "Under Review",
      "More Information Requested",
      "Verified",
      "Escalated",
      "Resolved",
    ];

    const currentIndex = steps.indexOf(status);

    return {
      steps,
      currentIndex: currentIndex === -1 ? 0 : currentIndex,
    };
  }

  return (
    <main className="check-page">
      <div className="check-container">

        <div className="check-heading">
          <span className="small-title">
            INTERNSHIP VERIFICATION
          </span>

          <h1>Track Your Report</h1>

          <p>
            Enter your complaint reference number to check the
            current status of your report.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="organization-search"
        >
          <input
            type="text"
            value={caseId}
            onChange={(event) => setCaseId(event.target.value)}
            placeholder="Enter Case ID e.g. CASE-57569"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Track Report"}
          </button>
        </form>

        {error && (
          <div className="no-result">
            <div className="no-result-icon">!</div>

            <h2>Report Not Found</h2>

            <p>{error}</p>
          </div>
        )}

        {report && (
          <section className="results-section">

            <div className="results-title">
              <h2>Report Details</h2>
              <span>{report.caseId}</span>
            </div>

            {/* Status Timeline */}

            <div className="status-timeline">
              <h2>Report Status</h2>

              {(() => {
                const { steps, currentIndex } =
                  getStatusStep(report.status);

                return (
                  <div className="timeline">
                    {steps.map((step, index) => {
                      const completed = index <= currentIndex;
                      const current = index === currentIndex;

                      return (
                        <div
                          key={step}
                          className={`timeline-item ${
                            completed ? "completed" : ""
                          } ${current ? "current" : ""}`}
                        >
                          <div className="timeline-marker">
                            {completed ? "✓" : index + 1}
                          </div>

                          <div className="timeline-content">
                            <strong>{step}</strong>

                            {current && (
                              <span>Current Status</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Report Information */}

            <div className="score-breakdown">

              <div className="score-item">
                <span>Case ID</span>
                <strong>{report.caseId}</strong>
              </div>

              <div className="score-item">
                <span>Organization</span>
                <strong>{report.organization}</strong>
              </div>

              <div className="score-item">
                <span>Internship Title</span>
                <strong>
                  {report.internshipTitle || "Not provided"}
                </strong>
              </div>

              <div className="score-item">
                <span>Complaint Type</span>
                <strong>{report.issue}</strong>
              </div>

              <div className="score-item">
                <span>Status</span>
                <strong>{report.status}</strong>
              </div>

              <div className="score-item">
                <span>Priority</span>
                <strong>{report.priority}</strong>
              </div>

              <div className="score-item">
                <span>Date Submitted</span>
                <strong>
                  {new Date(report.date).toLocaleDateString()}
                </strong>
              </div>

            </div>

            <div className="verification-notice">
              <h2>Report Description</h2>

              <p>{report.description}</p>
            </div>

          </section>
        )}

      </div>
    </main>
  );
}