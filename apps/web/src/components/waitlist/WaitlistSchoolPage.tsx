import { WaitlistArtboardPage } from "./WaitlistArtboardPage";
import { WaitlistContinueButton } from "./WaitlistContinueButton";
import { WaitlistStepShell } from "./WaitlistStepShell";

export function WaitlistSchoolPage() {
  const mobile = (
    <WaitlistStepShell
      activeIndex={3}
      backHref="/waitlist/name"
      title="Which school are you affiliated with?"
      footer={<WaitlistContinueButton href="/waitlist/email" label="Continue" />}
    >
      <div className="waitlist-search-block waitlist-search-block--tight">
        <label className="waitlist-field-label" htmlFor="school-search">
          Search your school
        </label>
        <input
          id="school-search"
          className="waitlist-box-input"
          type="search"
          placeholder="Search"
          autoComplete="off"
        />
      </div>

      <button type="button" className="waitlist-school-card">
        <span>
          <span className="waitlist-school-card-name">New York University</span>
          <span className="waitlist-school-card-city">New York</span>
        </span>
        <span className="waitlist-school-card-dot" aria-hidden="true" />
      </button>

      <div className="waitlist-or-divider">or</div>

      <button type="button" className="waitlist-btn-secondary">
        I&apos;m not currently in school
      </button>
    </WaitlistStepShell>
  );

  return <WaitlistArtboardPage pageKey="school" mobile={mobile} />;
}
