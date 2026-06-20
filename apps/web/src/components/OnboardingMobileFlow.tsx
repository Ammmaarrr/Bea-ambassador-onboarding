import { artboardActiveIndex } from "@/lib/design";
import type { OnboardingPageKey } from "@/lib/onboarding-page-content";

import { MobileNav } from "./MobileNav";
import { OnboardingMobilePage } from "./OnboardingMobilePage";
import { OnboardingStepper } from "./OnboardingStepper";

type Props = {
  pageKey: OnboardingPageKey;
  children?: React.ReactNode;
};

/** Phone onboarding — compact stepper + stacked content. */
export function OnboardingMobileFlow({ pageKey, children }: Props) {
  const activeIndex = artboardActiveIndex[pageKey];

  return (
    <div className="onboarding-mobile-only">
      <MobileNav activeIndex={activeIndex} />
      {pageKey !== "youre-in" && (
        <OnboardingStepper activeIndex={activeIndex} layout="mobile" />
      )}
      <OnboardingMobilePage pageKey={pageKey} />
      {children}
    </div>
  );
}
