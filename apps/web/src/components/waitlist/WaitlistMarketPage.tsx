"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { WAITLIST_ARTBOARDS, WAITLIST_CITIES, WAITLIST_HERO_CITIES } from "@/lib/waitlist";

import { WaitlistArtboardPage } from "./WaitlistArtboardPage";
import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

const meta = WAITLIST_ARTBOARDS["3"];

export function WaitlistMarketPage() {
  const [selected, setSelected] = useState("nyc");

  const mobile = (
    <WaitlistStepShell
      artboardId="3"
      backHref={meta.backHref!}
      title="Which market do you want to join"
      subtitle="Select your city a search a city."
      footer={
        <>
          <WaitlistContinueButton href={meta.nextHref!} label="Claim my spot" />
          <Link href={meta.nextHref!} className="waitlist-link-secondary">
            Continue without selecting a market
          </Link>
        </>
      }
    >
      <div className="waitlist-city-grid">
        {WAITLIST_CITIES.map((city) => (
          <button
            key={city.id}
            type="button"
            className={
              "waitlist-city-card" + (selected === city.id ? " waitlist-city-card--selected" : "")
            }
            onClick={() => setSelected(city.id)}
          >
            <Image src={city.image} alt="" fill sizes="(max-width: 900px) 50vw, 25vw" />
            <span className="waitlist-city-card-overlay" aria-hidden="true" />
            <span className="waitlist-city-card-text">
              <span className="city-name">{city.name}</span>
              <span className="city-plans">{city.plans}</span>
              <span className="city-tonight">plans tonight</span>
            </span>
          </button>
        ))}
      </div>

      <div className="waitlist-search-block">
        <label className="waitlist-field-label waitlist-field-label--caps" htmlFor="city-search">
          Search any city
        </label>
        <input
          id="city-search"
          className="waitlist-box-input"
          type="search"
          placeholder="Search"
          autoComplete="off"
        />
      </div>
    </WaitlistStepShell>
  );

  return <WaitlistArtboardPage artboardId="3" mobile={mobile} />;
}
