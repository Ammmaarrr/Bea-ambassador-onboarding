"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useMemo, useState, type CSSProperties, type FormEvent } from "react";

import { loginRequest, socialAuthRequest } from "@/lib/auth-client";
import { login as loginConfig, navigation } from "@/lib/config";
import type { LoginFieldConfig } from "@/lib/config";

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

function SocialIcon({ provider }: { provider: "google" | "apple" }) {
  return provider === "google" ? <GoogleIcon /> : <AppleIcon />;
}

function LoginField({
  field,
  value,
  visible,
  onChange,
  onToggleVisibility,
}: {
  field: LoginFieldConfig;
  value: string;
  visible: boolean;
  onChange: (value: string) => void;
  onToggleVisibility?: () => void;
}) {
  const isPassword = field.type === "password";

  return (
    <div className="field-group">
      <label className="field-label" htmlFor={field.id}>
        {field.label}
      </label>
      <div className="input-wrap">
        <input
          className="field-input"
          style={isPassword && field.showToggle ? { paddingRight: "46px" } : undefined}
          type={isPassword && visible ? "text" : field.type}
          id={field.id}
          name={field.id}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && field.showToggle && (
          <button
            className="password-toggle"
            type="button"
            aria-label="Toggle password visibility"
            onClick={onToggleVisibility}
          >
            {visible ? (
              <EyeOff size={20} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Eye size={20} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function AmbassadorLoginPage() {
  const router = useRouter();
  const { leftPanel, header, form, footer, api, theme } = loginConfig;

  const initialValues = useMemo(
    () =>
      Object.fromEntries(form.fields.map((field) => [field.id, ""])) as Record<string, string>,
    [form.fields],
  );

  const [values, setValues] = useState(initialValues);
  const [remember, setRemember] = useState(form.rememberMe.defaultChecked);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const themeStyle = useMemo(
    () => theme.cssVariables as CSSProperties,
    [theme.cssVariables],
  );

  const backHref = header.backHref || navigation.home;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await loginRequest(api, {
        email: values.email ?? "",
        password: values.password ?? "",
        remember,
      });
      router.push(result.redirectTo ?? api.redirectOnSuccess);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = async (provider: "google" | "apple") => {
    setError(null);
    setLoading(true);

    try {
      const result = await socialAuthRequest(api, { provider });
      router.push(result.redirectTo ?? api.redirectOnSuccess);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ambassador-login-root" style={themeStyle}>
      <div className="page-wrapper">
        <div className="login-layout">
          <div className="left-panel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={leftPanel.image} alt={leftPanel.imageAlt} />
            <div className="left-overlay" />
            <div className="left-brand">{leftPanel.brand}</div>
            <div className="left-content">
              <p className="left-eyebrow">{leftPanel.eyebrow}</p>
              <h2 className="left-headline">
                {leftPanel.headline.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < leftPanel.headline.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <div className="left-divider" />
              <p className="left-body">{leftPanel.body}</p>
            </div>
          </div>

          <div className="right-panel">
            <div className="right-header">
              <Link href={backHref} className="back-link">
                <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
                {header.backLabel}
              </Link>
            </div>

            <div className="right-form-wrap">
              <p className="form-eyebrow">{form.eyebrow}</p>
              <h1 className="form-title">{form.title}</h1>
              <p className="form-subtitle">{form.subtitle}</p>

              <form onSubmit={handleSubmit} noValidate>
                {error && (
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}

                {form.fields.map((field) => (
                  <LoginField
                    key={field.id}
                    field={field}
                    value={values[field.id] ?? ""}
                    visible={passwordVisible}
                    onChange={(next) => setValues((current) => ({ ...current, [field.id]: next }))}
                    onToggleVisibility={
                      field.showToggle ? () => setPasswordVisible((v) => !v) : undefined
                    }
                  />
                ))}

                <div className="form-row">
                  <label className="remember-label" htmlFor="remember">
                    <input
                      className="remember-checkbox"
                      type="checkbox"
                      id="remember"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    {form.rememberMe.label}
                  </label>
                  <Link href={form.forgotPassword.href} className="forgot-link">
                    {form.forgotPassword.label}
                  </Link>
                </div>

                <button className="btn-login" type="submit" disabled={loading}>
                  <span>{loading ? form.submit.loadingLabel : form.submit.label}</span>
                  <span className="btn-arrow">
                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                </button>
              </form>

              <div className="or-divider">
                <span className="or-text">{form.divider}</span>
              </div>

              {form.social.map((btn) => (
                <button
                  key={btn.id}
                  className="btn-social"
                  type="button"
                  disabled={loading}
                  onClick={() => handleSocial(btn.provider)}
                >
                  <SocialIcon provider={btn.provider} />
                  {btn.label}
                </button>
              ))}

              <div className="apply-section">
                <p>{form.apply.prompt}</p>
                <Link href={form.apply.href || navigation.onboardingStart} className="apply-link">
                  {form.apply.linkLabel}
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="page-footer">
          {footer.prefix}{" "}
          <a href={footer.emailHref}>{footer.email}</a>
        </footer>
      </div>
    </div>
  );
}
