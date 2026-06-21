"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import {
  ACCOUNT_BLOCK_GAP,
  ACCOUNT_FIELDS,
  type AccountFieldId,
} from "@/lib/onboarding-layout";

const FIELD_LABELS: Record<AccountFieldId, string> = {
  name: "Full Name",
  email: "Email Address",
  password: "Password",
};

const FIELD_GAPS: Record<AccountFieldId, { label: number; input: number }> = {
  name: { label: 0, input: ACCOUNT_BLOCK_GAP.afterNameLabel },
  email: { label: ACCOUNT_BLOCK_GAP.afterNameInput, input: ACCOUNT_BLOCK_GAP.afterEmailLabel },
  password: {
    label: ACCOUNT_BLOCK_GAP.afterEmailInput,
    input: ACCOUNT_BLOCK_GAP.afterPasswordLabel,
  },
};

/** Pixel-perfect account form — stacked inside padded desktop column. */
export function AccountDesktopForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {ACCOUNT_FIELDS.map((field) => (
        <div key={field.id}>
          <label
            className="onboarding-canvas__field-label onboarding-canvas__field-label--stacked"
            htmlFor={`account-${field.id}`}
            style={{ marginTop: FIELD_GAPS[field.id].label }}
          >
            {FIELD_LABELS[field.id]}
          </label>

          <div
            className={
              "onboarding-canvas__field-wrap onboarding-canvas__field-wrap--stacked" +
              (field.id === "password" ? " onboarding-canvas__field-wrap--password" : "")
            }
            style={{
              marginTop: FIELD_GAPS[field.id].input,
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
              className="onboarding-canvas__field-hint onboarding-canvas__field-hint--stacked"
              style={{ marginTop: ACCOUNT_BLOCK_GAP.afterPasswordInput }}
            >
              Must be at least 8 characters
            </p>
          ) : null}
        </div>
      ))}
    </>
  );
}
