"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/login";
            return;
          }

          throw new Error(
            data.error || "Failed to load profile."
          );
        }

        setUser(data.user);

        setFormData({
          name: data.user.name,
          email: data.user.email,
        });
      } catch (error) {
        console.error("PROFILE PAGE ERROR:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleEdit() {
    setError("");
    setSuccess("");

    setFormData({
      name: user.name,
      email: user.email,
    });

    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
    setError("");
    setSuccess("");

    setFormData({
      name: user.name,
      email: user.email,
    });
  }

  async function handleSave(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update profile."
        );
      }

      setUser(data.user);

      setFormData({
        name: data.user.name,
        email: data.user.email,
      });

      setEditing(false);

      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  function handlePasswordCancel() {
    setChangingPassword(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setError("");
    setSuccess("");
  }

  async function handlePasswordSave(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setError("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setError("New passwords do not match.");
      return;
    }

    setPasswordSaving(true);

    try {
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to change password."
        );
      }

      setSuccess(
        "Password changed successfully."
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setChangingPassword(false);
    } catch (error) {
      console.error(
        "PASSWORD CHANGE ERROR:",
        error
      );

      setError(error.message);
    } finally {
      setPasswordSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-container">
          <h2>Loading profile...</h2>
        </div>
      </main>
    );
  }

  if (error && !user) {
    return (
      <main className="profile-page">
        <div className="profile-container">
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-heading">
          <span className="small-title">
            MY ACCOUNT
          </span>

          <h1>My Profile</h1>

          <p>
            View and manage your InternshipVerify
            account information.
          </p>
        </div>

        {success && (
          <div className="profile-success">
            {success}
          </div>
        )}

        {error && (
          <div className="profile-error">
            {error}
          </div>
        )}

        <section className="profile-card">

          <div className="profile-header">

            <div className="profile-avatar">
              {user.name
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2>{user.name}</h2>

              <span className="profile-role">
                {user.role}
              </span>
            </div>

          </div>

          {editing ? (
            <form
              onSubmit={handleSave}
              className="profile-edit-form"
            >

              <div className="profile-edit-group">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-edit-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-edit-actions">

                <button
                  type="submit"
                  className="profile-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="profile-button secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

              </div>

            </form>
          ) : (
            <div className="profile-details">

              <div className="profile-detail">
                <span>Name</span>
                <strong>
                  {user.name}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Email Address</span>
                <strong>
                  {user.email}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Account ID</span>
                <strong>
                  {user.id}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Role</span>
                <strong>
                  {user.role}
                </strong>
              </div>

              <div className="profile-detail">
                <span>Account Created</span>

                <strong>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </strong>
              </div>

            </div>
          )}

        </section>

        {!editing && (
          <section className="profile-actions">

            <button
              type="button"
              className="profile-button"
              onClick={handleEdit}
            >
              Edit Profile
            </button>

            <Link
              href="/dashboard"
              className="profile-button secondary"
            >
              ← Back to Dashboard
            </Link>

            <Link
              href="/report"
              className="profile-button secondary"
            >
              Submit a Report
            </Link>

          </section>
        )}

        <section className="password-card">

          <div className="password-heading">
            <h2>Change Password</h2>

            <p>
              Update your account password securely.
            </p>
          </div>

          {!changingPassword ? (
            <button
              type="button"
              className="profile-button"
              onClick={() => {
                setError("");
                setSuccess("");
                setChangingPassword(true);
              }}
            >
              Change Password
            </button>
          ) : (
            <form
              onSubmit={handlePasswordSave}
              className="password-form"
            >

              <div className="profile-edit-group">
                <label htmlFor="currentPassword">
                  Current Password
                </label>

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={
                    passwordData.currentPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  required
                />
              </div>

              <div className="profile-edit-group">
                <label htmlFor="newPassword">
                  New Password
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={
                    passwordData.newPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  required
                />
              </div>

              <div className="profile-edit-group">
                <label htmlFor="confirmPassword">
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={
                    passwordData.confirmPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  required
                />
              </div>

              <div className="profile-edit-actions">

                <button
                  type="submit"
                  className="profile-button"
                  disabled={passwordSaving}
                >
                  {passwordSaving
                    ? "Changing Password..."
                    : "Change Password"}
                </button>

                <button
                  type="button"
                  className="profile-button secondary"
                  onClick={handlePasswordCancel}
                  disabled={passwordSaving}
                >
                  Cancel
                </button>

              </div>

            </form>
          )}

        </section>

        <section className="profile-notice">

          <div className="profile-notice-icon">
            🛡️
          </div>

          <div>
            <h3>Your Account</h3>

            <p>
              Your account information is securely
              connected to your InternshipVerify
              profile.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}