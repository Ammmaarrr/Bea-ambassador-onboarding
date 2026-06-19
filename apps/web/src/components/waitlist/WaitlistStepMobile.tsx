"use client";

import Link from "next/link";
import { useState } from "react";

import { WAITLIST_ARTBOARDS, WAITLIST_CITIES, type WaitlistStepArtboardId } from "@/lib/waitlist";
import { WAITLIST_PAGE_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCityCarousel } from "./WaitlistCityCarousel";
import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

type Props = {
  artboardId: WaitlistStepArtboardId;
};

/** Phone-only join steps (artboards 3, 4, 5, 7). */
export function WaitlistStepMobile({ artboardId }: Props) {
  const content = WAITLIST_PAGE_CONTENT[artboardId];
  const meta = WAITLIST_ARTBOARDS[artboardId];
  const [selectedCity, setSelectedCity] = useState<string | null>(WAITLIST_CITIES[0]?.id ?? null);

  return (
    <WaitlistStepShell
      artboardId={artboardId}
      backHref={meta.backHref!}
      title={content.title}
      subtitle={content.subtitle}
      titleSerif={content.titleSerif}
      footer={
        <>
          <WaitlistContinueButton href={content.cta.href} label={content.cta.label} />
          {content.secondary ? (
            <Link href={content.secondary.href} className="waitlist-link-secondary">
              {content.secondary.label}
            </Link>
          ) : null}
        </>
      }
    >
      {artboardId === "3" && (
        <>
          <WaitlistCityCarousel
            selectedId={selectedCity}
            onSelect={(city) => setSelectedCity(city.id)}
          />

          <div className="waitlist-search-block">
            <label className="waitlist-field-label waitlist-field-label--caps" htmlFor="city-search">
              Search any city
            </label>
            <input
              id="city-search"
              type="search"
              className="waitlist-box-input"
              placeholder="Search"
            />
          </div>
        </>
      )}

      {artboardId === "4" && (
        <>
          <div className="waitlist-underline-field">
            <label className="waitlist-field-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              className="waitlist-underline-input"
              placeholder="Your first name"
              autoComplete="given-name"
            />
          </div>
          <div className="waitlist-underline-field">
            <label className="waitlist-field-label" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="waitlist-underline-input"
              placeholder="Your age"
              inputMode="numeric"
            />
          </div>
        </>
      )}

      {artboardId === "5" && (
        <>
          <div className="waitlist-search-block waitlist-search-block--tight">
            <label className="waitlist-field-label" htmlFor="school-search">
              Search your school
            </label>
            <input
              id="school-search"
              type="search"
              className="waitlist-box-input"
              placeholder="Search"
            />
          </div>

          <button type="button" className="waitlist-school-card">
            <div>
              <div className="waitlist-school-card-name">New York University</div>
              <div className="waitlist-school-card-city">New York</div>
            </div>
            <span className="waitlist-school-card-dot" aria-hidden />
          </button>

          <div className="waitlist-or-divider">or</div>

          <button type="button" className="waitlist-btn-secondary">
            I&apos;m not currently in school
          </button>
        </>
      )}

      {artboardId === "7" && (
        <div className="waitlist-search-block">
          <input
            id="email"
            type="email"
            className="waitlist-box-input"
            placeholder="you@email.com"
            autoComplete="email"
          />
        </div>
      )}
    </WaitlistStepShell>
  );
}
