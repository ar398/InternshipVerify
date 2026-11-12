"use client";

import Link from "next/link";

const complaints = [
  {
    id: "CASE-10234",
    organization: "Example Technologies",
    type: "Fee Demanded",
    student: "Student #1001",
    status: "Pending Review",
  },
  {
    id: "CASE-10189",
    organization: "Demo Solutions",
    type: "Fake Offer Letter",
    student: "Student #1002",
    status: "Under Review",
  },
  {
    id: "CASE-10176",
    organization: "Career Growth Hub",
    type: "No Response After Selection",
    student: "Student #1003",
    status: "Pending Review",
  },
  {
    id: "CASE-10152",
    organization: "WorkFast Services",
    type: "Personal Data Misuse",
    student: "Student #1004",
    status: "Pending Review",
  },
];

export default function ComplaintsPage() {
  return (
    <main className="admin-page">
      <div className="admin-container">

        <div className="admin-section">
          <Link href="/admin" className="back-link">
            ← Back to Admin Dashboard
          </Link>

          <p className="admin-label">AICTE ADMINISTRATION</p>

          <h1>Complaint Management</h1>

          <p>
            Review and manage internship complaints submitted by students.
          </p>
        </div>

        <div className="admin-section">

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Organization</th>
                  <th>Complaint Type</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {complaints.map((complaint) => (
                  <tr key={complaint.id}>

                    <td>
                      <strong className="case-id">
                        {complaint.id}
                      </strong>
                    </td>

                    <td>{complaint.organization}</td>

                    <td>{complaint.type}</td>

                    <td>{complaint.student}</td>

                    <td>
                      <span className="admin-status">
                        {complaint.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        href={`/admin/cases/${complaint.id}`}
                        className="review-button"
                      >
                        Review
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