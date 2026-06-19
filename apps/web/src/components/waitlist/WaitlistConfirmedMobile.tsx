import Link from "next/link";
import { ChevronLeft, Copy, Heart } from "lucide-react";

import { WAITLIST_ARTBOARDS } from "@/lib/waitlist";
import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCheckBadge } from "./WaitlistCheckBadge";
import { WaitlistPerkCards } from "./WaitlistPerkCards";
import { WaitlistShareIcons } from "./WaitlistShareIcons";

/** Phone-only confirmed screen (artboard 8). */
export function WaitlistConfirmedMobile() {
  const meta = WAITLIST_ARTBOARDS["8"];
  const content = WAITLIST_CONFIRMED_CONTENT;

  return (
    <div className="waitlist-root">
      <div className="waitlist-confirmed">
        <div className="waitlist-confirmed-top">
          <Link href={meta.backHref!} className="waitlist-back" aria-label="Go back">
            <ChevronLeft size={22} strokeWidth={1.75} />
          </Link>
          <Link href={content.waitingRoom.href} className="waitlist-waiting-room">
            {content.waitingRoom.label}
            <span aria-hidden> ↗</span>
          </Link>
        </div>

        <WaitlistCheckBadge />

        <h1 className="waitlist-confirmed-title">{content.title}</h1>
        <p className="waitlist-confirmed-sub">{content.subtitle}</p>

        <div className="waitlist-rank-card">
          <p className="waitlist-rank-eyebrow">{content.rankEyebrow}</p>
          <p className="waitlist-rank-number">{content.rankNumber}</p>
          <p className="waitlist-rank-city">{content.rankCity}</p>

          <div className="waitlist-rank-divider" />

          <div className="waitlist-rank-progress-label">
            <span>{content.progressLabel}</span>
            <span>{content.progressPercent}</span>
          </div>
          <div className="waitlist-rank-progress-bar">
            <div className="waitlist-rank-progress-fill" />
          </div>
          <p className="waitlist-rank-hint">{content.progressHint}</p>
        </div>

        <div className="waitlist-section-divider">{content.perksEyebrow}</div>
        <WaitlistPerkCards />

        <div className="waitlist-section-divider">{content.shareEyebrow}</div>
        <WaitlistShareIcons />

        <button type="button" className="waitlist-btn-primary waitlist-btn-primary--compact">
          <Copy size={16} strokeWidth={2} aria-hidden />
          <span>{content.copyLabel}</span>
        </button>

        <div className="waitlist-confirmed-footer">
          <Heart size={14} strokeWidth={1.5} aria-hidden className="waitlist-confirmed-heart" />
          <p>{content.footerThankYou}</p>
          <p className="waitlist-confirmed-footer-muted">{content.footerClosing}</p>
        </div>
      </div>
    </div>
  );
}
