"use client";

import type { WaitlistArtboardId } from "@/lib/waitlist";
import { isWaitlistStepId } from "@/lib/waitlist-page-content";

import { WaitlistConfirmedDesktopCanvas } from "./WaitlistConfirmedDesktopCanvas";
import { WaitlistLandingDesktopCanvas } from "./WaitlistLandingDesktopCanvas";
import { WaitlistPrizesDesktopCanvas } from "./WaitlistPrizesDesktopCanvas";
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
    return <WaitlistConfirmedDesktopCanvas />;
  }

  if (artboardId === "9") {
    return <WaitlistPrizesDesktopCanvas />;
  }

  return null;
}
