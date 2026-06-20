import { WelcomeDesktopCanvas } from "./WelcomeDesktopCanvas";
import { WelcomeMobile } from "./WelcomeMobile";

/** Welcome step — mobile stack + pixel-perfect 1367px canvas on tablet/desktop. */
export function WelcomeCoded() {
  return (
    <>
      <div className="onboarding-mobile-only">
        <WelcomeMobile />
      </div>
      <div className="onboarding-desktop-only">
        <WelcomeDesktopCanvas />
      </div>
    </>
  );
}
