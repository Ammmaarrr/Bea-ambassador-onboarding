import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { WaitlistProgress } from "./WaitlistProgress";

type Props = {
  activeIndex: number;
  backHref: string;
  title: string;
  subtitle?: string;
  titleSerif?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function WaitlistStepShell({
  activeIndex,
  backHref,
  title,
  subtitle,
  titleSerif = false,
  children,
  footer,
}: Props) {
  return (
    <div className="waitlist-root">
      <div className="waitlist-step-shell">
        <div className="waitlist-step-top">
          <Link href={backHref} className="waitlist-back" aria-label="Go back">
            <ChevronLeft size={22} strokeWidth={1.75} />
          </Link>
          <WaitlistProgress activeIndex={activeIndex} />
        </div>

        <div className="waitlist-step-body">
          <h1 className={"waitlist-step-title" + (titleSerif ? " waitlist-step-title--serif" : "")}>
            {title}
          </h1>
          {subtitle ? <p className="waitlist-step-subtitle">{subtitle}</p> : null}
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}
