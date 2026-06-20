"use client";

import { useState } from "react";

import { fontSans } from "@/lib/design";
import overlays from "@/lib/waitlist-overlays.json";

type CityPill = {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
};

const PILLS = overlays.pages["1"].cityPills as CityPill[];
const ROW = PILLS[0];
const ROW_LEFT = ROW.left;
const ROW_TOP = ROW.top;
const ROW_WIDTH = PILLS[PILLS.length - 1].left + PILLS[PILLS.length - 1].width - ROW_LEFT;
const ROW_HEIGHT = ROW.height;
const PAGE_BG = overlays.bg;

/**
 * Desktop overlay for artboard 1 city pills — exact coords from waitlist-overlays.json.
 * The white carousel strip below stays as the baked PNG (empty by design).
 */
export function WaitlistLandingDesktopCityPills() {
  const [activeLabel, setActiveLabel] = useState(PILLS[0].label);

  return (
    <div
      className="waitlist-landing-desktop-pills"
      style={{
        position: "absolute",
        left: ROW_LEFT,
        top: ROW_TOP,
        width: ROW_WIDTH,
        height: ROW_HEIGHT,
        pointerEvents: "auto",
        zIndex: 55,
      }}
    >
      {/* Hide baked PNG pills so coded active/inactive states are the only layer */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: PAGE_BG,
          borderRadius: 999,
        }}
      />

      {PILLS.map((pill) => {
        const selected = pill.label === activeLabel;
        return (
          <button
            key={pill.label}
            type="button"
            aria-pressed={selected}
            aria-label={pill.label}
            onClick={() => setActiveLabel(pill.label)}
            style={{
              position: "absolute",
              left: pill.left - ROW_LEFT,
              top: 0,
              width: pill.width,
              height: pill.height,
              margin: 0,
              padding: 0,
              boxSizing: "border-box",
              borderRadius: 999,
              border: `1px solid ${selected ? "#1a1a1a" : "#d8d5cf"}`,
              background: selected ? "#1a1a1a" : "#ffffff",
              color: selected ? "#ffffff" : "#1a1a1a",
              fontFamily: fontSans,
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}
