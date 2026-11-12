
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        // Not logged in is normal on the login page.
        if (!response.ok) return;

        const data = await response.json();

        if (data.authenticated && data.user) {
          if (data.user.role === "ADMIN") {
            window.location.replace("/admin");
          } else if (data.user.role === "STUDENT") {
            window.location.replace("/dashboard");
          }
        }
      } catch (err) {
        console.error("AUTH CHECK ERROR:", err);
      }
    }

    checkAuth();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password.");
      }

      if (!data.user || !data.user.role) {
        throw new Error("Login response is missing user information.");
      }

      const actualRole = data.user.role.toUpperCase();
      const selectedRole = role.toUpperCase();

      if (actualRole !== selectedRole) {
        throw new Error(
          `This account is registered as ${actualRole}. Please select the correct role.`
        );
      }

      console.log("Login successful:", data.user);

      if (actualRole === "ADMIN") {
        window.location.replace("/admin");
      } else if (actualRole === "STUDENT") {
        window.location.replace("/dashboard");
      } else {
        throw new Error("Unknown account role.");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">IV</div>
          <h1>Welcome Back</h1>
          <p>Login to InternshipVerify</p>
        </div>

        <div className="role-selector">
          <button
            type="button"
            className={role === "student" ? "role-active" : ""}
            onClick={() => setRole("student")}
          >
            🎓 Student
          </button>

          <button
            type="button"
            className={role === "admin" ? "role-active" : ""}
            onClick={() => setRole("admin")}
          >
            🛡️ Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="forgot-password">
            <Link href="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <Link href="/register">
            Create an Account
          </Link>
        </div>
      </div>
    </main>
  );
}
