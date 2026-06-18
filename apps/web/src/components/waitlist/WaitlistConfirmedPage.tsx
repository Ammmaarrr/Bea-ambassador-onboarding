"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  Clock,
  Crown,
  Leaf,
  Link2,
  MessageCircle,
} from "lucide-react";

import { WAITLIST_ARTBOARDS } from "@/lib/waitlist";

import { WaitlistArtboardPage } from "./WaitlistArtboardPage";

const meta = WAITLIST_ARTBOARDS["8"];

export function WaitlistConfirmedPage() {
  const mobile = (
    <div className="waitlist-root">
      <div className="waitlist-confirmed">
        <div className="waitlist-confirmed-top">
          <Link href={meta.backHref!} className="waitlist-back" aria-label="Go back">
            <ChevronLeft size={22} strokeWidth={1.75} />
          </Link>
          <Link href="/waitlist" className="waitlist-waiting-room">
            Waiting room
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </Link>
        </div>

        <div className="waitlist-check-badge">
          <Check size={28} strokeWidth={1.75} />
        </div>

        <h1 className="waitlist-confirmed-title">You&apos;re on the list!</h1>
        <p className="waitlist-confirmed-sub">Thanks for being part of bea.</p>

        <div className="waitlist-rank-card">
          <p className="waitlist-rank-eyebrow">YOUR PLACE IN LINE</p>
          <p className="waitlist-rank-number">#2,487</p>
          <p className="waitlist-rank-city">in New York, NY</p>

          <div className="waitlist-rank-progress-label">
            <span>NYC PROGRESS</span>
            <span>85%</span>
          </div>
          <div className="waitlist-rank-progress-bar">
            <div className="waitlist-rank-progress-fill" />
          </div>
          <p className="waitlist-rank-hint">
            Almost there! Share with friends to help unlock your city sooner.
          </p>
        </div>

        <div className="waitlist-section-divider">UNLOCK PERKS</div>
        <p className="waitlist-confirmed-sub">Every friend you invite earns in-app rewards</p>

        <div className="waitlist-perk-cards">
          <div className="waitlist-perk-card waitlist-perk-card--active">
            <Leaf size={18} strokeWidth={1.5} />
            <h4>Early Access</h4>
            <p>Be in the first cohort of users when we launch</p>
            <p className="waitlist-perk-invite">Invite 1 friend</p>
          </div>
          <div className="waitlist-perk-card">
            <Clock size={18} strokeWidth={1.5} />
            <h4>Time Pack</h4>
            <p>Extend conversations for 24 hours</p>
            <p className="waitlist-perk-invite">Invite 2 friends</p>
          </div>
          <div className="waitlist-perk-card">
            <Crown size={18} strokeWidth={1.5} />
            <h4>Premium Membership</h4>
            <p>Free month of premium membership on us</p>
            <p className="waitlist-perk-invite">Invite 3 friends</p>
          </div>
        </div>

        <div className="waitlist-section-divider">SHARE YOUR LINK</div>

        <div className="waitlist-share-icons">
          <span className="waitlist-share-icon">
            <span aria-hidden="true">IG</span>
            Instagram
          </span>
          <span className="waitlist-share-icon">
            <span aria-hidden="true">
              <MessageCircle size={18} strokeWidth={1.5} />
            </span>
            Messages
          </span>
          <span className="waitlist-share-icon">
            <span aria-hidden="true">WA</span>
            Whatsapp
          </span>
        </div>

        <Link href={meta.nextHref!} className="waitlist-btn-primary waitlist-btn-primary--compact">
          <Link2 size={18} strokeWidth={2} />
          Copy Invite Link
        </Link>

        <p className="waitlist-confirmed-footer">
          Thank you for helping build something meaningful.
          <br />
          We can&apos;t wait to bring Bea to your community
        </p>
      </div>
    </div>
  );

  return <WaitlistArtboardPage artboardId="8" mobile={mobile} />;
}
