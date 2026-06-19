/**
 * Measured from design/waitlist artboard (3.png, 7.png) — header stepper geometry.
 * Four unequal segments on #fbf5ef; inactive #e7dad0; active #000.
 */
export const WAITLIST_STEPPER = {
  top: 79,
  height: 5,
  trackLeft: 186,
  trackWidth: 378,
  maskBg: "#fbf5ef",
  barInactive: "#e7dad0",
  barActive: "#000000",
  segments: [
    { width: 71, gapAfter: 35 },
    { width: 66, gapAfter: 37 },
    { width: 66, gapAfter: 36 },
    { width: 67, gapAfter: 0 },
  ],
  cover: { left: 168, top: 70, width: 412, height: 22 },
} as const;

type ProgressOverlay = {
  left: number;
  top: number;
  width: number;
  height: number;
  steps: number;
};

function segmentPositions() {
  let left = WAITLIST_STEPPER.trackLeft;
  return WAITLIST_STEPPER.segments.map((seg) => {
    const rect = { left, width: seg.width };
    left += seg.width + seg.gapAfter;
    return rect;
  });
}

/** Design-space hit rects for each stepper segment (with vertical padding for taps). */
export function progressSegmentRects(_progress?: ProgressOverlay) {
  return segmentPositions().map((seg) => ({
    left: seg.left,
    top: WAITLIST_STEPPER.top - 18,
    width: seg.width,
    height: WAITLIST_STEPPER.height + 36,
  }));
}

/** Exact bar geometry — paints live progress over the static PNG stepper. */
export function progressBarSegmentRects(_progress?: ProgressOverlay) {
  return segmentPositions().map((seg) => ({
    left: seg.left,
    top: WAITLIST_STEPPER.top,
    width: seg.width,
    height: WAITLIST_STEPPER.height,
  }));
}

/** Cream mask that hides the baked-in stepper in the artboard PNG. */
export function progressBarCoverRect(_progress?: ProgressOverlay) {
  return { ...WAITLIST_STEPPER.cover };
}
