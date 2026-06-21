import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";
import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

const PERK_ICONS = {
  early: { src: WAITLIST_ASSETS.confirmed.perkIcons.early, width: 47, height: 58 },
  time: { src: WAITLIST_ASSETS.confirmed.perkIcons.time, width: 51, height: 57 },
  premium: { src: WAITLIST_ASSETS.confirmed.perkIcons.premium, width: 69, height: 57 },
} as const;

function PerkFooter({ text }: { text: string }) {
  const match = text.match(/^Invite (\d+) friends?$/);
  if (!match) {
    return <p className="waitlist-perk-card-footer">{text}</p>;
  }

  const [, count] = match;
  const suffix = text.endsWith("friends") ? "friends" : "friend";

  return (
    <p className="waitlist-perk-card-footer">
      <span>Invite</span>
      <span className="waitlist-perk-footer-num">{count}</span>
      <span>{suffix}</span>
    </p>
  );
}

/** Perk row — copy and layout from laptop artboard 8. */
export function WaitlistPerkCards({
  showSubtitle = true,
  singleIndex,
}: {
  showSubtitle?: boolean;
  singleIndex?: number;
}) {
  const { perksSubtitle, perks } = WAITLIST_CONFIRMED_CONTENT;
  const visiblePerks = singleIndex === undefined ? perks : [perks[singleIndex]!].filter(Boolean);

  return (
    <>
      {showSubtitle ? <p className="waitlist-perks-subtitle">{perksSubtitle}</p> : null}
      <div className="waitlist-perk-cards">
        {visiblePerks.map((perk) => (
          <div
            key={perk.id}
            className={
              "waitlist-perk-card" + (perk.active ? " waitlist-perk-card--active" : "")
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PERK_ICONS[perk.id].src}
              alt=""
              className="waitlist-perk-card-icon"
              width={PERK_ICONS[perk.id].width}
              height={PERK_ICONS[perk.id].height}
              draggable={false}
              aria-hidden
            />
            <h4>{perk.title}</h4>
            <p className="waitlist-perk-card-desc">{perk.description}</p>
            <PerkFooter text={perk.footer} />
          </div>
        ))}
      </div>
    </>
  );
}
