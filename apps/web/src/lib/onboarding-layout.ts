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

export const ACCOUNT_FORM_WIDTH = 340;
export const ACCOUNT_SOCIAL_BTN_WIDTH = 155;
export const ACCOUNT_SOCIAL_GAP = ACCOUNT_FORM_WIDTH - ACCOUNT_SOCIAL_BTN_WIDTH * 2;

/** Vertical gaps between consecutive blocks inside `.onboarding-canvas__account-main`. */
export const ACCOUNT_BLOCK_GAP = {
  afterEyebrow: 22,
  afterTitle: 58,
  afterSubtitle: 85,
  afterNameLabel: 20,
  afterNameInput: 122,
  afterEmailLabel: 21,
  afterEmailInput: 125,
  afterPasswordLabel: 21,
  afterPasswordInput: 6,
  afterHint: 40,
  afterCta: 40,
  afterDivider: 50,
  afterSocial: 42,
} as const;

/** Positions relative to `.onboarding-canvas__account-main` (below progress bar). */
export const ACCOUNT_DESKTOP = {
  eyebrow: { top: 0 },
  title: { top: 22, width: 520 },
  subtitle: { top: 80 },
  labelLeft: 0,
  labelTops: { name: 165, email: 307, password: 453 },
  hint: { top: 567 },
  cta: { top: 615, height: 46 },
  orDivider: { top: 701 },
  legal: { top: 841 },
} as const;

export type AccountFieldId = keyof typeof ACCOUNT_DESKTOP.labelTops;

type AccountFieldInput = {
  id: AccountFieldId;
  type: "text" | "email" | "password";
  placeholder: string;
  top: number;
  height: number;
};

export const ACCOUNT_FIELDS: AccountFieldInput[] = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your full name",
    top: 185,
    height: 72,
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    top: 328,
    height: 71,
  },
  {
    id: "password",
    type: "password",
    placeholder: "Create your password",
    top: 474,
    height: 71,
  },
];

export const ACCOUNT_SOCIAL = [
  {
    label: "Google",
    top: 751,
    width: ACCOUNT_SOCIAL_BTN_WIDTH,
    height: 48,
  },
  {
    label: "Apple",
    top: 751,
    width: ACCOUNT_SOCIAL_BTN_WIDTH,
    height: 48,
  },
] as const;

export const ACCOUNT_CTA = {
  href: "/invites",
  label: "Create account",
  width: ACCOUNT_FORM_WIDTH,
  height: ACCOUNT_DESKTOP.cta.height,
  top: ACCOUNT_DESKTOP.cta.top,
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
    copy: { left: 80, top: 280, width: 520 },
    cta: {
      href: "/invites",
      label: "Create account",
      left: 0,
      top: ACCOUNT_DESKTOP.cta.top,
      width: ACCOUNT_FORM_WIDTH,
      height: ACCOUNT_DESKTOP.cta.height,
    },
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
