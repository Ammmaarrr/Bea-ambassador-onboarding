import overlays from "@/lib/artboard-overlays.json";
import { ARTBOARD } from "@/lib/design";
import type { OnboardingPageKey } from "@/lib/onboarding-page-content";

export const ONBOARDING_CANVAS = {
  width: ARTBOARD.width,
  height: ARTBOARD.height,
} as const;

export type OnboardingHeroImage = {
  left: number;
  top: number;
  width: number;
  height: number;
  src: string;
  alt?: string;
};

export type OnboardingPageLayout = {
  copy: { left: number; top: number; width: number };
  cta: {
    href: string;
    label: string;
    left: number;
    top: number;
    width: number;
    height: number;
  };
  hero?: OnboardingHeroImage;
  centered?: boolean;
};

/** Welcome artboard (1367×1153). */
export const WELCOME_LAYOUT = {
  canvas: ONBOARDING_CANVAS,
  photo: { left: 0, top: 0, width: 404, height: ARTBOARD.heroHeight },
  trophy: { left: 992, top: 122, width: 292, height: 490 },
  copy: { left: 504, top: 258, width: 505 },
  cta: { ...overlays.pages.welcome.cta, top: 553 },
  prizes: {
    top: ARTBOARD.heroHeight,
    paddingTop: ARTBOARD.prizesSectionPaddingTop,
    paddingX: 76,
    paddingBottom: 64,
    cardGap: 16,
  },
} as const;

/** Inner steps — measured from artboard PNGs + artboard-overlays.json. */
export const STEP_PAGE_LAYOUTS: Record<OnboardingPageKey, OnboardingPageLayout> = {
  "your-school": {
    copy: { left: 76, top: 280, width: 520 },
    cta: overlays.pages["your-school"].cta,
    hero: {
      left: 760,
      top: 120,
      width: 607,
      height: 880,
      src: "/artboards/school-building.png",
      alt: "University campus",
    },
  },
  prizes: {
    copy: { left: 76, top: 280, width: 520 },
    cta: overlays.pages.prizes.cta,
    hero: {
      left: 695,
      top: 200,
      width: 596,
      height: 621,
      src: "/artboards/prizes-path.png",
      alt: "",
    },
  },
  account: {
    copy: { left: 76, top: 280, width: 520 },
    cta: overlays.pages.account.cta,
  },
  invites: {
    copy: { left: 76, top: 280, width: 520 },
    cta: overlays.pages.invites.cta,
  },
  "youre-in": {
    copy: { left: 409, top: 200, width: 548 },
    cta: overlays.pages["youre-in"].cta,
    centered: true,
  },
};

export const ACCOUNT_SOCIAL = overlays.pages.account.social;

/** Account creation (Artboard 4) — absolute desktop coords. */
export const ACCOUNT_DESKTOP = {
  eyebrow: { left: 76, top: 280 },
  title: { left: 76, top: 302, width: 520 },
  subtitle: { left: 76, top: 356, width: 520 },
  labelLeft: 106,
  labelTops: { name: 384, email: 526, password: 672 },
  hint: { left: 106, top: 786 },
  orDivider: { left: 106, top: 920, width: 476 },
  legal: { left: 76, top: 1060, width: 506 },
} as const;

export type AccountFieldId = keyof typeof ACCOUNT_DESKTOP.labelTops;

type AccountFieldInput = {
  id: AccountFieldId;
  type: "text" | "email" | "password";
  placeholder: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export const ACCOUNT_FIELDS = overlays.pages.account.inputs as AccountFieldInput[];
