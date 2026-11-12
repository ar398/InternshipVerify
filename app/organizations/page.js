"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrganizations() {
      try {
        const response = await fetch("/api/organizations", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load organizations.");
        }

        setOrganizations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrganizations();
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <p className="mt-4">Loading organizations...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Organizations</h1>

      {organizations.length === 0 ? (
        <p>No organizations found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((organization) => (
            <div
              key={organization.id}
              className="border rounded-lg p-6 shadow-sm bg-white"
            >
              <h2 className="text-xl font-bold">
                {organization.name}
              </h2>

              <p className="text-gray-500 mt-2">
                ID: {organization.id}
              </p>

              <p className="mt-4">
                <strong>Score:</strong> {organization.score}
              </p>

              <p>
                <strong>Status:</strong> {organization.status}
              </p>

              <p>
                <strong>Risk:</strong> {organization.risk}
              </p>

              <p className="text-gray-600 mt-3">
                {organization.description}
              </p>

              <Link
                href={`/organizations/${organization.id}`}
                className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}