"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { ACCOUNT_DESKTOP, ACCOUNT_FIELDS, type AccountFieldId } from "@/lib/onboarding-layout";

const FIELD_LABELS: Record<AccountFieldId, string> = {
  name: "Full Name",
  email: "Email Address",
  password: "Password",
};

/** Pixel-perfect account form — absolute positions from Artboard 4. */
export function AccountDesktopForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {ACCOUNT_FIELDS.map((field) => (
        <div key={field.id}>
          <label
            className="onboarding-canvas__field-label"
            htmlFor={`account-${field.id}`}
            style={{ left: ACCOUNT_DESKTOP.labelLeft, top: ACCOUNT_DESKTOP.labelTops[field.id] }}
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
            <p
              className="onboarding-canvas__field-hint"
              style={{ left: ACCOUNT_DESKTOP.hint.left, top: ACCOUNT_DESKTOP.hint.top }}
            >
              Must be at least 8 characters
            </p>
          ) : null}
        </div>
      ))}
    </>
  );
}
