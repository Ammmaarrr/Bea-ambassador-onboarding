import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";

/** Hero check — artboard-extracted badge (disc + sparkles, no title bleed). */
export function WaitlistCheckBadge() {
  return (
    <div className="waitlist-check-badge-wrap" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={WAITLIST_ASSETS.confirmed.checkBadge}
        alt=""
        className="waitlist-check-badge-img"
        width={265}
        height={138}
        draggable={false}
      />
    </div>
  );
}
