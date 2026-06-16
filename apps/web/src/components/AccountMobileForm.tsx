"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.22.74 2.98.8 1.14-.23 2.23-.93 3.44-.84 1.46.12 2.56.7 3.28 1.77-3.01 1.78-2.31 5.61.3 6.7-.57 1.56-1.31 3.09-2 4.45zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

export function AccountMobileForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="onboarding-account-form" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="field-group">
        <label className="field-label" htmlFor="name">
          Full Name
        </label>
        <input
          className="field-input"
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="field-input"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
        />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="password">
          Password
        </label>
        <div className="input-wrap">
          <input
            className="field-input"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create your password"
            autoComplete="new-password"
            style={{ paddingRight: "46px" }}
          />
          <button
            type="button"
            className="password-toggle"
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
        <p className="onboarding-field-hint">Must be at least 8 characters</p>
      </div>

      <div className="or-divider">
        <span className="or-text">or continue with</span>
      </div>

      <button type="button" className="btn-social">
        <GoogleIcon />
        Google
      </button>
      <button type="button" className="btn-social">
        <AppleIcon />
        Apple
      </button>

      <p className="onboarding-legal">
        By creating an account, you agree to our{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
    </form>
  );
}
