"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";
import { WAITLIST_CONFIRMED_LAYOUT } from "@/lib/waitlist-layout";
import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCheckBadge } from "./WaitlistCheckBadge";
import { WaitlistCopyLinkIcon } from "./WaitlistCopyLinkIcon";
import { WaitlistExternalLinkIcon } from "./WaitlistExternalLinkIcon";
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={WAITLIST_ASSETS.confirmed.backArrow}
            alt=""
            className="waitlist-canvas__back-icon"
            width={40}
            height={28}
            draggable={false}
            aria-hidden
          />
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
          <WaitlistExternalLinkIcon className="waitlist-canvas__waiting-room-icon" />
        </Link>

        <div
          className="waitlist-canvas__confirmed-badge"
          style={{ left: L.badge.left, top: L.badge.top, width: L.badge.width, height: L.badge.height }}
        >
          <WaitlistCheckBadge />
        </div>

        <h1
          className="waitlist-canvas__confirmed-title"
          style={{ left: L.title.left, top: L.title.top, width: L.title.width }}
        >
          {c.title}
        </h1>

        <p
          className="waitlist-canvas__confirmed-sub"
          style={{ left: L.subtitle.left, top: L.subtitle.top, width: L.subtitle.width }}
        >
          {c.subtitle}
        </p>

        <div
          className="waitlist-canvas__rank-card"
          style={{
            left: L.rankCard.left,
            top: L.rankCard.top,
            width: L.rankCard.width,
          }}
        >
          <p className="waitlist-canvas__rank-eyebrow">{c.rankEyebrow}</p>
          <p className="waitlist-canvas__rank-number">{c.rankNumber}</p>
          <p className="waitlist-canvas__rank-city">{c.rankCity}</p>
          <div className="waitlist-rank-card-progress">
            <div className="waitlist-canvas__rank-progress-head">
              <span>{c.progressLabel}</span>
              <span>{c.progressPercent}</span>
            </div>
            <div className="waitlist-canvas__rank-progress-bar">
              <div className="waitlist-canvas__rank-progress-fill" />
            </div>
            <p className="waitlist-canvas__rank-hint">{c.progressHint}</p>
          </div>
        </div>

        <p
          className="waitlist-canvas__section-label"
          style={{
            left: L.perksDivider.left,
            top: L.perksDivider.top,
            width: L.perksDivider.width,
          }}
        >
          {c.perksEyebrow}
        </p>

        <p
          className="waitlist-canvas__perks-sub"
          style={{ left: L.perksSub.left, top: L.perksSub.top, width: L.perksSub.width }}
        >
          {c.perksSubtitle}
        </p>

        {L.perkCards.map((slot, i) => (
          <div
            key={c.perks[i]?.id ?? i}
            className="waitlist-canvas__perk-slot"
            style={{
              left: slot.left,
              top: slot.top,
              width: slot.width,
              height: slot.height,
            }}
          >
            <WaitlistPerkCards showSubtitle={false} singleIndex={i} />
          </div>
        ))}

        <p
          className="waitlist-canvas__section-label"
          style={{ left: L.shareDivider.left, top: L.shareDivider.top, width: L.shareDivider.width }}
        >
          {c.shareEyebrow}
        </p>

        <div
          className="waitlist-canvas__share-block"
          style={{ left: L.share.left, top: L.share.top, width: L.share.width, height: L.share.height }}
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
          <WaitlistCopyLinkIcon className="waitlist-canvas__copy-link-icon" />
          <span>{c.copyLabel}</span>
        </button>

        <div
          className="waitlist-canvas__confirmed-footer"
          style={{ left: L.footer.left, top: L.footer.top, width: L.footer.width }}
        >
          <p className="waitlist-canvas__confirmed-footer-line">
            <Heart
              className="waitlist-canvas__confirmed-heart"
              size={14}
              strokeWidth={1.5}
              aria-hidden
            />
            {c.footerThankYou}
          </p>
          <p className="waitlist-canvas__confirmed-footer-muted">{c.footerClosing}</p>
        </div>
      </div>
    </div>
  );
}
