import { WAITLIST_ARTBOARDS } from "@/lib/waitlist";

import { WaitlistArtboardPage } from "./WaitlistArtboardPage";
import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

const meta = WAITLIST_ARTBOARDS["7"];

export function WaitlistEmailPage() {
  const mobile = (
    <WaitlistStepShell
      artboardId="7"
      backHref={meta.backHref!}
      title="Where should we send the invite to?"
      subtitle="We'll let you know the moment you can join"
      footer={<WaitlistContinueButton href={meta.nextHref!} label="Confirm email" />}
    >
      <div className="waitlist-search-block">
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

  return <WaitlistArtboardPage artboardId="7" mobile={mobile} />;
}
