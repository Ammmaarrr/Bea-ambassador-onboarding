"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { WAITLIST_ARTBOARDS, WAITLIST_CITIES, type WaitlistStepArtboardId } from "@/lib/waitlist";
import { WAITLIST_STEP_LAYOUTS } from "@/lib/waitlist-layout";
import { WAITLIST_PAGE_CONTENT } from "@/lib/waitlist-page-content";
import { WAITLIST_STEPPER } from "@/lib/waitlist-progress";

import { WaitlistCityCard } from "./WaitlistCityCard";

type Props = {
  artboardId: WaitlistStepArtboardId;
};

function CanvasProgress({ filledCount }: { filledCount: number }) {
  const { cover, top, height, trackLeft, segments, barActive, barInactive, maskBg } =
    WAITLIST_STEPPER;
  let x = trackLeft;
  const bars = segments.map((seg, i) => {
    const bar = { x, width: seg.width, filled: i < filledCount };
    x += seg.width + seg.gapAfter;
    return bar;
  });

  return (
    <svg
      className="waitlist-canvas__progress"
      style={{ left: cover.left, top: cover.top, width: cover.width, height: cover.height }}
      viewBox={`0 0 ${cover.width} ${cover.height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect width={cover.width} height={cover.height} fill={maskBg} />
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x - cover.left}
          y={top - cover.top}
          width={bar.width}
          height={height}
          fill={bar.filled ? barActive : barInactive}
        />
      ))}
    </svg>
  );
}

/** Pixel-perfect join steps — scaled 1367px canvas, selectable HTML. */
export function WaitlistStepDesktopCanvas({ artboardId }: Props) {
  const layout = WAITLIST_STEP_LAYOUTS[artboardId];
  const content = WAITLIST_PAGE_CONTENT[artboardId];
  const meta = WAITLIST_ARTBOARDS[artboardId];
  const filledCount = meta.progressIndex ?? 0;
  const { width, height, back, copy, cta } = layout;

  return (
    <div
      className="waitlist-canvas-viewport"
      style={{ height: `calc(${height}px * min(1, 100cqw / ${width}px))` }}
    >
      <div
        className={`waitlist-canvas waitlist-canvas--step waitlist-canvas--${artboardId}`}
        style={{ width, height, backgroundColor: WAITLIST_STEPPER.maskBg }}
      >
        <Link
          href={back.href}
          className="waitlist-canvas__back"
          style={{ left: back.left, top: back.top, width: back.width, height: back.height }}
          aria-label="Go back"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>

        <CanvasProgress filledCount={filledCount} />

        <div
          className="waitlist-canvas__copy"
          style={{ left: copy.left, top: copy.top, width: copy.width }}
        >
          <h1 className="waitlist-canvas__title">{content.title}</h1>
          {content.subtitle ? (
            <p className="waitlist-canvas__subtitle">{content.subtitle}</p>
          ) : null}
        </div>

        {artboardId === "3" &&
          layout.cityCards?.map((card, i) => {
            const city = WAITLIST_CITIES[i];
            if (!city) return null;
            return (
              <div
                key={city.id}
                className="waitlist-canvas__city-slot"
                style={{ left: card.left, top: card.top, width: card.width, height: card.height }}
              >
                <WaitlistCityCard city={city} selected={i === 0} onSelect={() => {}} />
              </div>
            );
          })}

        {layout.inputs?.map((field, i) => (
          <div key={field.id}>
            {"variant" in field && field.variant === "underline" ? (
              <label
                className="waitlist-canvas__field-label waitlist-canvas__field-label--plain"
                style={{ left: field.left, top: field.top - 36, width: field.width }}
                htmlFor={field.id}
              >
                {i === 0 ? "First name" : "How old are you?"}
              </label>
            ) : null}
            {artboardId === "3" && (
              <label
                className="waitlist-canvas__field-label"
                style={{ left: field.left, top: field.top - 28, width: field.width }}
                htmlFor={field.id}
              >
                SEARCH ANY CITY
              </label>
            )}
            {artboardId === "5" && (
              <label
                className="waitlist-canvas__field-label"
                style={{ left: field.left, top: field.top - 28, width: field.width }}
                htmlFor={field.id}
              >
                Search your school
              </label>
            )}
            <input
              id={field.id}
              name={field.id}
              type={field.type as "text" | "email" | "search" | "number"}
              placeholder={field.placeholder || "Search"}
              className={
                "variant" in field && field.variant === "underline"
                  ? "waitlist-canvas__underline-input"
                  : "waitlist-canvas__box-input"
              }
              style={{
                left: field.left,
                top: field.top,
                width: field.width,
                height: field.height,
              }}
            />
          </div>
        ))}

        {artboardId === "5" && layout.schoolCard && (
          <button
            type="button"
            className="waitlist-canvas__school-card"
            style={{
              left: layout.schoolCard.left,
              top: layout.schoolCard.top,
              width: layout.schoolCard.width,
              height: layout.schoolCard.height,
            }}
          >
            <span className="waitlist-canvas__school-name">New York University</span>
            <span className="waitlist-canvas__school-city">New York</span>
          </button>
        )}

        {artboardId === "5" && layout.notInSchool && (
          <button
            type="button"
            className="waitlist-canvas__secondary-btn"
            style={{
              left: layout.notInSchool.left,
              top: layout.notInSchool.top,
              width: layout.notInSchool.width,
              height: layout.notInSchool.height,
            }}
          >
            I&apos;m not currently in school
          </button>
        )}

        <Link
          href={cta.href}
          className="waitlist-canvas__cta"
          style={{ left: cta.left, top: cta.top, width: cta.width, height: cta.height }}
        >
          <span>{cta.label}</span>
          <span className="waitlist-canvas__cta-arrow" aria-hidden>
            →
          </span>
        </Link>

        {layout.secondaryLink && (
          <Link
            href={layout.secondaryLink.href}
            className="waitlist-canvas__link-secondary"
            style={{
              left: layout.secondaryLink.left,
              top: layout.secondaryLink.top,
              width: layout.secondaryLink.width,
            }}
          >
            {layout.secondaryLink.label}
          </Link>
        )}
      </div>
    </div>
  );
}
