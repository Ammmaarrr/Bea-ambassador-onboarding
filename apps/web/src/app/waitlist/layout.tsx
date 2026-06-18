import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the waitlist — Bea",
  description: "Together, today. Join the Bea waitlist for early access.",
};

export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
