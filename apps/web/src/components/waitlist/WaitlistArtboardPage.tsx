import type { WaitlistArtboardId } from "@/lib/waitlist";

import { WaitlistArtboardDesktop } from "./WaitlistArtboardDesktop";
import { WaitlistMobile } from "./WaitlistMobile";

type Props = {
  artboardId: WaitlistArtboardId;
  /** Extra overlay rendered only in the desktop scaled artboard (design-px space). */
  desktopChildren?: React.ReactNode;
};

/**
 * Phones (<768px): coded mobile layout.
 * Tablet, laptop, desktop (≥768px): scaled artboard PNG — unchanged.
 */
export function WaitlistArtboardPage({ artboardId, desktopChildren }: Props) {
  return (
    <>
      <div className="waitlist-page-mobile">
        <WaitlistMobile artboardId={artboardId} />
      </div>
      <div className="waitlist-page-desktop">
        <WaitlistArtboardDesktop artboardId={artboardId}>
          {desktopChildren}
        </WaitlistArtboardDesktop>
      </div>
    </>
  );
}
