import type { Metadata } from "next";

import "@/styles/waitlist.css";
import "@/styles/waitlist-mobile.css";
import "@/styles/waitlist-confirmed.css";

export const metadata: Metadata = {
  title: "Join the waitlist — Bea",
  description: "Together, today. Join the Bea waitlist for early access.",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return <div className="waitlist-artboard-root">{children}</div>;
}
