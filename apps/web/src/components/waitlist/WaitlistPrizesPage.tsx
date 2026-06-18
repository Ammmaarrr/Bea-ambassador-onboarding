import { WAITLIST_ARTBOARDS } from "@/lib/waitlist";

import { WaitlistArtboardPage } from "./WaitlistArtboardPage";

/** Artboard 9 — Waitlist Prizes dashboard (desktop artboard PNG). */
export function WaitlistPrizesPage() {
  const mobile = (
    <div className="waitlist-root waitlist-prizes-mobile">
      <p className="waitlist-prizes-fallback">
        Waitlist Prizes (Artboard 9) — open on a wider screen for the full dashboard layout.
      </p>
      <a href={WAITLIST_ARTBOARDS["8"].href} className="waitlist-link-secondary">
        Back to confirmation
      </a>
    </div>
  );

  return <WaitlistArtboardPage artboardId="9" mobile={mobile} />;
}
