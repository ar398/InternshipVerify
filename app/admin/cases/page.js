"use client";

import Link from "next/link";

const cases = [
  {
    id: "CASE-10234",
    organization: "Example Technologies",
    type: "Fee Demanded",
    priority: "High",
    status: "Pending Review",
  },
  {
    id: "CASE-10189",
    organization: "Demo Solutions",
    type: "Fake Offer Letter",
    priority: "Medium",
    status: "Under Review",
  },
  {
    id: "CASE-10176",
    organization: "Career Growth Hub",
    type: "No Response After Selection",
    priority: "Medium",
    status: "Pending Review",
  },
];

export default function CasesPage() {
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

          <h1>Case Management</h1>

          <p>
            Review and manage internship verification cases.
          </p>

        </div>

        <div className="admin-section">

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>Case ID</th>
                  <th>Organization</th>
                  <th>Complaint</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {cases.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <strong className="case-id">
                        {item.id}
                      </strong>
                    </td>

                    <td>{item.organization}</td>

                    <td>{item.type}</td>

                    <td>
                      <span className="priority-badge priority-medium">
                        {item.priority}
                      </span>
                    </td>

                    <td>
                      <span className="admin-status">
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        href="/admin/complaints"
                        className="review-button"
                      >
                        Open
                      </Link>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </main>
  );
}