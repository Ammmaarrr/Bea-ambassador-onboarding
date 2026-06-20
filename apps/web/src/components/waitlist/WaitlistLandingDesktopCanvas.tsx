"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { WAITLIST_ARTBOARDS, WAITLIST_CITIES, WAITLIST_HERO_IMAGE } from "@/lib/waitlist";
import { WAITLIST_LANDING_LAYOUT } from "@/lib/waitlist-layout";
import { WAITLIST_LANDING_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCityCard } from "./WaitlistCityCard";
import { WaitlistCountdownRing } from "./WaitlistCountdownRing";

/** Pixel-perfect waitlist landing — scaled 1367×2102 canvas. */
export function WaitlistLandingDesktopCanvas() {
  const L = WAITLIST_LANDING_LAYOUT;
  const joinHref = WAITLIST_ARTBOARDS["1"].nextHref!;
  const [activePill, setActivePill] = useState(0);
  const [selectedCity, setSelectedCity] = useState<string | null>(WAITLIST_CITIES[0]?.id ?? null);

  return (
    <div
      className="waitlist-canvas-viewport waitlist-canvas-viewport--landing"
      style={{ height: `calc(${L.height}px * min(1, 100cqw / ${L.width}px))` }}
    >
      <div
        className="waitlist-canvas waitlist-canvas--landing"
        style={{ width: L.width, height: L.height }}
      >
        <Link href="/waitlist" className="waitlist-canvas__logo" style={{ left: L.header.logo.left, top: L.header.logo.top }}>
          Bea
        </Link>
        <nav className="waitlist-canvas__nav" aria-label="Primary">
          {L.header.nav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="waitlist-canvas__nav-link"
              style={{ left: link.left, top: link.top, width: link.width, height: link.height }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href={L.header.cta.href}
          className="waitlist-canvas__header-cta"
          style={{
            left: L.header.cta.left,
            top: L.header.cta.top,
            width: L.header.cta.width,
            height: L.header.cta.height,
          }}
        >
          Join waitlist
        </Link>

        <div className="waitlist-canvas__hero-copy" style={{ left: L.hero.copy.left, top: L.hero.copy.top, width: L.hero.copy.width }}>
          <p className="waitlist-canvas__eyebrow">{WAITLIST_LANDING_CONTENT.eyebrow}</p>
          <h1 className="waitlist-canvas__hero-title">
            Together,
            <br />
            today.
          </h1>
          <p className="waitlist-canvas__hero-sub">{WAITLIST_LANDING_CONTENT.subtitle}</p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={L.hero.image.src || WAITLIST_HERO_IMAGE}
          alt=""
          className="waitlist-canvas__hero-photo"
          width={L.hero.image.width}
          height={L.hero.image.height}
          draggable={false}
          style={{ left: L.hero.image.left, top: L.hero.image.top }}
        />

        <form
          className="waitlist-canvas__email-pill"
          action={joinHref}
          style={{
            left: L.hero.email.left,
            top: L.hero.email.top,
            width: L.hero.email.width + L.hero.submit.width + 8,
            height: L.hero.email.height,
          }}
        >
          <input
            type="email"
            name="email"
            placeholder={WAITLIST_LANDING_CONTENT.emailPlaceholder}
            aria-label={WAITLIST_LANDING_CONTENT.emailPlaceholder}
            style={{ width: L.hero.email.width, height: L.hero.email.height }}
          />
          <button
            type="submit"
            aria-label="Join waitlist"
            style={{ width: L.hero.submit.width, height: L.hero.submit.height }}
          >
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </form>

        {L.hero.pills.map((pill, i) => (
          <button
            key={pill.label}
            type="button"
            className={"waitlist-canvas__city-pill" + (i === activePill ? " is-active" : "")}
            style={{ left: pill.left, top: pill.top, width: pill.width, height: pill.height }}
            aria-pressed={i === activePill}
            onClick={() => setActivePill(i)}
          >
            {pill.label}
          </button>
        ))}

        <div className="waitlist-canvas__timer" style={{ left: L.timer.ring.left, top: L.timer.ring.top, width: L.timer.ring.width, height: L.timer.ring.height }}>
          <WaitlistCountdownRing />
        </div>

        <div className="waitlist-canvas__features" style={{ left: L.timer.features.left, top: L.timer.features.top, width: L.timer.features.width }}>
          <p className="waitlist-canvas__eyebrow">{WAITLIST_LANDING_CONTENT.featuresEyebrow}</p>
          <h2 className="waitlist-canvas__section-title">{WAITLIST_LANDING_CONTENT.featuresTitle}</h2>
          <p className="waitlist-canvas__section-serif">{WAITLIST_LANDING_CONTENT.featuresSub}</p>
          <div className="waitlist-canvas__feature-row">
            {WAITLIST_LANDING_CONTENT.features.map((feature) => (
              <div key={feature.label} className="waitlist-canvas__feature-item">
                <span aria-hidden>{feature.icon}</span>
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="waitlist-canvas__launch-copy" style={{ left: L.launch.copy.left, top: L.launch.copy.top, width: L.launch.copy.width }}>
          <p className="waitlist-canvas__eyebrow">LAUNCHING SOON</p>
          <h2 className="waitlist-canvas__section-title">{WAITLIST_LANDING_CONTENT.launchSubtitle}</h2>
        </div>

        {WAITLIST_CITIES.map((city, i) => {
          const left = L.launch.cards.lefts[i];
          if (left == null) return null;
          return (
            <div
              key={city.id}
              className="waitlist-canvas__launch-card-slot"
              style={{
                left,
                top: L.launch.cards.top,
                width: L.launch.cards.width,
                height: L.launch.cards.height,
              }}
            >
              <WaitlistCityCard
                city={city}
                selected={selectedCity === city.id}
                onSelect={() => setSelectedCity(city.id)}
              />
            </div>
          );
        })}

        <div className="waitlist-canvas__footer-copy" style={{ left: L.footer.copy.left, top: L.footer.copy.top, width: L.footer.copy.width }}>
          <h2 className="waitlist-canvas__footer-title">
            {WAITLIST_LANDING_CONTENT.footerTitle}
            <br />
            <em>{WAITLIST_LANDING_CONTENT.footerEmphasis}</em>
          </h2>
        </div>

        <form className="waitlist-canvas__footer-email" action={joinHref} style={{ left: L.footer.email.left, top: L.footer.email.top, width: L.footer.email.width, height: L.footer.email.height }}>
          <input
            type="email"
            name="email"
            placeholder={WAITLIST_LANDING_CONTENT.footerEmailPlaceholder}
            aria-label={WAITLIST_LANDING_CONTENT.footerEmailPlaceholder}
          />
        </form>
      </div>
    </div>
  );
}
