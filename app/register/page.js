"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data.authenticated) {
          if (data.user.role === "ADMIN") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/dashboard";
          }
        }
      } catch (error) {
        console.error("REGISTER AUTH CHECK ERROR:", error);
      }
    }

    checkAuth();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "STUDENT",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create account."
        );
      }

      setSuccess(true);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="auth-page">
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Account Created!</h1>

          <p>
            Your {role} account has been successfully created.
          </p>

          <Link
            href="/login"
            className="auth-submit-button success-login"
          >
            Go to Login
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="register-card">

        <div className="auth-header">

          <div className="auth-logo">
            IV
          </div>

          <h1>Create Account</h1>

          <p>
            Join InternshipVerify
          </p>

        </div>

        <div className="role-selector">

          <button
            type="button"
            className={
              role === "student"
                ? "role-active"
                : ""
            }
            onClick={() => setRole("student")}
          >
            🎓 Student
          </button>

          <button
            type="button"
            className={
              role === "organization"
                ? "role-active"
                : ""
            }
            onClick={() => setRole("organization")}
          >
            🏢 Organization
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <div className="form-group">

            <label htmlFor="name">
              Full Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

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

          {role === "student" && (
            <div className="form-group">

              <label htmlFor="college">
                College / University
              </label>

              <input
                id="college"
                name="college"
                type="text"
                placeholder="Enter college or university"
                value={formData.college}
                onChange={handleChange}
              />

            </div>
          )}

          <div className="form-grid">

            <div className="form-group">

              <label htmlFor="password">
                Password *
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password *
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Already have an account?
          </p>

          <Link href="/login">
            Login
          </Link>

        </div>

      </div>
    </main>
  );
}