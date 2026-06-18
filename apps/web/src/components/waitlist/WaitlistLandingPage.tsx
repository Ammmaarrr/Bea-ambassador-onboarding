"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Compass, Heart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { WAITLIST_ARTBOARDS, WAITLIST_CITIES, WAITLIST_HERO_CITIES } from "@/lib/waitlist";

import { WaitlistArtboardPage } from "./WaitlistArtboardPage";

export function WaitlistLandingPage() {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState("NYC");
  const [email, setEmail] = useState("");
  const nextHref = WAITLIST_ARTBOARDS["1"].nextHref!;

  function joinWaitlist() {
    router.push(nextHref);
  }

  const mobile = (
    <div className="waitlist-root waitlist-landing-mobile">
      <header className="waitlist-landing-header">
        <Link href="/waitlist" className="waitlist-landing-logo">
          Bea
        </Link>
        <Link href={nextHref} className="waitlist-landing-cta">
          Join waitlist
        </Link>
      </header>

      <section className="waitlist-hero">
        <div>
          <p className="waitlist-hero-eyebrow">LAUNCHING THIS SUMMER</p>
          <h1 className="waitlist-hero-title">Together, today.</h1>
          <p className="waitlist-hero-sub">24 hour to chat. Only see active profiles.</p>

          <form
            className="waitlist-email-pill"
            onSubmit={(e) => {
              e.preventDefault();
              joinWaitlist();
            }}
          >
            <input
              type="email"
              placeholder="Enter email to join waitlist"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" aria-label="Join waitlist">
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>

          <div className="waitlist-city-pills" role="tablist" aria-label="Cities">
            {WAITLIST_HERO_CITIES.map((city) => (
              <button
                key={city}
                type="button"
                role="tab"
                aria-selected={activeCity === city}
                className={
                  "waitlist-city-pill" +
                  (activeCity === city ? " waitlist-city-pill--active" : "")
                }
                onClick={() => setActiveCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <Image
          className="waitlist-hero-image"
          src="/waitlist/hero/couple.jpg"
          alt="Couple laughing at an outdoor dinner"
          width={640}
          height={480}
          priority
        />
      </section>

      <section className="waitlist-section waitlist-section--timer">
        <div className="waitlist-section-grid">
          <div className="waitlist-timer-ring">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#e8e0d8" strokeWidth="2.5" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeDasharray="207 276"
                strokeLinecap="round"
              />
            </svg>
            <div className="waitlist-timer-inner">
              <span className="waitlist-timer-time">23:58:12</span>
              <div className="waitlist-timer-labels">
                <span>HRS</span>
                <span>MIN</span>
                <span>SEC</span>
              </div>
              <Zap size={14} strokeWidth={2} style={{ marginTop: 8 }} />
            </div>
          </div>

          <div>
            <p className="waitlist-hero-eyebrow">BUILT FOR THE MOMENT</p>
            <h2 className="waitlist-section-heading">24 hours to connect.</h2>
            <p className="waitlist-section-serif">Less text, more date.</p>
            <div className="waitlist-feature-row">
              <span className="waitlist-feature-item">
                <Heart size={16} strokeWidth={1.75} /> Match with intention
              </span>
              <span className="waitlist-feature-item">
                <Clock size={16} strokeWidth={1.75} /> Connect today
              </span>
              <span className="waitlist-feature-item">
                <Compass size={16} strokeWidth={1.75} /> Explore anywhere
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="waitlist-section">
        <div className="waitlist-section-grid">
          <div>
            <p className="waitlist-hero-eyebrow">LAUNCHING SOON</p>
            <h2 className="waitlist-section-heading">We&apos;re curating something special.</h2>
          </div>

          <div className="waitlist-launch-cards">
            {WAITLIST_CITIES.map((city) => (
              <div key={city.id} className="waitlist-city-card waitlist-city-card--static">
                <Image src={city.image} alt="" fill sizes="25vw" />
                <span className="waitlist-city-card-overlay" aria-hidden="true" />
                <span className="waitlist-city-card-text">
                  <span className="city-name">{city.name}</span>
                  <span className="city-plans">{city.plans}</span>
                  <span className="city-tonight">plans tonight</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="waitlist-section waitlist-section--footer">
        <div className="waitlist-footer-cta">
          <h2 className="waitlist-footer-title">
            Join the waitlist for <em>early access and perks</em>
          </h2>
          <input
            className="waitlist-box-input waitlist-footer-input"
            type="email"
            placeholder="Your email address"
            aria-label="Your email address"
          />
        </div>
      </section>
    </div>
  );

  return <WaitlistArtboardPage artboardId="1" mobile={mobile} />;
}
