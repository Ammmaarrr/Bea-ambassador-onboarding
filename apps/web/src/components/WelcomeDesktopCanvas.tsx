import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WELCOME_LAYOUT } from "@/lib/onboarding-layout";

import { ArtboardHeroLogo } from "./ArtboardHeroLogo";
import { ArtboardStepHeader } from "./ArtboardStepHeader";
import { PrizeCard, type PrizeCardData } from "./PrizeCard";

const prizeCards: PrizeCardData[] = [
  {
    illustration: "/images/illus-campus.png",
    title: "Campus Champion",
    subtitle: "Win at your school",
    badgeText: "TOP PRIZE $240",
    badge: {
      backgroundColor: "#e4eddf",
      borderColor: "#99aa87",
      color: "#3f5236",
    },
    width: 380,
  },
  {
    illustration: "/images/illus-market.png",
    title: "Market Champion",
    subtitle: "Win in your market",
    badgeText: "TOP PRIZE $2400",
    badge: {
      backgroundColor: "#ebe4f4",
      borderColor: "#b0a3c6",
      color: "#534663",
    },
    width: 380,
  },
  {
    illustration: "/images/illus-national.png",
    title: "National Champion",
    subtitle: "Win across the country",
    badgeText: "TOP PRIZE $24,000",
    badge: {
      backgroundColor: "#f5ebe0",
      borderColor: "#c9b59a",
      color: "#6b5340",
    },
    width: 400,
  },
];

/** Pixel-perfect welcome — scaled 1367px canvas, selectable HTML text. */
export function WelcomeDesktopCanvas() {
  const { photo, trophy, copy, cta, prizes } = WELCOME_LAYOUT;

  return (
    <div className="onboarding-canvas-viewport">
      <div className="onboarding-canvas onboarding-canvas--welcome">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-students.png"
          alt=""
          className="onboarding-welcome-canvas__photo"
          width={photo.width}
          height={photo.height}
          draggable={false}
        />

        <div className="onboarding-welcome-canvas__header">
          <ArtboardStepHeader activeIndex={0} variant="welcome" />
          <ArtboardHeroLogo />
        </div>

        <div
          className="onboarding-welcome-canvas__copy"
          style={{ left: copy.left, top: copy.top, width: copy.width }}
        >
          <h1 className="onboarding-welcome-hero-title">
            Welcome to
            <br />
            Campus launch
          </h1>

          <p className="form-subtitle">
            A little friendly competition to help launch bea on your campus.
          </p>
        </div>

        <Link
          href={cta.href}
          className="btn-login onboarding-welcome-cta onboarding-canvas__cta"
          style={{ left: cta.left, top: cta.top, width: cta.width, height: 52 }}
        >
          <span>{cta.label}</span>
          <span className="btn-arrow">
            <ArrowRight strokeWidth={2} aria-hidden="true" />
          </span>
        </Link>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-trophy-card.png"
          alt=""
          data-trophy-card
          className="onboarding-welcome-canvas__trophy"
          width={trophy.width}
          height={trophy.height}
          draggable={false}
          style={{ left: trophy.left, top: trophy.top }}
        />

        <section
          className="onboarding-welcome-canvas__prizes"
          style={{ top: prizes.top }}
        >
          <div className="onboarding-welcome-canvas__prizes-header">
            <h2 className="font-canela onboarding-heading onboarding-welcome-canvas__prizes-title">
              Represent. Grow. Win.
            </h2>
            <p className="onboarding-welcome-canvas__prizes-sub">
              Prizes at the campus, market, and national level.
            </p>
          </div>

          <ul className="onboarding-welcome-canvas__prize-row" data-prize-row="desktop">
            {prizeCards.map((card) => (
              <li key={card.title}>
                <PrizeCard card={card} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
