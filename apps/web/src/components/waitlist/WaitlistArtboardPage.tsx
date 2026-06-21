import type { WaitlistArtboardId } from "@/lib/waitlist";

import { WaitlistDesktopCanvas } from "./WaitlistDesktopCanvas";
import { WaitlistMobile } from "./WaitlistMobile";

type Props = {
  artboardId: WaitlistArtboardId;
};

/** Mobile stack + pixel-perfect 1367px desktop canvas (matches onboarding). */
export function WaitlistArtboardPage({ artboardId }: Props) {
  if (artboardId === "8") {
    return (
      <>
        <div className="waitlist-page-mobile waitlist-page-coded waitlist-page-mobile--confirmed waitlist-mobile-only">
          <WaitlistMobile artboardId="8" />
        </div>
        <div className="waitlist-page-desktop waitlist-desktop-only">
          <WaitlistDesktopCanvas artboardId="8" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="waitlist-page-mobile waitlist-page-coded waitlist-mobile-only">
        <WaitlistMobile artboardId={artboardId} />
      </div>
      <div className="waitlist-page-desktop waitlist-desktop-only">
        <WaitlistDesktopCanvas artboardId={artboardId} />
      </div>
    </>
  );
}
