"use client";

import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

export function WaitlistEmailPage() {
  return (
    <WaitlistStepShell
      activeIndex={3}
      backHref="/waitlist/school"
      title="Where should we send the invite to?"
      subtitle="We'll let you know the moment you can join"
      footer={<WaitlistContinueButton href="/waitlist/confirmed" label="Confirm email" />}
    >
      <div style={{ marginTop: 32 }}>
        <input
          className="waitlist-box-input"
          type="email"
          name="email"
          placeholder="you@email.com"
          autoComplete="email"
        />
      </div>
    </WaitlistStepShell>
  );
}
