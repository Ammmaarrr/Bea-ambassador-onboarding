import Link from "next/link";

type Props = {
  className?: string;
  /** White wordmark for use on dark/image backgrounds. */
  inverted?: boolean;
  /** Logo mark size in px. */
  markSize?: number;
};

/** Vector bea mark — dark ring + teal center (matches design artboard). */
function BeaLogoMark({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bea-brand-mark shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="13" cy="13" r="12" fill="#1a2e33" />
      <circle cx="13" cy="13" r="5.25" fill="#3db4cc" />
    </svg>
  );
}

/** bea logo — SVG mark + Canela wordmark (not a raster image). */
export function BeaBrand({ className = "", inverted = false, markSize = 26 }: Props) {
  return (
    <Link
      href="/"
      className={`bea-brand inline-flex items-center gap-[8px] ${className}`}
      aria-label="bea home"
    >
      <BeaLogoMark size={markSize} />
      <span
        className={
          "bea-brand-text font-canela text-[22px] leading-[1.15] tracking-[-0.02em] md:text-[24px]" +
          (inverted ? " text-white" : " text-[#1a1a1a]")
        }
      >
        bea
      </span>
    </Link>
  );
}

export { BeaLogoMark };
