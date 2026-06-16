import Link from "next/link";

import overlays from "@/lib/artboard-overlays.json";

import { ARTBOARD, artboardActiveIndex } from "@/lib/design";

import { ArtboardStepHeader } from "./ArtboardStepHeader";
import { MobileNav } from "./MobileNav";
import { OnboardingStepper } from "./OnboardingStepper";

export type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type OverlayLink = Rect & {
  href: string;
  label: string;
};

type Props = {
  pageKey: keyof typeof overlays.pages;
  children?: React.ReactNode;
};

/** Renders the full 1367×1153 artboard PNG with invisible hit-target overlays. */
export function FullArtboardPage({ pageKey, children }: Props) {
  const { width, height } = overlays;
  const page = overlays.pages[pageKey];
  const activeIndex = artboardActiveIndex[pageKey];
  const hitLinks: OverlayLink[] = page.cta ? [page.cta] : [];

  return (
    <>
      <MobileNav activeIndex={activeIndex} />
      {pageKey !== "youre-in" && <OnboardingStepper activeIndex={activeIndex} />}

      <div className="onboarding-artboard-viewport">
        <div className="onboarding-artboard-canvas artboard-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.src}
            alt=""
            width={width}
            height={height}
            draggable={false}
            style={{ width, height, display: "block", userSelect: "none" }}
          />

          <ArtboardStepHeader
            activeIndex={activeIndex}
            showStepper={pageKey !== "youre-in"}
          />

          {hitLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              aria-label={link.label}
              className="artboard-hit"
              style={{
                left: link.left,
                top: link.top,
                width: link.width,
                height: link.height,
              }}
            />
          ))}

          {children}
        </div>
      </div>
    </>
  );
}
