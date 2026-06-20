"use client";

import { useEffect, useState } from "react";

const RING_R = 44;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;
const DAY_MS = 24 * 60 * 60 * 1000;

function msUntilNextLocalMidnight(now = new Date()): number {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, midnight.getTime() - now.getTime());
}

function formatHms(totalMs: number): string {
  const totalSec = Math.max(0, Math.floor(totalMs / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

/** Live 24h countdown ring — ticks every second until local midnight. */
export function WaitlistCountdownRing() {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemainingMs(msUntilNextLocalMidnight());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = remainingMs ?? DAY_MS;
  const progress = remaining / DAY_MS;
  const dash = progress * CIRCUMFERENCE;
  const display = formatHms(remaining);

  return (
    <div
      className="waitlist-timer-ring"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Countdown ${display} until launch window resets`}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={RING_R} fill="none" stroke="#ebe4dc" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={RING_R}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="6"
          strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="waitlist-timer-inner">
        <time className="waitlist-timer-time" suppressHydrationWarning>
          {display}
        </time>
        <div className="waitlist-timer-labels" aria-hidden="true">
          <span>HRS</span>
          <span>MIN</span>
          <span>SEC</span>
        </div>
      </div>
    </div>
  );
}
