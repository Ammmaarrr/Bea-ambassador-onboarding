import type { CSSProperties } from "react";

type Props = {
  label: string;
  className?: string;
  style?: CSSProperties;
};

/** Eyebrow with flanking rules — artboard 8 "UNLOCK PERKS" / "SHARE YOUR LINK". */
export function WaitlistSectionDivider({ label, className, style }: Props) {
  return (
    <div
      className={className ? `waitlist-section-divider ${className}` : "waitlist-section-divider"}
      style={style}
    >
      <span>{label}</span>
    </div>
  );
}
