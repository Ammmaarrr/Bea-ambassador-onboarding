export const ARTBOARD = {
  width: 1367,
  height: 1153,
  bg: "#f8f3ef",
  heroHeight: 674,
  sectionDivider: "#edeceb",
  prizesSectionPaddingTop: 44,
} as const;

/** Artboard UI/body sans — Inter (neutral grotesque) with system fallbacks. */
export const fontSans =
  "var(--font-inter), -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif";
export const fontLato = fontSans;
/** @deprecated Use fontSans — kept so existing components pick up the design stack. */
export const fontAptos = fontSans;
/** Illustrator design: real Canela Text for headlines, Fraunces as glyph fallback. */
export const fontSerif = '"Canela Text", var(--font-fraunces), Georgia, \'Times New Roman\', serif';
export const fontMinion = fontSerif;

export const accentTan = "#c48b58";
export const textMuted = "#7c7c7c";
export const textSecondary = "#9a9490";
export const linkTeal = "#3d7a6e";

export const stepRoutes = [
  "/",
  "/your-school",
  "/prizes",
  "/account",
  "/invites",
  "/youre-in",
] as const;

/** Step index for each inner artboard page (0 = Welcome). */
export const artboardActiveIndex = {
  "your-school": 1,
  prizes: 2,
  account: 3,
  invites: 4,
  "youre-in": 5,
} as const;
