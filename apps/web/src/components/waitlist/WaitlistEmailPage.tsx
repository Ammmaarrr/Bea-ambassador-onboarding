import { WaitlistArtboardPage } from "./WaitlistArtboardPage";
import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

export function WaitlistEmailPage() {
  const mobile = (
    <WaitlistStepShell
      activeIndex={4}
      backHref="/waitlist/school"
      title="Where should we send the invite to?"
      subtitle="We'll let you know the moment you can join"
      footer={<WaitlistContinueButton href="/waitlist/confirmed" label="Confirm email" />}
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

  return <WaitlistArtboardPage pageKey="email" mobile={mobile} />;
}
