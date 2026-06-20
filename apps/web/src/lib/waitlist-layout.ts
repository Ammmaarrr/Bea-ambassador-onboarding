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
  title?: WaitlistRect;
  subtitle?: WaitlistRect;
  cta: (typeof overlays.pages)["3"]["cta"];
  secondaryLink?: (typeof overlays.pages)["3"]["secondaryLink"];
  searchLabel?: { left: number; top: number; width: number; height: number; text: string };
  inputs?: WaitlistFieldOverlay[];
  cityCards?: (typeof overlays.pages)["3"]["cityCards"];
  schoolCard?: (typeof overlays.pages)["5"]["schoolCard"];
  orDivider?: (typeof overlays.pages)["5"]["orDivider"];
  notInSchool?: (typeof overlays.pages)["5"]["notInSchool"];
};

export const WAITLIST_STEP_LAYOUTS: Record<WaitlistStepArtboardId, WaitlistStepLayout> = {
  "3": {
    width: overlays.pages["3"].width,
    height: overlays.pages["3"].height,
    back: overlays.pages["3"].back,
    progress: overlays.pages["3"].progress,
    copy: overlays.pages["3"].copy as WaitlistRect,
    title: overlays.pages["3"].title as WaitlistRect,
    subtitle: overlays.pages["3"].subtitle as WaitlistRect,
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
    orDivider: overlays.pages["5"].orDivider,
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
  badge: overlays.pages["8"].badge!,
  title: overlays.pages["8"].title!,
  subtitle: overlays.pages["8"].subtitle!,
  rankCard: overlays.pages["8"].rankCard!,
  perksDivider: overlays.pages["8"].perksDivider!,
  perksSub: overlays.pages["8"].perksSub!,
  perkCards: overlays.pages["8"].perkCards!,
  shareDivider: overlays.pages["8"].shareDivider!,
  share: overlays.pages["8"].share!,
  copyLink: overlays.pages["8"].copyLink!,
  footer: overlays.pages["8"].footer!,
} as const;

/** Prizes dashboard — artboard 9.png */
export const WAITLIST_PRIZES_LAYOUT = {
  width: overlays.pages["9"].width,
  height: overlays.pages["9"].height,
  back: overlays.pages["9"].back,
  sidebar: overlays.pages["9"].sidebar!,
  profile: overlays.pages["9"].profile!,
  title: overlays.pages["9"].title!,
  points: overlays.pages["9"].points!,
  featuredHead: overlays.pages["9"].featuredHead!,
  rewards: overlays.pages["9"].rewards!,
  school: overlays.pages["9"].school!,
  prompts: overlays.pages["9"].prompts!,
  earnLeft: overlays.pages["9"].earnLeft!,
  earnRight: overlays.pages["9"].earnRight!,
  standing: overlays.pages["9"].standing!,
} as const;

export function waitlistCanvasHeight(id: WaitlistArtboardId): number {
  return overlays.pages[id].height;
}
