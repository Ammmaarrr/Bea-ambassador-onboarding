import { Clock, Crown, Sprout } from "lucide-react";

import { WAITLIST_CONFIRMED_CONTENT } from "@/lib/waitlist-page-content";

const PERK_ICONS = {
  early: Sprout,
  time: Clock,
  premium: Crown,
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
        {visiblePerks.map((perk) => {
          const Icon = PERK_ICONS[perk.id];
          return (
            <div
              key={perk.id}
              className={
                "waitlist-perk-card" + (perk.active ? " waitlist-perk-card--active" : "")
              }
            >
              <Icon size={22} strokeWidth={1.5} aria-hidden />
              <h4>{perk.title}</h4>
              <p className="waitlist-perk-card-desc">{perk.description}</p>
              <p className="waitlist-perk-card-footer">{perk.footer}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
