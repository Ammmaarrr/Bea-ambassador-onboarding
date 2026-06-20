"use client";

import { useMemo, useState } from "react";

import { WAITLIST_LAUNCH_CITIES } from "@/lib/waitlist";

type Props = {
  className?: string;
  label?: string;
  cities?: readonly string[];
  defaultActive?: string;
};

/** Interactive city pills with optional label. */
export function WaitlistHeroCityPills({
  className,
  label,
  cities = WAITLIST_LAUNCH_CITIES,
  defaultActive = "Chicago",
}: Props) {
  const defaultIndex = useMemo(() => {
    const index = cities.indexOf(defaultActive);
    return index >= 0 ? index : 0;
  }, [cities, defaultActive]);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={"waitlist-launch-cities" + (className ? ` ${className}` : "")}>
      {label ? <p className="waitlist-launch-eyebrow">{label}</p> : null}
      <div className="waitlist-city-pills">
        {cities.map((city, i) => (
          <button
            key={city}
            type="button"
            className={
              "waitlist-city-pill" + (i === activeIndex ? " waitlist-city-pill--active" : "")
            }
            aria-pressed={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
