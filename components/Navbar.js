"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();

        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("NAVBAR AUTH ERROR:", error);
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
      alert("Logout failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link href="/" className="logo">
          InternshipVerify
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>

          <Link href="/check">
            Check Organization
          </Link>

          <Link href="/report">
            Report
          </Link>

          <Link href="/report/track">
            Track Report
          </Link>

          {!checkingAuth && user && (
            <Link href="/dashboard">
              Dashboard
            </Link>
          )}

          {!checkingAuth && !user && (
            <Link href="/login">
              Login
            </Link>
          )}

          {!checkingAuth && user && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}