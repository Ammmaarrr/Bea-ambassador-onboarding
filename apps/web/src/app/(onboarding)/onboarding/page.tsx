import type { Metadata } from "next";

import { WelcomePage } from "@/components/WelcomePage";

export const metadata: Metadata = {
  title: "Welcome — Campus launch | bea",
  description: "Ambassador onboarding welcome page",
};

export default function OnboardingWelcomePage() {
  return <WelcomePage />;
}
