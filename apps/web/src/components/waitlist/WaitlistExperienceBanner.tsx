import { Calendar, Gift, Sparkles } from "lucide-react";

import { WAITLIST_LANDING_CONTENT } from "@/lib/waitlist-page-content";

const STEP_ICONS = {
  calendar: Calendar,
  star: Sparkles,
  gift: Gift,
} as const;

/** Dark "Experience the waitlist" banner — artboard 1 desktop section. */
export function WaitlistExperienceBanner() {
  const { experienceHeading, experienceSteps } = WAITLIST_LANDING_CONTENT;

  return (
    <div className="waitlist-experience">
      <h2 className="waitlist-experience-title">{experienceHeading}</h2>
      <div className="waitlist-experience-steps">
        {experienceSteps.map((step) => {
          const Icon = STEP_ICONS[step.icon];
          const lines = step.description.split("\n");

          return (
            <article key={step.number} className="waitlist-experience-step">
              <div className="waitlist-experience-icon-wrap" aria-hidden>
                <Icon size={28} strokeWidth={1.5} />
                <span className="waitlist-experience-badge">{step.number}</span>
              </div>
              <h3 className="waitlist-experience-step-title">{step.title}</h3>
              <p className="waitlist-experience-step-desc">
                {lines.map((line, index) => (
                  <span key={index}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
