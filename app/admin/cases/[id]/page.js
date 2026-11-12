"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const caseData = {
  "CASE-10234": {
    id: "CASE-10234",
    organization: "Example Technologies",
    complaintType: "Fee Demanded",
    student: "Student #1001",
    date: "15 Sep 2026",
    priority: "High",
    status: "Pending Review",
    description:
      "The student reported that the organization requested an internship-related fee before allowing the student to continue with the internship process.",
    evidence: [
      "Fee request screenshot",
      "Internship communication",
      "Offer communication",
    ],
  },

  "CASE-10189": {
    id: "CASE-10189",
    organization: "Demo Solutions",
    complaintType: "Fake Offer Letter",
    student: "Student #1002",
    date: "14 Sep 2026",
    priority: "Medium",
    status: "Pending Review",
    description:
      "The student submitted a complaint regarding an internship offer letter whose authenticity requires further verification.",
    evidence: [
      "Offer letter",
      "Email communication",
    ],
  },

  "CASE-10176": {
    id: "CASE-10176",
    organization: "Career Growth Hub",
    complaintType: "No Response After Selection",
    student: "Student #1003",
    date: "13 Sep 2026",
    priority: "Medium",
    status: "Under Review",
    description:
      "The student reported that communication stopped after the internship selection process.",
    evidence: [
      "Selection message",
      "Communication history",
    ],
  },

  "CASE-10152": {
    id: "CASE-10152",
    organization: "WorkFast Services",
    complaintType: "Personal Data Misuse",
    student: "Student #1004",
    date: "12 Sep 2026",
    priority: "High",
    status: "Pending Review",
    description:
      "The student reported concerns regarding the use of personal information during the internship process.",
    evidence: [
      "Communication screenshot",
      "Submitted complaint evidence",
    ],
  },
};

export default function CaseDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const caseId = params?.id;

  const currentCase = caseData[caseId];

  const [status, setStatus] = useState(
    currentCase?.status || "Pending Review"
  );

  const [note, setNote] = useState("");

  if (!currentCase) {
    return (
      <main className="admin-page">
        <div className="admin-container">

          <section className="admin-section">

            <Link
              href="/admin/cases"
              className="back-link"
            >
              ← Back to Case Management
            </Link>

            <div className="not-found-box">

              <h1>
                Case Not Found
              </h1>

              <p>
                No case was found for ID:
              </p>

              <strong>
                {caseId}
              </strong>

            </div>

          </section>

        </div>
      </main>
    );
  }

  function updateStatus(newStatus) {
    setStatus(newStatus);

    alert(
      `Case ${currentCase.id} updated to "${newStatus}".`
    );
  }

  function saveNote() {
    if (!note.trim()) {
      alert("Please enter a note first.");
      return;
    }

    alert("Internal note saved successfully.");

    setNote("");
  }

  return (
    <main className="admin-page">

      <div className="admin-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <section className="admin-section">

          <Link
            href="/admin/cases"
            className="back-link"
          >
            ← Back to Case Management
          </Link>

          <p className="admin-label">
            AICTE ADMINISTRATION
          </p>

          <div className="case-page-header">

            <div>

              <h1>
                Case Review
              </h1>

              <p>
                Review complaint details, evidence,
                and administrative actions.
              </p>

            </div>

            <span className="case-id-large">
              {currentCase.id}
            </span>

          </div>

        </section>

        {/* =====================================
            CASE SUMMARY
        ===================================== */}

        <section className="admin-section">

          <div className="case-summary-grid">

            <div className="case-summary-card">

              <span>
                Organization
              </span>

              <strong>
                {currentCase.organization}
              </strong>

            </div>

            <div className="case-summary-card">

              <span>
                Complaint Type
              </span>

              <strong>
                {currentCase.complaintType}
              </strong>

            </div>

            <div className="case-summary-card">

              <span>
                Student
              </span>

              <strong>
                {currentCase.student}
              </strong>

            </div>

            <div className="case-summary-card">

              <span>
                Date
              </span>

              <strong>
                {currentCase.date}
              </strong>

            </div>

            <div className="case-summary-card">

              <span>
                Priority
              </span>

              <strong>
                {currentCase.priority}
              </strong>

            </div>

            <div className="case-summary-card">

              <span>
                Current Status
              </span>

              <strong>
                {status}
              </strong>

            </div>

          </div>

        </section>

        {/* =====================================
            COMPLAINT DESCRIPTION
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Complaint Details
              </h2>

              <p>
                Information submitted as part of
                the complaint.
              </p>

            </div>

          </div>

          <div className="case-description">

            <p>
              {currentCase.description}
            </p>

          </div>

        </section>

        {/* =====================================
            EVIDENCE
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Evidence
              </h2>

              <p>
                Evidence associated with this case.
              </p>

            </div>

          </div>

          <div className="evidence-list">

            {currentCase.evidence.map(
              (item, index) => (

                <div
                  className="evidence-item"
                  key={index}
                >

                  <div className="evidence-icon">
                    📎
                  </div>

                  <div>

                    <strong>
                      {item}
                    </strong>

                    <small>
                      Evidence file #{index + 1}
                    </small>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `Demo viewer: ${item}`
                      )
                    }
                  >
                    View
                  </button>

                </div>

              )
            )}

          </div>

        </section>

        {/* =====================================
            ADMIN ACTIONS
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Review Actions
              </h2>

              <p>
                Update the current case status.
              </p>

            </div>

          </div>

          <div className="case-actions">

            <button
              type="button"
              onClick={() =>
                updateStatus("Under Review")
              }
            >
              🔍 Mark Under Review
            </button>

            <button
              type="button"
              onClick={() =>
                updateStatus(
                  "More Information Requested"
                )
              }
            >
              📩 Request More Info
            </button>

            <button
              type="button"
              onClick={() =>
                updateStatus("Verified")
              }
            >
              ✓ Verify Case
            </button>

            <button
              type="button"
              onClick={() =>
                updateStatus("Escalated")
              }
            >
              ⚠ Escalate Case
            </button>

            <button
              type="button"
              onClick={() =>
                updateStatus("Closed")
              }
            >
              ✕ Close Case
            </button>

          </div>

        </section>

        {/* =====================================
            INTERNAL NOTES
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Internal Notes
              </h2>

              <p>
                Add notes for administrative review.
              </p>

            </div>

          </div>

          <textarea
            className="case-note-input"
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Write an internal review note..."
            rows={6}
          />

          <button
            type="button"
            className="save-note-button"
            onClick={saveNote}
          >
            Save Internal Note
          </button>

        </section>

        {/* =====================================
            AUDIT INFORMATION
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>

              <h2>
                Audit Information
              </h2>

              <p>
                Basic case activity information.
              </p>

            </div>

          </div>

          <div className="audit-card">

            <div>

              <span>
                Case Created
              </span>

              <strong>
                {currentCase.date}
              </strong>

            </div>

            <div>

              <span>
                Assigned Reviewer
              </span>

              <strong>
                AICTE Reviewer
              </strong>

            </div>

            <div>

              <span>
                Current Status
              </span>

              <strong>
                {status}
              </strong>

            </div>

          </div>

        </section>

        {/* =====================================
            BOTTOM NAVIGATION
        ===================================== */}

        <div className="case-bottom-navigation">

          <Link
            href="/admin/cases"
            className="back-link"
          >
            ← Back to Cases
          </Link>

          <button
            type="button"
            onClick={() => router.push("/admin")}
          >
            Admin Dashboard
          </button>

        </div>

      </div>

    </main>
  );
}