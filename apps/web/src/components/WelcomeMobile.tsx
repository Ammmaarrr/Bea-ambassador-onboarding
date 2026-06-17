import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MobileNav } from "./MobileNav";
import { OnboardingStepper } from "./OnboardingStepper";
import { PrizeCard, type PrizeCardData } from "./PrizeCard";

import { ARTBOARD, fontAptos } from "@/lib/design";

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
    titleNoWrap: true,
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

/** Phone-only welcome layout (<768px). */
export function WelcomeMobile() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden pb-[env(safe-area-inset-bottom)] text-neutral-900"
      style={{ backgroundColor: ARTBOARD.bg, fontFamily: fontAptos }}
    >
      <MobileNav activeIndex={0} />
      <OnboardingStepper activeIndex={0} layout="mobile" />

      <section className="border-b px-5 pb-8 pt-6" style={{ borderColor: ARTBOARD.sectionDivider }}>
        <h1
          className="font-canela onboarding-heading text-[36px] leading-[1.12] text-black"
            style={{ letterSpacing: "-0.02em" }}
          >
            Welcome to
            <br />
            Campus launch
          </h1>

          <p
            className="mt-5 max-w-[373px] text-[16px] leading-[26px]"
            style={{
              fontFamily: fontAptos,
              fontWeight: 400,
              color: "#7c7c7c",
            }}
          >
            A little friendly competition to help launch bea on your campus.
          </p>

          <div
            className="mx-auto mt-8 max-w-[290px] overflow-hidden rounded-[14px]"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Image
              src="/images/hero-trophy-card.png"
              alt="National Champion $24,000"
              width={290}
              height={490}
              className="block h-auto w-full"
            />
          </div>

          <Link
            href="/your-school"
            className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-[10px] text-[14px] text-white transition-opacity hover:opacity-90 active:opacity-80 sm:w-[253px]"
            style={{
              borderRadius: "13px",
              backgroundColor: "#1c1c1c",
              fontWeight: 500,
              fontFamily: fontAptos,
            }}
          >
            Start your journey
            <ArrowRight className="h-[14px] w-[14px] flex-shrink-0" strokeWidth={1.5} />
          </Link>
      </section>

      <section className="px-5 pb-[80px]" style={{ paddingTop: ARTBOARD.prizesSectionPaddingTop }}>
        <div className="mb-[40px] text-center">
          <h2
            className="font-canela onboarding-heading text-[24px]"
            style={{ letterSpacing: "-0.3px" }}
          >
            Represent. Grow. Win.
          </h2>
          <p
            className="mt-[8px] text-[14px] text-[#9a9490]"
            style={{ fontWeight: 400, fontFamily: fontAptos }}
          >
            Prizes at the campus, market, and national level.
          </p>
        </div>

        <ul className="onboarding-prize-list">
          {prizeCards.map((card) => (
            <li key={card.title}>
              <PrizeCard card={card} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
