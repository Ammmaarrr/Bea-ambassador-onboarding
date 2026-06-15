import Image from "next/image";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { OnboardingHeader } from "./OnboardingHeader";

import { PrizeCard, type PrizeCardData } from "./PrizeCard";

import { ARTBOARD, fontAptos, stepRoutes } from "@/lib/design";

/** Welcome-page stepper circle positions measured from design Artboard 1
    (circle centers 496..1163), then shifted left 13px so step 1 sits over the
    "W" of the heading — our heading renders ~13px left of the design artboard. */
const WELCOME_STEPS = [
  { label: "Welcome", left: 472, top: 78 },
  { label: "Your School", left: 579, top: 78 },
  { label: "Prizes", left: 735, top: 78 },
  { label: "Account creation", left: 886, top: 78 },
  { label: "Invites", left: 1022, top: 78 },
  { label: "You're In", left: 1139, top: 78 },
];



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



export function WelcomePage() {

  return (

    <div

      className="relative min-h-screen w-full overflow-x-hidden text-neutral-900 mx-auto max-w-[1367px] min-[1367px]:min-h-[1153px] pb-[env(safe-area-inset-bottom)]"

      style={{ backgroundColor: ARTBOARD.bg, fontFamily: fontAptos }}

    >

      {/* Stepper overlay — absolute, pixel-aligned to design Artboard 1 */}
      <nav
        className="artboard-stepper hidden min-[1367px]:block"
        style={{ fontFamily: fontAptos }}
        aria-label="Onboarding progress"
      >
        {WELCOME_STEPS.map((step, i) => {
          const isActive = i === 0;
          return (
            <Link
              key={step.label}
              href={stepRoutes[i]}
              className="artboard-step"
              style={{ left: step.left, top: step.top }}
            >
              <span
                className={
                  "artboard-step-circle" +
                  (isActive ? " artboard-step-circle--active" : "")
                }
              >
                {i + 1}
              </span>
              <span
                className={
                  "artboard-step-label" +
                  (isActive ? " artboard-step-label--active" : "")
                }
              >
                {step.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <section
        className="relative grid grid-cols-1 lg:grid-cols-[404px_1fr] lg:items-stretch lg:h-[674px] lg:max-h-[674px] border-b"
        style={{ borderColor: ARTBOARD.sectionDivider }}
      >

        <div className="relative w-full leading-[0] overflow-hidden max-h-[42vh] sm:max-h-[360px] lg:max-h-[674px] lg:h-[674px]">

          <Image

            src="/images/hero-students.png"

            alt="Students sitting on campus steps"

            width={404}

            height={674}

            priority

            className="w-full h-full min-h-[220px] object-cover object-top block lg:absolute lg:inset-0 lg:min-h-0"

          />

        </div>



        <div className="relative flex flex-col min-w-0 min-h-0 min-[1367px]:lg:pl-0 lg:pl-[40px] lg:pr-[32px] min-[1367px]:lg:pr-[82px] lg:pb-0">

          <OnboardingHeader />



          <div className="flex flex-col lg:flex-1 lg:flex-row lg:items-start gap-8 lg:gap-0 mt-[88px] min-w-0 px-4 sm:px-6 md:px-10 min-[1367px]:px-0">

            <div className="flex-1 flex flex-col min-w-0">

              <h1
                className="font-canela w-[505px] max-w-full h-auto min-[1367px]:h-[163px] text-[34px] leading-[1.12] sm:text-[44px] md:text-[50px] lg:text-[60px] lg:leading-[1.358] text-black"
                style={{
                  color: "#000000",
                  letterSpacing: "-0.02em",
                }}
              >

                Welcome to

                <br />

                Campus launch

              </h1>



              <p

                className="mt-[26px] w-[373px] max-w-full min-[1367px]:h-[78px] text-[16px] leading-[26px] sm:text-[17px] sm:leading-[28px] lg:text-[18px] lg:leading-[32px]"

                style={{

                  fontFamily: fontAptos,

                  fontWeight: 400,

                  color: "#7c7c7c",

                }}

              >

                A little friendly competition to help launch bea on your campus.

              </p>



              <div className="hidden lg:block flex-1 min-h-0" />



              <Link

                href="/your-school"

                className="mt-8 lg:mt-0 w-full sm:w-[253px] min-h-[52px] inline-flex items-center justify-center gap-[10px] text-white text-[14px] hover:opacity-90 active:opacity-80 transition-opacity"

                style={{

                  borderRadius: "13px",

                  backgroundColor: "#1c1c1c",

                  fontWeight: 500,

                  fontFamily: fontAptos,

                }}

              >

                Start your journey

                <ArrowRight className="w-[14px] h-[14px] flex-shrink-0" strokeWidth={1.5} />

              </Link>

            </div>



            <div

              data-trophy-card

              className="w-[290px] max-w-full mx-auto lg:mx-0 lg:ml-6 shrink-0 overflow-hidden rounded-[14px]"

              style={{

                border: "1px solid rgba(0,0,0,0.08)",

                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",

                alignSelf: "flex-start",

              }}

            >

              <Image

                src="/images/hero-trophy-card.png"

                alt="National Champion $24,000"

                width={290}

                height={490}

                className="w-full h-auto block"

              />

            </div>

          </div>

        </div>

      </section>

      <section
        className="pb-[80px] px-4 sm:px-6 md:px-10 lg:px-0"
        style={{ paddingTop: ARTBOARD.prizesSectionPaddingTop }}
      >

        <div className="text-center mb-[40px]">

          <h2
            className="font-canela text-[24px] text-[#1a1a1a]"
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



        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[420px] sm:max-w-none mx-auto lg:hidden">

          {prizeCards.map((card) => (

            <PrizeCard key={card.title} card={card} />

          ))}

        </div>

        <div

          data-prize-row="desktop"

          className="hidden lg:flex w-full min-w-0 items-start justify-between gap-5 pl-[84px] pr-[82px]"

        >

          {prizeCards.map((card) => (

            <div key={card.title} className="shrink-0" style={{ width: card.width }}>

              <PrizeCard card={card} />

            </div>

          ))}

        </div>

      </section>

    </div>

  );

}


