import Link from "next/link";
import overlays from "@/lib/artboard-overlays.json";
import { ARTBOARD, fontAptos } from "@/lib/design";
import { navigation, onboarding } from "@/lib/config";

/** Stepper + login overlay for artboard pages 2–5. */
export function ArtboardStepHeader({
  activeIndex,
  showStepper = true,
}: {
  activeIndex: number;
  showStepper?: boolean;
}) {
  const { loginLink, stepNav, width } = overlays;
  const headerHeight = showStepper ? 125 : loginLink.top + loginLink.height + 12;

  return (
    <div
      className="artboard-header hidden min-[1367px]:block"
      style={{
        width,
        height: headerHeight,
        backgroundColor: ARTBOARD.bg,
        fontFamily: fontAptos,
      }}
      aria-label={showStepper ? "Onboarding progress" : undefined}
    >
      <p
        className="artboard-login"
        style={{
          left: loginLink.left,
          top: loginLink.top,
          width: loginLink.width,
          fontFamily: fontAptos,
        }}
      >
        {onboarding.header.loginPrompt}{" "}
        <Link href={navigation.login}>{onboarding.header.loginLabel}</Link>
      </p>

      {showStepper && (
        <nav className="artboard-stepper" style={{ fontFamily: fontAptos }}>
          {stepNav.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <Link
                key={step.label}
                href={step.href}
                className="artboard-step"
                style={{ left: step.left, top: step.top }}
              >
                <span
                  className={
                    "artboard-step-circle" +
                    (isActive ? " artboard-step-circle--active" : "")
                  }
                >
                  {i + 1}
                </span>
                <span
                  className={
                    "artboard-step-label" +
                    (isActive ? " artboard-step-label--active" : "")
                  }
                >
                  {step.label}
                </span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
