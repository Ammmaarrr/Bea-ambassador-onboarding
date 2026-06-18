import { WaitlistArtboardPage } from "./WaitlistArtboardPage";
import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

export function WaitlistNamePage() {
  const mobile = (
    <WaitlistStepShell
      activeIndex={2}
      backHref="/waitlist/market"
      title="What do we call you?"
      titleSerif
      footer={<WaitlistContinueButton href="/waitlist/school" label="Continue" />}
    >
      <div className="waitlist-underline-field">
        <label className="waitlist-field-label" htmlFor="first-name">
          First name
        </label>
        <input
          id="first-name"
          className="waitlist-underline-input"
          type="text"
          name="firstName"
          autoComplete="given-name"
        />
      </div>

      <div className="waitlist-underline-field">
        <label className="waitlist-field-label" htmlFor="age">
          How old are you?
        </label>
        <input
          id="age"
          className="waitlist-underline-input"
          type="number"
          name="age"
          min={18}
          max={120}
          inputMode="numeric"
        />
      </div>
    </WaitlistStepShell>
  );

  return <WaitlistArtboardPage pageKey="name" mobile={mobile} />;
}
