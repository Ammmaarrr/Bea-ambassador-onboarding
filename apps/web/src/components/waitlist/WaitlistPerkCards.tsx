import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";
import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

const PERK_ICONS = {
  early: WAITLIST_ASSETS.confirmed.perkIcons.early,
  time: WAITLIST_ASSETS.confirmed.perkIcons.time,
  premium: WAITLIST_ASSETS.confirmed.perkIcons.premium,
} as const;

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
              src={PERK_ICONS[perk.id]}
              alt=""
              className="waitlist-perk-card-icon"
              width={44}
              height={44}
              draggable={false}
              aria-hidden
            />
            <h4>{perk.title}</h4>
            <p className="waitlist-perk-card-desc">{perk.description}</p>
            <p className="waitlist-perk-card-footer">{perk.footer}</p>
          </div>
        ))}
      </div>
    </>
  );
}
