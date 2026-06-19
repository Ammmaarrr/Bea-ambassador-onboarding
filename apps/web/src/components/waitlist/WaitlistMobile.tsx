import type { WaitlistArtboardId } from "@/lib/waitlist";
import { isWaitlistStepId } from "@/lib/waitlist-page-content";

import { WaitlistConfirmedMobile } from "./WaitlistConfirmedMobile";
import { WaitlistLandingMobile } from "./WaitlistLandingMobile";
import { WaitlistPrizesMobile } from "./WaitlistPrizesMobile";
import { WaitlistStepMobile } from "./WaitlistStepMobile";

type Props = {
  artboardId: WaitlistArtboardId;
};

/** Phone-only waitlist layouts (<768px). */
export function WaitlistMobile({ artboardId }: Props) {
  if (artboardId === "1") {
    return <WaitlistLandingMobile />;
  }

  if (artboardId === "8") {
    return <WaitlistConfirmedMobile />;
  }

  if (artboardId === "9") {
    return <WaitlistPrizesMobile />;
  }

  if (isWaitlistStepId(artboardId)) {
    return <WaitlistStepMobile artboardId={artboardId} />;
  }

  return null;
}
