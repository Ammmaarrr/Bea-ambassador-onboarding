import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";

/** Chain-link icon — extracted from artboard 8 copy button (pixel-accurate). */
export function WaitlistCopyLinkIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={WAITLIST_ASSETS.confirmed.copyLinkIcon}
      alt=""
      className={className}
      width={22}
      height={18}
      draggable={false}
      aria-hidden
    />
  );
}
