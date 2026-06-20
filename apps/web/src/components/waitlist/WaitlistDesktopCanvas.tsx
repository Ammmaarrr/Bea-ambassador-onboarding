"use client";

import type { WaitlistArtboardId } from "@/lib/waitlist";
import { isWaitlistStepId } from "@/lib/waitlist-page-content";

import { WaitlistConfirmedMobile } from "./WaitlistConfirmedMobile";
import { WaitlistLandingDesktopCanvas } from "./WaitlistLandingDesktopCanvas";
import { WaitlistPrizesMobile } from "./WaitlistPrizesMobile";
import { WaitlistStepDesktopCanvas } from "./WaitlistStepDesktopCanvas";

type Props = {
  artboardId: WaitlistArtboardId;
};

/** Desktop pixel-perfect waitlist canvases (≥768px). */
export function WaitlistDesktopCanvas({ artboardId }: Props) {
  if (artboardId === "1") {
    return <WaitlistLandingDesktopCanvas />;
  }

  if (isWaitlistStepId(artboardId)) {
    return <WaitlistStepDesktopCanvas artboardId={artboardId} />;
  }

  if (artboardId === "8") {
    return (
      <div className="waitlist-canvas-viewport waitlist-canvas-viewport--tall">
        <div className="waitlist-canvas waitlist-canvas--confirmed-fallback">
          <WaitlistConfirmedMobile />
        </div>
      </div>
    );
  }

  if (artboardId === "9") {
    return (
      <div className="waitlist-canvas-viewport waitlist-canvas-viewport--tall">
        <div className="waitlist-canvas waitlist-canvas--prizes-fallback">
          <WaitlistPrizesMobile />
        </div>
      </div>
    );
  }

  return null;
}
