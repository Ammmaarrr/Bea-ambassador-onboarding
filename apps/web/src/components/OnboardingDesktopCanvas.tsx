"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { artboardActiveIndex } from "@/lib/design";
import {
  ACCOUNT_SOCIAL,
  ONBOARDING_CANVAS,
  STEP_PAGE_LAYOUTS,
} from "@/lib/onboarding-layout";
import {
  getMobileTitleLines,
  ONBOARDING_PAGE_CONTENT,
  type OnboardingPageKey,
} from "@/lib/onboarding-page-content";

import { AccountDesktopForm } from "./AccountDesktopForm";
import { ArtboardStepHeader } from "./ArtboardStepHeader";
import { OnboardingMobileContent, YoureInShareSection } from "./OnboardingMobileContent";
import { AppleIcon, GoogleIcon } from "./SocialProviderIcons";

type Props = {
  pageKey: OnboardingPageKey;
  children?: React.ReactNode;
};

function DesktopTitle({ pageKey }: { pageKey: OnboardingPageKey }) {
  const titleLines = getMobileTitleLines(pageKey);

  if (pageKey === "invites") {
    return (
      <h1 className="form-title onboarding-form-title font-canela">
        Everyone counts.
        <br />
        Your network creates
        <br />
        your impact
      </h1>
    );
  }

  if (pageKey === "youre-in") {
    return (
      <h1 className="form-title onboarding-form-title font-canela text-center">
        {titleLines[0]}
      </h1>
    );
  }

  return (
    <h1 className="form-title onboarding-form-title font-canela">
      {titleLines.map((line, i) => (
        <span key={line}>
          {line}
          {i < titleLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </h1>
  );
}

function AccountDesktopExtras() {
  return (
    <>
      <div className="onboarding-canvas__or-divider" style={{ left: 106, top: 920, width: 476 }}>
        <span className="or-text">or continue with</span>
      </div>
      {ACCOUNT_SOCIAL.map((btn) => (
        <button
          key={btn.label}
          type="button"
          className="btn-social onboarding-canvas__social-btn"
          style={{ left: btn.left, top: btn.top, width: btn.width, height: btn.height }}
        >
          {btn.label === "Google" ? <GoogleIcon /> : <AppleIcon />}
          {btn.label}
        </button>
      ))}
      <p className="onboarding-legal onboarding-canvas__legal" style={{ left: 76, top: 1040, width: 506 }}>
        By creating an account, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </p>
    </>
  );
}

/** Pixel-perfect inner onboarding steps — scaled 1367px canvas, selectable HTML. */
export function OnboardingDesktopCanvas({ pageKey, children }: Props) {
  const layout = STEP_PAGE_LAYOUTS[pageKey];
  const content = ONBOARDING_PAGE_CONTENT[pageKey];
  const activeIndex = artboardActiveIndex[pageKey];
  const { cta, copy, hero, centered } = layout;
  const isAccount = pageKey === "account";
  const isYoureIn = pageKey === "youre-in";
  const showStepper = pageKey !== "youre-in";
  const useAbsoluteCta = !isYoureIn && !isAccount;

  return (
    <div className="onboarding-canvas-viewport">
      <div
        className={`onboarding-canvas onboarding-canvas--${pageKey}`}
        style={{ width: ONBOARDING_CANVAS.width, height: ONBOARDING_CANVAS.height }}
      >
        <div className="onboarding-canvas__header">
          <ArtboardStepHeader activeIndex={activeIndex} showStepper={showStepper} />
        </div>

        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hero.src}
            alt={hero.alt ?? ""}
            className="onboarding-canvas__hero"
            width={hero.width}
            height={hero.height}
            draggable={false}
            style={{ left: hero.left, top: hero.top }}
          />
        ) : null}

        <div
          className={
            "ambassador-login-root onboarding-canvas__copy" +
            (centered ? " onboarding-canvas__copy--centered onboarding-youre-in-mobile" : "")
          }
          style={{ left: copy.left, top: copy.top, width: copy.width }}
        >
          {!isYoureIn && (
            <p className="form-eyebrow onboarding-step-eyebrow">{content.eyebrow}</p>
          )}

          <DesktopTitle pageKey={pageKey} />

          {isYoureIn && (
            <>
              <p className="onboarding-youre-in-school font-canela onboarding-heading text-center">
                University of Connecticut
              </p>
              <p className="form-eyebrow onboarding-step-eyebrow onboarding-youre-in-eyebrow text-center">
                {content.eyebrow}
              </p>
            </>
          )}

          <p className={"form-subtitle" + (isYoureIn ? " text-center mx-auto" : "")}>
            {content.subtitle}
          </p>

          {!isAccount && (
            <div className="onboarding-canvas__body">
              <OnboardingMobileContent pageKey={pageKey} />
              {children}
            </div>
          )}

          {isYoureIn && <YoureInShareSection />}
        </div>

        {isYoureIn && (
          <Link
            href={cta.href}
            className="btn-login onboarding-canvas__cta onboarding-youre-in-cta justify-center"
            style={{ left: cta.left, top: cta.top, width: cta.width, height: cta.height }}
          >
            <span>{cta.label}</span>
          </Link>
        )}

        {isAccount ? <AccountDesktopForm /> : null}

        {useAbsoluteCta && (
          <Link
            href={cta.href}
            className="btn-login onboarding-canvas__cta"
            style={{ left: cta.left, top: cta.top, width: cta.width, height: cta.height }}
          >
            <span>{cta.label}</span>
            <span className="btn-arrow">
              <ArrowRight strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        )}

        {isAccount && (
          <>
            <Link
              href={cta.href}
              className="btn-login onboarding-canvas__cta justify-center"
              style={{ left: cta.left, top: cta.top, width: cta.width, height: cta.height }}
            >
              <span>{cta.label}</span>
            </Link>
            <AccountDesktopExtras />
          </>
        )}
      </div>
    </div>
  );
}
