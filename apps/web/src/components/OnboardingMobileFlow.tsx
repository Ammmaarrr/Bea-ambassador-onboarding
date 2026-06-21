import { ONBOARDING_PAGE_CONTENT, type OnboardingPageKey } from "@/lib/onboarding-page-content";

import { MobileNav } from "./MobileNav";
import { OnboardingMobilePage } from "./OnboardingMobilePage";
import { OnboardingStepper } from "./OnboardingStepper";

type Props = {
  pageKey: OnboardingPageKey;
  children?: React.ReactNode;
};

/** Phone onboarding — compact stepper + stacked content. */
export function OnboardingMobileFlow({ pageKey, children }: Props) {
  const activeIndex = ONBOARDING_PAGE_CONTENT[pageKey].step - 1;

  return (
    <div className="onboarding-mobile-only onboarding-page-mobile">
      <MobileNav activeIndex={activeIndex} />
      {pageKey !== "youre-in" && (
        <OnboardingStepper activeIndex={activeIndex} layout="mobile" />
      )}
      <OnboardingMobilePage pageKey={pageKey} />
      {children}
    </div>
  );
}
