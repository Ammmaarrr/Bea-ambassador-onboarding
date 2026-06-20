import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";

/** Check badge from artboard 8 — PNG rays + disc (no baked title text). */
export function WaitlistCheckBadge() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={WAITLIST_ASSETS.confirmed.checkBadge}
      alt="Confirmed"
      className="waitlist-check-badge-img"
      width={96}
      height={96}
      draggable={false}
    />
  );
}
