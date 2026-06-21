import { ArrowUpRight } from "lucide-react";

/** External-link arrow for waiting room pill (artboard 8) — no chevron. */
export function WaitlistExternalLinkIcon({ className }: { className?: string }) {
  return <ArrowUpRight className={className} size={14} strokeWidth={1.75} aria-hidden />;
}
