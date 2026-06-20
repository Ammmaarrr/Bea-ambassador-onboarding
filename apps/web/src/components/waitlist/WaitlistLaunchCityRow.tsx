"use client";

import { useState } from "react";

import { WAITLIST_CITIES } from "@/lib/waitlist";

import { WaitlistCityCarousel } from "./WaitlistCityCarousel";

/** Selectable launch city cards on the waitlist landing page. */
export function WaitlistLaunchCityRow() {
  const [selectedId, setSelectedId] = useState<string | null>(WAITLIST_CITIES[0]?.id ?? null);

  return (
    <WaitlistCityCarousel
      selectedId={selectedId}
      onSelect={(city) => setSelectedId(city.id)}
    />
  );
}
