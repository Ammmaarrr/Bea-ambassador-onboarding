import { stepRoutes } from "@/lib/design";

export type OnboardingStep = {
  label: string;
  href: (typeof stepRoutes)[number];
  /** Circle center for pixel-aligned desktop overlay (Welcome page). */
  left: number;
  top: number;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  { label: "Welcome", href: "/", left: 472, top: 78 },
  { label: "Your School", href: "/your-school", left: 579, top: 78 },
  { label: "Prizes", href: "/prizes", left: 735, top: 78 },
  { label: "Account creation", href: "/account", left: 886, top: 78 },
  { label: "Invites", href: "/invites", left: 1022, top: 78 },
  { label: "You're In", href: "/youre-in", left: 1139, top: 78 },
];
