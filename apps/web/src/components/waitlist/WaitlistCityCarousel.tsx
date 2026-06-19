import { WAITLIST_CITIES, type WaitlistCity } from "@/lib/waitlist";

import { WaitlistCityCard } from "./WaitlistCityCard";

type Props = {
  className?: string;
  selectedId?: string | null;
  onSelect?: (city: WaitlistCity) => void;
};

/** Scrollable row of city cards — same PNG assets as laptop artboard. */
export function WaitlistCityCarousel({ className, selectedId, onSelect }: Props) {
  return (
    <div className={"waitlist-city-carousel" + (className ? ` ${className}` : "")}>
      {WAITLIST_CITIES.map((city) => (
        <WaitlistCityCard
          key={city.id}
          city={city}
          selected={selectedId === city.id}
          static={!onSelect}
          onSelect={onSelect ? () => onSelect(city) : undefined}
        />
      ))}
    </div>
  );
}
