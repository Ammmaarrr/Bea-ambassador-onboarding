import type { Metadata } from "next";

import "@/styles/waitlist.css";
import "@/styles/waitlist-mobile.css";

import { WaitlistLandingPage } from "@/components/waitlist/WaitlistLandingPage";

export const metadata: Metadata = {
  title: "Join the waitlist — Bea",
  description: "Together, today. Join the Bea waitlist for early access.",
};

export default function Home() {
  return (
    <div className="waitlist-artboard-root">
      <WaitlistLandingPage />
    </div>
  );
}
