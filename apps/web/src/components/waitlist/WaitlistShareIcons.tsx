import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";

const SHARE_LINKS = [
  { label: "Instagram", src: WAITLIST_ASSETS.share.instagram },
  { label: "Messages", src: WAITLIST_ASSETS.share.messages },
  { label: "Whatsapp", src: WAITLIST_ASSETS.share.whatsapp },
] as const;

/** Social share row — artboard 8 outline icons from design assets. */
export function WaitlistShareIcons() {
  return (
    <div className="waitlist-share-icons">
      {SHARE_LINKS.map(({ label, src }) => (
        <button key={label} type="button" className="waitlist-share-icon">
          <span className="waitlist-share-icon-circle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" width={64} height={64} draggable={false} aria-hidden />
          </span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
