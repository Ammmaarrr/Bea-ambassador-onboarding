import overlays from "@/lib/waitlist-overlays.json";
import type { WaitlistArtboardId, WaitlistStepArtboardId } from "@/lib/waitlist";

export const WAITLIST_CANVAS = {
  width: overlays.width,
  bg: overlays.bg,
} as const;

export type WaitlistRect = {
  left: number;
  top: number;
  width: number;
  height?: number;
};

/** Landing — measured from Artboard 1.png + waitlist-overlays.json */
export const WAITLIST_LANDING_LAYOUT = {
  width: overlays.pages["1"].width,
  height: overlays.pages["1"].height,
  header: {
    logo: { left: 56, top: 38, width: 80, height: 40 },
    nav: overlays.pages["1"].navLinks,
    cta: overlays.pages["1"].heroCta,
  },
  hero: {
    copy: { left: 96, top: 200, width: 520 },
    eyebrow: { left: 96, top: 200 },
    title: { left: 96, top: 228, width: 520, height: 120 },
    subtitle: { left: 96, top: 400, width: 380 },
    email: overlays.pages["1"].heroEmail,
    submit: overlays.pages["1"].heroSubmit,
    pills: overlays.pages["1"].cityPills,
    image: { left: 720, top: 168, width: 580, height: 436, src: "/waitlist/hero/couple.png" },
  },
  timer: {
    ring: { left: 140, top: 900, width: 280, height: 280 },
    features: { left: 680, top: 940, width: 560 },
  },
  launch: {
    copy: { left: 96, top: 1420, width: 420 },
    cards: {
      top: 1588,
      width: 144,
      height: 220,
      lefts: [692, 850, 1008, 1166] as const,
    },
  },
  footer: {
    copy: { left: 96, top: 1848, width: 480 },
    email: overlays.pages["1"].footerEmail,
  },
} as const;

export type WaitlistStepLayout = {
  width: number;
  height: number;
  back: (typeof overlays.pages)["3"]["back"];
  progress: (typeof overlays.pages)["3"]["progress"];
  copy: WaitlistRect;
  cta: (typeof overlays.pages)["3"]["cta"];
  secondaryLink?: (typeof overlays.pages)["3"]["secondaryLink"];
  inputs?: (typeof overlays.pages)["3"]["inputs"];
  cityCards?: (typeof overlays.pages)["3"]["cityCards"];
  schoolCard?: (typeof overlays.pages)["5"]["schoolCard"];
  notInSchool?: (typeof overlays.pages)["5"]["notInSchool"];
};

export const WAITLIST_STEP_LAYOUTS: Record<WaitlistStepArtboardId, WaitlistStepLayout> = {
  "3": {
    width: overlays.pages["3"].width,
    height: overlays.pages["3"].height,
    back: overlays.pages["3"].back,
    progress: overlays.pages["3"].progress,
    copy: { left: 100, top: 180, width: 520 },
    cta: overlays.pages["3"].cta,
    secondaryLink: overlays.pages["3"].secondaryLink,
    inputs: overlays.pages["3"].inputs,
    cityCards: overlays.pages["3"].cityCards,
  },
  "4": {
    width: overlays.pages["4"].width,
    height: overlays.pages["4"].height,
    back: overlays.pages["4"].back,
    progress: overlays.pages["4"].progress,
    copy: { left: 100, top: 180, width: 520 },
    cta: overlays.pages["4"].cta,
    inputs: overlays.pages["4"].inputs,
  },
  "5": {
    width: overlays.pages["5"].width,
    height: overlays.pages["5"].height,
    back: overlays.pages["5"].back,
    progress: overlays.pages["5"].progress,
    copy: { left: 100, top: 180, width: 520 },
    cta: overlays.pages["5"].cta,
    inputs: overlays.pages["5"].inputs,
    schoolCard: overlays.pages["5"].schoolCard,
    notInSchool: overlays.pages["5"].notInSchool,
  },
  "7": {
    width: overlays.pages["7"].width,
    height: overlays.pages["7"].height,
    back: overlays.pages["7"].back,
    progress: overlays.pages["7"].progress,
    copy: { left: 100, top: 180, width: 520 },
    cta: overlays.pages["7"].cta,
    inputs: overlays.pages["7"].inputs,
  },
};

export const WAITLIST_CONFIRMED_LAYOUT = {
  width: overlays.pages["8"].width,
  height: overlays.pages["8"].height,
  back: overlays.pages["8"].back,
  waitingRoom: overlays.pages["8"].waitingRoom,
  copyLink: overlays.pages["8"].copyLink,
  copy: { left: 409, top: 200, width: 548 },
} as const;

export const WAITLIST_PRIZES_LAYOUT = {
  width: overlays.pages["9"].width,
  height: overlays.pages["9"].height,
  back: overlays.pages["9"].back,
  sidebar: { left: 0, top: 0, width: 210, height: 1696 },
  main: { left: 210, top: 0, width: 1157, height: 1696 },
} as const;

export function waitlistCanvasHeight(id: WaitlistArtboardId): number {
  return overlays.pages[id].height;
}
