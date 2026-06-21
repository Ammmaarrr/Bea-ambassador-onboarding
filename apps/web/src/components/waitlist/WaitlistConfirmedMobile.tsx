import Link from "next/link";

import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";
import { WAITLIST_ARTBOARDS } from "@/lib/waitlist";
import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCheckBadge } from "./WaitlistCheckBadge";
import { WaitlistCopyLinkIcon } from "./WaitlistCopyLinkIcon";
import { WaitlistExternalLinkIcon } from "./WaitlistExternalLinkIcon";
import { WaitlistFooterHeart } from "./WaitlistFooterHeart";
import { WaitlistPerkCards } from "./WaitlistPerkCards";
import { WaitlistSectionDivider } from "./WaitlistSectionDivider";
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WAITLIST_ASSETS.confirmed.backArrow}
              alt=""
              className="waitlist-back-icon"
              width={40}
              height={28}
              draggable={false}
              aria-hidden
            />
          </Link>
          <Link href={content.waitingRoom.href} className="waitlist-waiting-room">
            {content.waitingRoom.label}
            <WaitlistExternalLinkIcon className="waitlist-waiting-room-icon" />
          </Link>
        </div>

        <WaitlistCheckBadge />

        <h1 className="waitlist-confirmed-title">{content.title}</h1>
        <p className="waitlist-confirmed-sub">{content.subtitle}</p>

        <div className="waitlist-rank-card">
          <p className="waitlist-rank-eyebrow">{content.rankEyebrow}</p>
          <p className="waitlist-rank-number">{content.rankNumber}</p>
          <p className="waitlist-rank-city">{content.rankCity}</p>

          <div className="waitlist-rank-divider" aria-hidden />

          <div className="waitlist-rank-card-progress">
            <div className="waitlist-rank-progress-label">
              <span>{content.progressLabel}</span>
              <span>{content.progressPercent}</span>
            </div>
            <div className="waitlist-rank-progress-bar">
              <div className="waitlist-rank-progress-fill" />
            </div>
            <p className="waitlist-rank-hint">{content.progressHint}</p>
          </div>
        </div>

        <WaitlistSectionDivider label={content.perksEyebrow} />
        <WaitlistPerkCards />

        <WaitlistSectionDivider label={content.shareEyebrow} />
        <WaitlistShareIcons />

        <button type="button" className="waitlist-copy-link-btn">
          <WaitlistCopyLinkIcon className="waitlist-copy-link-icon" />
          <span>{content.copyLabel}</span>
        </button>

        <div className="waitlist-confirmed-footer">
          <p className="waitlist-confirmed-footer-line">
            <WaitlistFooterHeart className="waitlist-confirmed-heart" />
            <span>{content.footerThankYou}</span>
          </p>
          <p className="waitlist-confirmed-footer-muted">{content.footerClosing}</p>
        </div>
      </div>
    </div>
  );
}
