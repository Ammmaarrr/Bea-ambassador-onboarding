import type overlays from "@/lib/artboard-overlays.json";

import { OnboardingDesktopCanvas } from "./OnboardingDesktopCanvas";
import { OnboardingMobileFlow } from "./OnboardingMobileFlow";
import { OnboardingShell } from "./OnboardingShell";

type Props = {
  pageKey: Exclude<keyof typeof overlays.pages, "welcome">;
  children?: React.ReactNode;
};

/** Onboarding step — mobile stack + pixel-perfect 1367px canvas on tablet/desktop. */
export function FullArtboardPage({ pageKey, children }: Props) {
  return (
    <OnboardingShell>
      <OnboardingMobileFlow pageKey={pageKey}>{children}</OnboardingMobileFlow>
      <div className="onboarding-desktop-only">
        <OnboardingDesktopCanvas pageKey={pageKey}>{children}</OnboardingDesktopCanvas>
      </div>
    </OnboardingShell>
  );
}
