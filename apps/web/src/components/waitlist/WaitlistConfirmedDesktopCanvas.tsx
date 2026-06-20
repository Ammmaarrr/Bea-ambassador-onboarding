"use client";

import Link from "next/link";
import { ChevronLeft, Copy } from "lucide-react";

import { WAITLIST_CONFIRMED_LAYOUT } from "@/lib/waitlist-layout";
import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCheckBadge } from "./WaitlistCheckBadge";
import { WaitlistPerkCards } from "./WaitlistPerkCards";
import { WaitlistShareIcons } from "./WaitlistShareIcons";

/** Pixel-perfect confirmed screen — artboard 8, scaled 1367×2749 canvas. */
export function WaitlistConfirmedDesktopCanvas() {
  const L = WAITLIST_CONFIRMED_LAYOUT;
  const c = WAITLIST_CONFIRMED_CONTENT;

  return (
    <div
      className="waitlist-canvas-viewport"
      style={{ ["--wl-canvas-h" as string]: `${L.height}px` }}
    >
      <div className="waitlist-canvas waitlist-canvas--confirmed">
        <Link
          href={L.back.href}
          className="waitlist-canvas__back"
          style={{ left: L.back.left, top: L.back.top, width: L.back.width, height: L.back.height }}
          aria-label="Go back"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>

        <Link
          href={L.waitingRoom.href}
          className="waitlist-canvas__waiting-room"
          style={{
            left: L.waitingRoom.left,
            top: L.waitingRoom.top,
            width: L.waitingRoom.width,
            height: L.waitingRoom.height,
          }}
        >
          {L.waitingRoom.label}
          <span aria-hidden> ↗</span>
        </Link>

        <div
          className="waitlist-canvas__confirmed-hero"
          style={{ left: L.hero.left, top: L.hero.top, width: L.hero.width }}
        >
          <WaitlistCheckBadge />
          <h1 className="waitlist-canvas__confirmed-title">{c.title}</h1>
          <p className="waitlist-canvas__confirmed-sub">{c.subtitle}</p>
        </div>

        <div
          className="waitlist-canvas__rank-card"
          style={{
            left: L.rankCard.left,
            top: L.rankCard.top,
            width: L.rankCard.width,
            height: L.rankCard.height,
          }}
        >
          <p className="waitlist-canvas__rank-eyebrow">{c.rankEyebrow}</p>
          <p className="waitlist-canvas__rank-number">{c.rankNumber}</p>
          <p className="waitlist-canvas__rank-city">{c.rankCity}</p>
          <div className="waitlist-canvas__rank-divider" />
          <div className="waitlist-canvas__rank-progress-head">
            <span>{c.progressLabel}</span>
            <span>{c.progressPercent}</span>
          </div>
          <div className="waitlist-canvas__rank-progress-bar">
            <div className="waitlist-canvas__rank-progress-fill" />
          </div>
          <p className="waitlist-canvas__rank-hint">{c.progressHint}</p>
        </div>

        <div
          className="waitlist-canvas__section-divider"
          style={{
            left: L.perksDivider.left,
            top: L.perksDivider.top,
            width: L.perksDivider.width,
          }}
        >
          {c.perksEyebrow}
        </div>

        <p
          className="waitlist-canvas__perks-sub"
          style={{ left: L.hero.left, top: L.perksDivider.top + 36, width: L.hero.width }}
        >
          {c.perksSubtitle}
        </p>

        <div
          className="waitlist-canvas__perks-row"
          style={{
            left: L.perks.left,
            top: L.perks.top,
            width: L.perks.width,
            height: L.perks.height,
          }}
        >
          <WaitlistPerkCards showSubtitle={false} />
        </div>

        <div
          className="waitlist-canvas__section-divider"
          style={{ left: L.shareDivider.left, top: L.shareDivider.top, width: L.shareDivider.width }}
        >
          {c.shareEyebrow}
        </div>

        <div
          className="waitlist-canvas__share-block"
          style={{ left: L.share.left, top: L.share.top, width: L.share.width }}
        >
          <WaitlistShareIcons />
        </div>

        <button
          type="button"
          className="waitlist-canvas__copy-link"
          style={{
            left: L.copyLink.left,
            top: L.copyLink.top,
            width: L.copyLink.width,
            height: L.copyLink.height,
          }}
        >
          <Copy size={16} strokeWidth={2} aria-hidden />
          <span>{c.copyLabel}</span>
        </button>

        <div
          className="waitlist-canvas__confirmed-footer"
          style={{ left: L.footer.left, top: L.footer.top, width: L.footer.width }}
        >
          <p>{c.footerThankYou}</p>
          <p className="waitlist-canvas__confirmed-footer-muted">{c.footerClosing}</p>
        </div>
      </div>
    </div>
  );
}
