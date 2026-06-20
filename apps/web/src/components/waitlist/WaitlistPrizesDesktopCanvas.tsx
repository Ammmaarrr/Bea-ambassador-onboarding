"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Gift,
  Globe,
  GraduationCap,
  MapPin,
  Trophy,
  UserPlus,
} from "lucide-react";

import { WAITLIST_PRIZES_LAYOUT } from "@/lib/waitlist-layout";
import { WAITLIST_APP_SHELL, WAITLIST_PRIZES_DETAIL } from "@/lib/waitlist-page-content";
import { WAITLIST_ASSETS } from "@/lib/waitlist-assets";

const RANK_ICONS = {
  campus: GraduationCap,
  market: Building2,
  national: Globe,
} as const;

const NAV_ICONS = {
  today: CalendarDays,
  voices: Trophy,
  markets: MapPin,
  invite: UserPlus,
  rewards: Gift,
} as const;

/** Pixel-perfect prizes dashboard — artboard 9, scaled 1367×1696 canvas. */
export function WaitlistPrizesDesktopCanvas() {
  const L = WAITLIST_PRIZES_LAYOUT;
  const c = WAITLIST_PRIZES_DETAIL;
  const { logo, nav, ranks, profile } = WAITLIST_APP_SHELL;

  return (
    <div
      className="waitlist-canvas-viewport"
      style={{ ["--wl-canvas-h" as string]: `${L.height}px` }}
    >
      <div className="waitlist-canvas waitlist-canvas--prizes">
        <aside
          className="waitlist-canvas__prizes-sidebar"
          style={{
            left: L.sidebar.left,
            top: L.sidebar.top,
            width: L.sidebar.width,
            height: L.sidebar.height,
          }}
        >
          <Link href="/waitlist" className="waitlist-canvas__prizes-logo">
            {logo}
          </Link>
          <ul className="waitlist-canvas__prizes-nav">
            {nav.map((item) => {
              const Icon = NAV_ICONS[item.icon];
              const active = "active" in item && item.active;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    className={"waitlist-canvas__prizes-nav-link" + (active ? " is-active" : "")}
                  >
                    <Icon size={18} strokeWidth={1.6} aria-hidden />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="waitlist-canvas__prizes-ranks">
            {ranks.map((r) => (
              <div key={r.detail} className="waitlist-canvas__prizes-rank">
                <span className="waitlist-canvas__prizes-rank-dot" aria-hidden />
                <div>
                  <p className="waitlist-canvas__prizes-rank-org">{r.org}</p>
                  <p className="waitlist-canvas__prizes-rank-detail">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div
          className="waitlist-canvas__prizes-profile"
          style={{
            left: L.profile.left,
            top: L.profile.top,
            width: L.profile.width,
            height: L.profile.height,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.avatar} alt="" width={36} height={36} />
          <div className="waitlist-canvas__prizes-profile-copy">
            <span className="waitlist-canvas__prizes-profile-name">{profile.name}</span>
            <span className="waitlist-canvas__prizes-profile-org">{profile.org}</span>
          </div>
          <ChevronDown size={16} strokeWidth={1.75} aria-hidden />
        </div>

        <div
          className="waitlist-canvas__prizes-heading"
          style={{ left: L.title.left, top: L.title.top, width: L.title.width }}
        >
          <h1 className="waitlist-canvas__prizes-title">{c.title}</h1>
          <p className="waitlist-canvas__prizes-sub">
            {c.subtitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>

        <div
          className="waitlist-canvas__points-card"
          style={{
            left: L.points.left,
            top: L.points.top,
            width: L.points.width,
            height: L.points.height,
          }}
        >
          <div className="waitlist-canvas__points-main">
            <p className="waitlist-canvas__points-eyebrow">{c.points.eyebrow}</p>
            <p className="waitlist-canvas__points-value">{c.points.value}</p>
            <div className="waitlist-canvas__points-bar">
              <div style={{ width: `${c.points.percent}%` }} />
            </div>
            <p className="waitlist-canvas__points-note">{c.points.note}</p>
          </div>
          <div className="waitlist-canvas__points-divider" aria-hidden />
          <div className="waitlist-canvas__points-aside">
            <span className="waitlist-canvas__points-gift" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WAITLIST_ASSETS.prizes.gift} alt="" width={28} height={28} draggable={false} />
            </span>
            <button type="button" className="waitlist-canvas__points-history">
              {c.points.historyLabel}
            </button>
          </div>
        </div>

        <div
          className="waitlist-canvas__prizes-sectionhead"
          style={{
            left: L.featuredHead.left,
            top: L.featuredHead.top,
            width: L.featuredHead.width,
          }}
        >
          <h2>{c.featured.heading}</h2>
          <button type="button">
            {c.featured.viewAll}
            <ArrowRight size={15} strokeWidth={1.75} />
          </button>
        </div>

        <div
          className="waitlist-canvas__reward-row"
          style={{ left: L.rewards.left, top: L.rewards.top, width: L.rewards.width }}
        >
          {c.featured.rewards.map((r) => (
            <div key={r.title} className="waitlist-canvas__reward-card">
              <span className="waitlist-canvas__reward-badge">{r.status}</span>
              <h3>{r.title}</h3>
              <p>
                {r.desc.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </p>
              <div className="waitlist-canvas__reward-foot">
                <span>{r.cost}</span>
                <button type="button">{r.cta}</button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="waitlist-canvas__info-card waitlist-canvas__info-card--school"
          style={{ left: L.school.left, top: L.school.top, width: L.school.width, height: L.school.height }}
        >
          <div className="waitlist-canvas__school-row">
            <Trophy size={22} strokeWidth={1.5} aria-hidden />
            <div>
              <p className="waitlist-canvas__info-eyebrow">{c.school.eyebrow}</p>
              <p className="waitlist-canvas__info-text">{c.school.desc}</p>
              <p className="waitlist-canvas__info-strong">{c.school.prize}</p>
            </div>
          </div>
          <div className="waitlist-canvas__school-divider" aria-hidden />
          <div className="waitlist-canvas__school-leader">
            <p className="waitlist-canvas__info-eyebrow">{c.school.leaderLabel}</p>
            <p className="waitlist-canvas__info-strong">{c.school.leaderName}</p>
            <p className="waitlist-canvas__info-muted">{c.school.leaderPts}</p>
          </div>
        </div>

        <div
          className="waitlist-canvas__info-card waitlist-canvas__info-card--prompts"
          style={{ left: L.prompts.left, top: L.prompts.top, width: L.prompts.width, height: L.prompts.height }}
        >
          <p className="waitlist-canvas__info-eyebrow">{c.prompts.eyebrow}</p>
          <p className="waitlist-canvas__info-text">{c.prompts.desc}</p>
          <div className="waitlist-canvas__prompt-groups">
            {c.prompts.groups.map((g) => {
              const Icon = RANK_ICONS[g.icon];
              return (
                <div key={g.label} className="waitlist-canvas__prompt-group">
                  <span className="waitlist-canvas__prompt-head">
                    <Icon size={18} strokeWidth={1.5} aria-hidden />
                    {g.label}
                  </span>
                  <span className="waitlist-canvas__prompt-places">
                    {g.places.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {[L.earnLeft, L.earnRight].map((rect, idx) => (
          <div
            key={idx}
            className="waitlist-canvas__info-card waitlist-canvas__info-card--earn"
            style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
          >
            <h2>{c.earn.heading}</h2>
            <ul>
              {c.earn.items.map((it) => (
                <li key={`${idx}-${it.title}`}>
                  <div>
                    <p className="waitlist-canvas__earn-title">{it.title}</p>
                    <p className="waitlist-canvas__earn-desc">{it.desc}</p>
                  </div>
                  <span className="waitlist-canvas__earn-points">{it.points}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div
          className="waitlist-canvas__info-card waitlist-canvas__info-card--standing"
          style={{
            left: L.standing.left,
            top: L.standing.top,
            width: L.standing.width,
            height: L.standing.height,
          }}
        >
          <h2>{c.standing.heading}</h2>
          <ul>
            {c.standing.ranks.map((r) => {
              const Icon = RANK_ICONS[r.icon];
              return (
                <li key={r.title}>
                  <Icon size={18} strokeWidth={1.5} aria-hidden />
                  <div>
                    <p className="waitlist-canvas__earn-title">{r.title}</p>
                    <p className="waitlist-canvas__earn-desc">{r.desc}</p>
                  </div>
                  <span className="waitlist-canvas__standing-value">{r.value}</span>
                </li>
              );
            })}
          </ul>
          <button type="button">
            {c.standing.cta}
            <ArrowRight size={15} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
