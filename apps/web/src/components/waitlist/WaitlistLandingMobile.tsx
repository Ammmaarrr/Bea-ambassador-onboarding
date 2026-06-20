import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WAITLIST_ARTBOARDS, WAITLIST_HERO_IMAGE } from "@/lib/waitlist";
import { WAITLIST_LANDING_CONTENT } from "@/lib/waitlist-page-content";

import { WaitlistCountdownRing } from "./WaitlistCountdownRing";
import { WaitlistExperienceBanner } from "./WaitlistExperienceBanner";
import { WaitlistHeroCityPills } from "./WaitlistHeroCityPills";
import { WaitlistLaunchCityRow } from "./WaitlistLaunchCityRow";

/** Coded waitlist landing — selectable HTML, artboard layout at desktop widths. */
export function WaitlistLandingMobile() {
  const joinHref = WAITLIST_ARTBOARDS["1"].nextHref!;

  return (
    <div className="waitlist-root waitlist-landing-mobile">
      <header className="waitlist-landing-header">
        <Link href="/waitlist" className="waitlist-landing-logo">
          Bea
        </Link>
        <nav className="waitlist-landing-nav" aria-label="Primary">
          <a href="#faq">FAQ</a>
          <a href="#ambassadors">Ambassadors</a>
          <a href="#calendar">Calendar</a>
        </nav>
        <Link href={joinHref} className="waitlist-landing-cta">
          Join waitlist
        </Link>
      </header>

      <section className="waitlist-hero">
        <div className="waitlist-hero-copy">
          <p className="waitlist-hero-eyebrow">{WAITLIST_LANDING_CONTENT.eyebrow}</p>
          <h1 className="waitlist-hero-title">
            Together,
            <br />
            today.
          </h1>
          <p className="waitlist-hero-sub">{WAITLIST_LANDING_CONTENT.subtitle}</p>

          <form className="waitlist-email-pill" action={joinHref}>
            <input
              type="email"
              name="email"
              placeholder={WAITLIST_LANDING_CONTENT.emailPlaceholder}
              aria-label={WAITLIST_LANDING_CONTENT.emailPlaceholder}
            />
            <button type="submit" aria-label="Join waitlist">
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>

          <WaitlistHeroCityPills cities={WAITLIST_LANDING_CONTENT.heroCities} defaultActive="NYC" />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WAITLIST_HERO_IMAGE}
          alt=""
          className="waitlist-hero-image"
          width={600}
          height={450}
        />
      </section>

      {/*
        Timer + Features section (artboard: timer ring LEFT, features text RIGHT).
        DOM order keeps text first so mobile stacks: text → timer.
        CSS `order` swaps them at desktop → timer LEFT, features text RIGHT.
      */}
      <section className="waitlist-section waitlist-section--timer">
        <div className="waitlist-section-grid">
          <div className="waitlist-timer-features">
            <p className="waitlist-features-eyebrow">{WAITLIST_LANDING_CONTENT.featuresEyebrow}</p>
            <h2 className="waitlist-section-heading waitlist-features-title waitlist-section-heading--serif">
              {WAITLIST_LANDING_CONTENT.featuresTitle}
            </h2>
            <p className="waitlist-features-sub">{WAITLIST_LANDING_CONTENT.featuresSub}</p>
            <div className="waitlist-feature-row">
              {WAITLIST_LANDING_CONTENT.features.map((feature) => (
                <div key={feature.label} className="waitlist-feature-item">
                  <span className="waitlist-feature-icon" aria-hidden>
                    {feature.icon}
                  </span>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
          <WaitlistCountdownRing />
        </div>
      </section>

      {/*
        Cities section (artboard: "LAUNCHING SOON" text LEFT, city cards RIGHT).
        waitlist-launch-grid switches to 2-col at desktop.
      */}
      <section className="waitlist-section waitlist-section--launch">
        <div className="waitlist-launch-grid">
          <div className="waitlist-launch-copy">
            <p className="waitlist-features-eyebrow">LAUNCHING SOON</p>
            <h2 className="waitlist-section-heading waitlist-section-heading--serif">
              {WAITLIST_LANDING_CONTENT.launchSubtitle}
            </h2>
          </div>
          <WaitlistLaunchCityRow />
        </div>
      </section>

      {/* Experience section — mobile only; hidden at desktop (not in artboard 1 desktop layout) */}
      <section className="waitlist-section waitlist-section--experience">
        <WaitlistExperienceBanner />
      </section>

      <section className="waitlist-section waitlist-section--footer">
        <div className="waitlist-footer-cta">
          <h2 className="waitlist-footer-title">
            {WAITLIST_LANDING_CONTENT.footerTitle}
            <br />
            <em>{WAITLIST_LANDING_CONTENT.footerEmphasis}</em>
          </h2>
          <form className="waitlist-footer-form" action={joinHref}>
            <input
              type="email"
              name="email"
              className="waitlist-box-input waitlist-footer-input"
              placeholder={WAITLIST_LANDING_CONTENT.footerEmailPlaceholder}
              aria-label={WAITLIST_LANDING_CONTENT.footerEmailPlaceholder}
            />
            <button type="submit" className="waitlist-btn-primary waitlist-footer-submit">
              {WAITLIST_LANDING_CONTENT.footerCta}
              <ArrowRight size={18} strokeWidth={2} aria-hidden />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
