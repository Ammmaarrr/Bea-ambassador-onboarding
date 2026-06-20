"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { ACCOUNT_FIELDS } from "@/lib/onboarding-layout";

const FIELD_LABELS: Record<(typeof ACCOUNT_FIELDS)[number]["id"], string> = {
  name: "Full Name",
  email: "Email Address",
  password: "Password",
};

/** Label tops measured from account artboard (inputs sit in overlay boxes below). */
const FIELD_LABEL_TOP: Record<(typeof ACCOUNT_FIELDS)[number]["id"], number> = {
  name: 382,
  email: 525,
  password: 671,
};

/** Pixel-perfect account form — absolute positions from artboard-overlays.json. */
export function AccountDesktopForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {ACCOUNT_FIELDS.map((field) => (
        <div key={field.id}>
          <label
            className="onboarding-canvas__field-label"
            htmlFor={`account-${field.id}`}
            style={{ left: 76, top: FIELD_LABEL_TOP[field.id] }}
          >
            {FIELD_LABELS[field.id]}
          </label>

          <div
            className="onboarding-canvas__field-wrap"
            style={{
              left: field.left,
              top: field.top,
              width: field.width,
              height: field.height,
            }}
          >
            {field.id === "password" ? (
              <div className="onboarding-canvas__password-wrap">
                <input
                  className="onboarding-canvas__field-input"
                  id={`account-${field.id}`}
                  name={field.id}
                  type={showPassword ? "text" : "password"}
                  placeholder={field.placeholder}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="onboarding-canvas__password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.7} aria-hidden="true" />
                  ) : (
                    <Eye size={20} strokeWidth={1.7} aria-hidden="true" />
                  )}
                </button>
              </div>
            ) : (
              <input
                className="onboarding-canvas__field-input"
                id={`account-${field.id}`}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.id === "email" ? "email" : "name"}
              />
            )}
          </div>

          {field.id === "password" ? (
            <p className="onboarding-canvas__field-hint" style={{ left: 113, top: 772 }}>
              Must be at least 8 characters
            </p>
          ) : null}
        </div>
      ))}
    </>
  );
}
