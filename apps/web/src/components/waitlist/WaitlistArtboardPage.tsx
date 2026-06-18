import type { WaitlistOverlayPageKey } from "@/lib/waitlist-types";

import { WaitlistArtboardDesktop } from "./WaitlistArtboardDesktop";

type Props = {
  pageKey: WaitlistOverlayPageKey;
  mobile: React.ReactNode;
};

/**
 * Phones (<768px): coded mobile layout from artboard specs.
 * Tablet+ (≥768px): scaled artboard PNG with pixel-aligned overlays.
 */
export function WaitlistArtboardPage({ pageKey, mobile }: Props) {
  return (
    <>
      <div className="waitlist-page-mobile">{mobile}</div>
      <div className="waitlist-page-desktop">
        <WaitlistArtboardDesktop pageKey={pageKey} />
      </div>
    </>
  );
}
