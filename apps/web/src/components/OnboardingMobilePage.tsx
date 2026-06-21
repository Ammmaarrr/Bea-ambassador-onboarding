import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  getMobileTitleLines,
  ONBOARDING_PAGE_CONTENT,
  type OnboardingPageKey,
} from "@/lib/onboarding-page-content";
import { ARTBOARD } from "@/lib/design";

import { OnboardingMobileContent, YoureInShareSection } from "./OnboardingMobileContent";

type Props = {
  pageKey: OnboardingPageKey;
};

export function OnboardingMobilePage({ pageKey }: Props) {
  const content = ONBOARDING_PAGE_CONTENT[pageKey];
  const titleLines = getMobileTitleLines(pageKey);
  const isYoureIn = pageKey === "youre-in";
  const isAccount = pageKey === "account";

  if (isYoureIn) {
    return (
      <div
        className="ambassador-login-root onboarding-inner-mobile onboarding-inner-mobile--centered onboarding-youre-in-mobile"
        style={{ backgroundColor: ARTBOARD.bg }}
      >
        <div className="onboarding-inner-panel">
          <div className="right-form-wrap">
            <h1 className="form-title onboarding-form-title font-canela text-center">{titleLines[0]}</h1>

            <p className="onboarding-youre-in-school font-canela onboarding-heading">
              University of Connecticut
            </p>

            <p className="form-eyebrow onboarding-step-eyebrow onboarding-youre-in-eyebrow">
              {content.eyebrow}
            </p>

            <p className="form-subtitle text-center mx-auto">{content.subtitle}</p>

            <div className="onboarding-mobile-body">
              <OnboardingMobileContent pageKey={pageKey} />
            </div>

            <Link href={content.cta.href} className="btn-login onboarding-btn-link onboarding-youre-in-cta">
              <span>{content.cta.label}</span>
            </Link>

            <YoureInShareSection />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ambassador-login-root onboarding-inner-mobile" style={{ backgroundColor: ARTBOARD.bg }}>
      <div className="onboarding-inner-panel">
        <div className="right-form-wrap">
          <p className="form-eyebrow onboarding-step-eyebrow onboarding-step-eyebrow--sr">
            {content.eyebrow}
          </p>

          <h1 className="form-title onboarding-form-title font-canela">
            {titleLines.map((line, i) => (
              <span key={line}>
                {line}
                {i < titleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </h1>

          <p
            className={"form-subtitle" + (isAccount ? " onboarding-account-subtitle mb-6" : "")}
            style={isAccount ? { marginBottom: 24 } : undefined}
          >
            {content.subtitle.split("\n").map((line, i, lines) => (
              <span key={line}>
                {line}
                {i < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          <div className="onboarding-mobile-body">
            <OnboardingMobileContent pageKey={pageKey} />
          </div>

          {!isAccount && (
            <Link href={content.cta.href} className="btn-login onboarding-btn-link">
              <span>{content.cta.label}</span>
              <span className="btn-arrow">
                <ArrowRight strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          )}

          {isAccount && (
            <>
              <Link href={content.cta.href} className="btn-login onboarding-btn-link create-account-btn justify-center">
                <span>{content.cta.label}</span>
              </Link>
              <div className="or-divider divider-container">
                <span className="or-text">or continue with</span>
              </div>
              <div className="onboarding-social-row onboarding-social-row--text-only social-buttons-container">
                <button type="button" className="btn-social">
                  Google
                </button>
                <button type="button" className="btn-social">
                  Apple
                </button>
              </div>
              <p className="onboarding-legal">
                By creating an account, you agree to our{" "}
                <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
