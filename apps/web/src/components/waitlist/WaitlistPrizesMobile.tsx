import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Gift,
  Globe,
  GraduationCap,
  MapPin,
  Trophy,
  UserPlus,
} from "lucide-react";

import { WAITLIST_APP_SHELL, WAITLIST_PRIZES_DETAIL } from "@/lib/waitlist-page-content";

import { WaitlistPrizesAppBar } from "./WaitlistPrizesAppBar";

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

/** Prizes screen — mobile uses hamburger drawer, desktop uses persistent sidebar. */
export function WaitlistPrizesMobile() {
  const c = WAITLIST_PRIZES_DETAIL;
  const { logo, nav, ranks } = WAITLIST_APP_SHELL;

  return (
    <div className="waitlist-root waitlist-prizes-shell">
      {/* Desktop persistent sidebar — hidden on mobile via CSS */}
      <nav className="waitlist-prizes-sidebar" aria-label="Main navigation">
        <Link href="/waitlist" className="waitlist-prizes-sidebar-logo">
          {logo}
        </Link>
        <ul className="waitlist-prizes-sidebar-nav">
          {nav.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const active = "active" in item && item.active;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={"waitlist-prizes-sidebar-link" + (active ? " is-active" : "")}
                >
                  <Icon size={18} strokeWidth={1.6} aria-hidden />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="waitlist-prizes-sidebar-ranks">
          {ranks.map((r) => (
            <div key={r.detail} className="waitlist-drawer-rank">
              <span className="waitlist-drawer-rank-dot" aria-hidden />
              <div>
                <p className="waitlist-drawer-rank-org">{r.org}</p>
                <p className="waitlist-drawer-rank-detail">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Main area: mobile appbar (hidden on desktop) + scrollable content */}
      <div className="waitlist-prizes-main">
        <WaitlistPrizesAppBar />
        <div className="waitlist-prizes-mobile">
          <h1 className="waitlist-prizes-title">{c.title}</h1>
          <p className="waitlist-prizes-sub">
            {c.subtitle.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>

          {/* YOUR POINTS */}
          <div className="waitlist-points-card">
            <div className="waitlist-points-main">
              <p className="waitlist-points-eyebrow">{c.points.eyebrow}</p>
              <p className="waitlist-points-value">{c.points.value}</p>
              <div className="waitlist-points-bar">
                <div
                  className="waitlist-points-fill"
                  style={{ width: `${c.points.percent}%` }}
                />
              </div>
              <p className="waitlist-points-note">{c.points.note}</p>
            </div>
            <div className="waitlist-points-aside">
              <span className="waitlist-points-gift" aria-hidden>
                <Gift size={22} strokeWidth={1.5} />
              </span>
              <button type="button" className="waitlist-points-history">
                {c.points.historyLabel}
              </button>
            </div>
          </div>

          {/* Featured rewards */}
          <div className="waitlist-prizes-sectionhead">
            <h2 className="waitlist-card-heading">{c.featured.heading}</h2>
            <button type="button" className="waitlist-prizes-viewall">
              {c.featured.viewAll}
              <ArrowRight size={15} strokeWidth={1.75} />
            </button>
          </div>
          <div className="waitlist-reward-list">
            {c.featured.rewards.map((r) => (
              <div key={r.title} className="waitlist-reward-card">
                <span className="waitlist-reward-badge">{r.status}</span>
                <h3 className="waitlist-reward-title">{r.title}</h3>
                <p className="waitlist-reward-desc">
                  {r.desc.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </p>
                <div className="waitlist-reward-foot">
                  <span className="waitlist-reward-cost">{r.cost}</span>
                  <button type="button" className="waitlist-reward-redeem">
                    {r.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* School competition */}
          <div className="waitlist-info-card">
            <div className="waitlist-school-row">
              <span className="waitlist-info-icon" aria-hidden>
                <Trophy size={22} strokeWidth={1.5} />
              </span>
              <div>
                <p className="waitlist-info-eyebrow">{c.school.eyebrow}</p>
                <p className="waitlist-info-text">{c.school.desc}</p>
                <p className="waitlist-info-strong">{c.school.prize}</p>
              </div>
            </div>
            <div className="waitlist-info-divider" />
            <div>
              <p className="waitlist-info-eyebrow">{c.school.leaderLabel}</p>
              <p className="waitlist-info-strong">{c.school.leaderName}</p>
              <p className="waitlist-info-strong">{c.school.leaderPts}</p>
            </div>
          </div>

          {/* Prompt points breakdown */}
          <div className="waitlist-info-card">
            <p className="waitlist-info-eyebrow">{c.prompts.eyebrow}</p>
            <p className="waitlist-info-text">{c.prompts.desc}</p>
            <div className="waitlist-prompt-groups">
              {c.prompts.groups.map((g) => {
                const Icon = RANK_ICONS[g.icon];
                return (
                  <div key={g.label} className="waitlist-prompt-group">
                    <span className="waitlist-prompt-head">
                      <span className="waitlist-info-icon" aria-hidden>
                        <Icon size={20} strokeWidth={1.5} />
                      </span>
                      {g.label}
                    </span>
                    <span className="waitlist-prompt-places">
                      {g.places.map((p) => (
                        <span key={p}>{p}</span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ways to earn points */}
          <div className="waitlist-info-card">
            <h2 className="waitlist-card-heading">{c.earn.heading}</h2>
            <ul className="waitlist-earn-list">
              {c.earn.items.map((it) => (
                <li key={it.title} className="waitlist-earn-item">
                  <div className="waitlist-earn-text">
                    <p className="waitlist-earn-title">{it.title}</p>
                    <p className="waitlist-earn-desc">{it.desc}</p>
                  </div>
                  <span className="waitlist-earn-points">{it.points}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Your standing */}
          <div className="waitlist-info-card">
            <h2 className="waitlist-card-heading">{c.standing.heading}</h2>
            <ul className="waitlist-earn-list">
              {c.standing.ranks.map((r) => {
                const Icon = RANK_ICONS[r.icon];
                return (
                  <li key={r.title} className="waitlist-earn-item">
                    <span className="waitlist-info-icon" aria-hidden>
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <div className="waitlist-earn-text">
                      <p className="waitlist-earn-title">{r.title}</p>
                      <p className="waitlist-earn-desc">{r.desc}</p>
                    </div>
                    <span className="waitlist-standing-value">{r.value}</span>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              className="waitlist-prizes-viewall waitlist-standing-cta"
            >
              {c.standing.cta}
              <ArrowRight size={15} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
