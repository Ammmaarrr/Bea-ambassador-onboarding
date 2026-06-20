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

/** Landing — measured from Artboard 1.png */
export const WAITLIST_LANDING_LAYOUT = {
  width: overlays.pages["1"].width,
  height: overlays.pages["1"].height,
  header: {
    logo: { left: 82, top: 50, width: 80, height: 40 },
    nav: overlays.pages["1"].navLinks,
    cta: overlays.pages["1"].heroCta,
  },
  hero: {
    copy: { left: 96, top: 168, width: 520 },
    email: overlays.pages["1"].heroEmail!,
    submit: overlays.pages["1"].heroSubmit,
    pills: overlays.pages["1"].cityPills,
    image: { left: 720, top: 148, width: 580, height: 456, src: "/waitlist/hero/couple.png" },
  },
  timer: {
    ring: { left: 156, top: 888, width: 300, height: 300 },
    features: { left: 680, top: 928, width: 560 },
  },
  launch: {
    copy: { left: 96, top: 1408, width: 420 },
    cards: {
      top: 1576,
      width: 144,
      height: 220,
      lefts: [692, 850, 1008, 1166] as const,
    },
  },
  footer: {
    copy: { left: 96, top: 1836, width: 480 },
    email: overlays.pages["1"].footerEmail!,
  },
} as const;

export type WaitlistFieldOverlay = {
  left: number;
  top: number;
  width: number;
  height: number;
  id: string;
  type: string;
  placeholder?: string;
  variant?: string;
  text?: string;
};

export type WaitlistStepLayout = {
  width: number;
  height: number;
  back: (typeof overlays.pages)["3"]["back"];
  progress: (typeof overlays.pages)["3"]["progress"];
  copy: WaitlistRect;
  cta: (typeof overlays.pages)["3"]["cta"];
  secondaryLink?: (typeof overlays.pages)["3"]["secondaryLink"];
  searchLabel?: { left: number; top: number; width: number; height: number; text: string };
  inputs?: WaitlistFieldOverlay[];
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
    copy: overlays.pages["3"].copy as WaitlistRect,
    cta: overlays.pages["3"].cta,
    secondaryLink: overlays.pages["3"].secondaryLink,
    searchLabel: overlays.pages["3"].searchLabel,
    inputs: overlays.pages["3"].inputs,
    cityCards: overlays.pages["3"].cityCards,
  },
  "4": {
    width: overlays.pages["4"].width,
    height: overlays.pages["4"].height,
    back: overlays.pages["4"].back,
    progress: overlays.pages["4"].progress,
    copy: overlays.pages["4"].copy as WaitlistRect,
    cta: overlays.pages["4"].cta,
    inputs: overlays.pages["4"].inputs as WaitlistFieldOverlay[],
  },
  "5": {
    width: overlays.pages["5"].width,
    height: overlays.pages["5"].height,
    back: overlays.pages["5"].back,
    progress: overlays.pages["5"].progress,
    copy: overlays.pages["5"].copy as WaitlistRect,
    cta: overlays.pages["5"].cta,
    searchLabel: overlays.pages["5"].searchLabel,
    inputs: overlays.pages["5"].inputs,
    schoolCard: overlays.pages["5"].schoolCard,
    notInSchool: overlays.pages["5"].notInSchool,
  },
  "7": {
    width: overlays.pages["7"].width,
    height: overlays.pages["7"].height,
    back: overlays.pages["7"].back,
    progress: overlays.pages["7"].progress,
    copy: overlays.pages["7"].copy as WaitlistRect,
    cta: overlays.pages["7"].cta,
    inputs: overlays.pages["7"].inputs,
  },
};

/** Confirmed — artboard 8.png */
export const WAITLIST_CONFIRMED_LAYOUT = {
  width: overlays.pages["8"].width,
  height: overlays.pages["8"].height,
  back: overlays.pages["8"].back,
  waitingRoom: overlays.pages["8"].waitingRoom!,
  copyLink: overlays.pages["8"].copyLink!,
  hero: { left: 409, top: 156, width: 548 },
  rankCard: { left: 409, top: 408, width: 548, height: 368 },
  perksDivider: { left: 409, top: 868, width: 548 },
  perks: { left: 96, top: 948, width: 1175, height: 420 },
  shareDivider: { left: 409, top: 1620, width: 548 },
  share: { left: 409, top: 1688, width: 548, height: 200 },
  footer: { left: 409, top: 2388, width: 548 },
} as const;

/** Prizes dashboard — artboard 9.png */
export const WAITLIST_PRIZES_LAYOUT = {
  width: overlays.pages["9"].width,
  height: overlays.pages["9"].height,
  back: overlays.pages["9"].back,
  sidebar: { left: 0, top: 0, width: 210, height: 1696 },
  profile: { left: 1120, top: 48, width: 200, height: 44 },
  title: { left: 260, top: 108, width: 520, height: 100 },
  points: { left: 830, top: 96, width: 340, height: 148 },
  featuredHead: { left: 260, top: 284, width: 910, height: 36 },
  rewards: { left: 260, top: 340, width: 910, height: 352 },
  school: { left: 260, top: 724, width: 910, height: 112 },
  prompts: { left: 260, top: 860, width: 910, height: 148 },
  earnLeft: { left: 260, top: 1048, width: 270, height: 520 },
  earnRight: { left: 548, top: 1048, width: 270, height: 520 },
  standing: { left: 836, top: 1048, width: 334, height: 520 },
} as const;

export function waitlistCanvasHeight(id: WaitlistArtboardId): number {
  return overlays.pages[id].height;
}
