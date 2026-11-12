"use client";

import { useState } from "react";

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    internshipTitle: "",
    complaintType: "",
    description: "",
    email: "",
    phone: "",
    evidence: null,
  });

  function handleChange(event) {
    const { name, value, files } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizationName: formData.organizationName,
          internshipTitle: formData.internshipTitle,
          complaintType: formData.complaintType,
          description: formData.description,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          text || "Server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to submit report."
        );
      }

      setCaseId(data.report.caseId);
      setSubmitted(true);
    } catch (error) {
      console.error("REPORT SUBMISSION ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleNewReport() {
    setSubmitted(false);
    setCaseId("");
    setError("");

    setFormData({
      organizationName: "",
      internshipTitle: "",
      complaintType: "",
      description: "",
      email: "",
      phone: "",
      evidence: null,
    });
  }

  if (submitted) {
    return (
      <main className="report-page">
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Report Submitted Successfully
          </h1>

          <p>
            Thank you for helping students identify potentially unsafe
            internship opportunities.
          </p>

          <div className="case-number">
            <span>
              Complaint Reference
            </span>

            <strong>
              {caseId}
            </strong>
          </div>

          <p className="success-note">
            Your report will be reviewed according to the platform's
            verification and case-review process.
          </p>

          <button
            className="new-report-button"
            onClick={handleNewReport}
          >
            Submit Another Report
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="report-page">

      <div className="report-container">

        <div className="report-heading">

          <span className="small-title">
            INTERNSHIP VERIFICATION
          </span>

          <h1>
            Report an Internship
          </h1>

          <p>
            If you believe an internship opportunity may be suspicious,
            provide the available details and evidence below.
          </p>

        </div>

        <div className="privacy-notice">

          <strong>
            🔒 Privacy Notice
          </strong>

          <p>
            Your contact information is kept private and is used for
            complaint review and follow-up.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="report-form"
        >

          {/* Organization Details */}

          <section className="form-section">

            <h2>
              1. Organization Details
            </h2>

            <p className="section-description">
              Enter the details of the organization offering the internship.
            </p>

            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="organizationName">
                  Organization Name *
                </label>

                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  placeholder="Enter organization name"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="internshipTitle">
                  Internship Title *
                </label>

                <input
                  id="internshipTitle"
                  name="internshipTitle"
                  type="text"
                  placeholder="e.g. Web Development Intern"
                  value={formData.internshipTitle}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </section>

          {/* Complaint Type */}

          <section className="form-section">

            <h2>
              2. Complaint Type
            </h2>

            <p className="section-description">
              Select the issue that best describes your experience.
            </p>

            <div className="form-group">

              <label htmlFor="complaintType">
                Complaint Type *
              </label>

              <select
                id="complaintType"
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select complaint type
                </option>

                <option value="Fee Demanded">
                  Fee Demanded
                </option>

                <option value="Fake Offer Letter">
                  Fake Offer Letter
                </option>

                <option value="No Response After Selection">
                  No Response After Selection
                </option>

                <option value="Work-from-Home / Data-Entry Scam Pattern">
                  Work-from-Home / Data-Entry Scam Pattern
                </option>

                <option value="Personal Data Misuse">
                  Personal Data Misuse
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

          </section>

          {/* Description */}

          <section className="form-section">

            <h2>
              3. Describe the Issue
            </h2>

            <p className="section-description">
              Provide as much factual information as possible.
            </p>

            <div className="form-group">

              <label htmlFor="description">
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                rows="7"
                placeholder="Describe what happened..."
                value={formData.description}
                onChange={handleChange}
                required
              />

              <small>
                Avoid sharing unnecessary sensitive personal information.
              </small>

            </div>

          </section>

          {/* Evidence */}

          <section className="form-section">

            <h2>
              4. Evidence
            </h2>

            <p className="section-description">
              Upload supporting evidence such as an offer letter,
              screenshots, or relevant documents.
            </p>

            <div className="upload-box">

              <div className="upload-icon">
                📎
              </div>

              <label htmlFor="evidence">
                Choose Evidence File
              </label>

              <input
                id="evidence"
                name="evidence"
                type="file"
                onChange={handleChange}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              />

              {formData.evidence && (
                <p className="selected-file">
                  Selected: {formData.evidence.name}
                </p>
              )}

              <small>
                Accepted: PDF, JPG, PNG, DOC, DOCX
              </small>

            </div>

          </section>

          {/* Contact Information */}

          <section className="form-section">

            <h2>
              5. Your Contact Information
            </h2>

            <p className="section-description">
              This information is private and may be used if additional
              information is required.
            </p>

            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="email">
                  Email Address *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>

          {/* Submit */}

          <div className="submit-area">

            {error && (
              <p style={{ color: "red" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="submit-report-button"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Complaint"}
            </button>

            <p>
              By submitting this report, you confirm that the information
              provided is accurate to the best of your knowledge.
            </p>

          </div>

        </form>

      </div>

    </main>
  );
}