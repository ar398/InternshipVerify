"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckOrganization() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      setResults([]);
      setSearched(false);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/organizations", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch organizations.");
      }

      const filteredOrganizations = data.filter((organization) =>
        organization.name.toLowerCase().includes(searchText)
      );

      setResults(filteredOrganizations);
      setSearched(true);
    } catch (error) {
      console.error("SEARCH ORGANIZATION ERROR:", error);
      setError(error.message);
      setResults([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  function getRiskClass(riskLevel) {
    if (riskLevel.includes("Verified")) {
      return "risk-low";
    }

    if (riskLevel.includes("Medium")) {
      return "risk-medium";
    }

    if (riskLevel.includes("High")) {
      return "risk-high";
    }

    return "risk-critical";
  }

  return (
    <main className="check-page">
      <div className="check-container">

        <div className="check-heading">
          <span className="small-title">
            INTERNSHIP VERIFICATION
          </span>

          <h1>Check an Organization</h1>

          <p>
            Search for an internship provider before applying.
            Review available verification information and risk indicators.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="organization-search"
        >
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Enter organization name..."
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="no-result">
            <div className="no-result-icon">
              !
            </div>

            <h2>Something went wrong</h2>

            <p>{error}</p>
          </div>
        )}

        {!error && searched && results.length === 0 && !loading && (
          <div className="no-result">

            <div className="no-result-icon">
              !
            </div>

            <h2>Organization Not Found</h2>

            <p>
              We could not find an organization matching:
            </p>

            <strong>"{search}"</strong>

            <div>
              <Link
                href="/report"
                className="report-button"
              >
                Report This Internship
              </Link>
            </div>

          </div>
        )}

        {!error && results.length > 0 && (
          <section className="results-section">

            <div className="results-title">
              <h2>Search Results</h2>

              <span>
                {results.length} organization
                {results.length > 1 ? "s" : ""} found
              </span>
            </div>

            <div className="results-list">

              {results.map((organization) => (
                <div
                  key={organization.id}
                  className="organization-result"
                >

                  <div className="organization-info">

                    <div className="organization-icon">
                      {organization.name.charAt(0)}
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
                      <span>Score</span>

                      <strong>
                        {organization.score}/100
                      </strong>
                    </div>

                    <p>
                      Complaints: {organization.complaints}
                    </p>

                    <Link
                      href={`/organizations/${organization.id}`}
                      className="details-button"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>
              ))}

            </div>

          </section>
        )}

      </div>
    </main>
  );
}