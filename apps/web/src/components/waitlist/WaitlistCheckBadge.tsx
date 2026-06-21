import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";

/** Check badge from artboard 8 — PNG disc with sparkle decorations. */
export function WaitlistCheckBadge() {
  return (
    <div className="waitlist-check-badge-wrap">
      {/* Sparkle decorations */}
      <svg className="waitlist-badge-sparkle waitlist-badge-sparkle--tl" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 0L11.5 8.5L20 10L11.5 11.5L10 20L8.5 11.5L0 10L8.5 8.5L10 0Z" fill="currentColor" />
      </svg>
      <svg className="waitlist-badge-sparkle waitlist-badge-sparkle--tr" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 0L8 5.5L13 7L8 8.5L7 14L6 8.5L1 7L6 5.5L7 0Z" fill="currentColor" />
      </svg>
      <svg className="waitlist-badge-sparkle waitlist-badge-sparkle--bl" viewBox="0 0 10 10" fill="none" aria-hidden>
        <path d="M5 0L5.8 4L10 5L5.8 6L5 10L4.2 6L0 5L4.2 4L5 0Z" fill="currentColor" />
      </svg>
      <svg className="waitlist-badge-sparkle waitlist-badge-sparkle--br" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M7 0L8 5.5L13 7L8 8.5L7 14L6 8.5L1 7L6 5.5L7 0Z" fill="currentColor" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={WAITLIST_ASSETS.confirmed.checkBadge}
        alt="Confirmed"
        className="waitlist-check-badge-img"
        width={96}
        height={96}
        draggable={false}
      />
    </div>
  );
}
