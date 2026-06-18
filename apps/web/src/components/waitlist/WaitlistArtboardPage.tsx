import type { WaitlistArtboardId } from "@/lib/waitlist";

import { WaitlistArtboardDesktop } from "./WaitlistArtboardDesktop";

type Props = {
  artboardId: WaitlistArtboardId;
  mobile: React.ReactNode;
};

/**
 * Phones (<768px): coded mobile layout from artboard specs.
 * Tablet+ (≥768px): scaled artboard PNG with pixel-aligned overlays.
 */
export function WaitlistArtboardPage({ artboardId, mobile }: Props) {
  return (
    <>
      <div className="waitlist-page-mobile">{mobile}</div>
      <div className="waitlist-page-desktop">
        <WaitlistArtboardDesktop artboardId={artboardId} />
      </div>
    </>
  );
}
