import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  /** White wordmark for use on dark/image backgrounds. */
  inverted?: boolean;
};

/** bea logo — icon mark + Canela wordmark (matches design artboard). */
export function BeaBrand({ className = "", inverted = false }: Props) {
  return (
    <Link
      href="/"
      className={`bea-brand inline-flex items-center gap-[8px] ${className}`}
      aria-label="bea home"
    >
      <Image
        src="/images/bea-logo.png"
        alt=""
        width={26}
        height={26}
        className="bea-brand-icon h-[26px] w-[26px] shrink-0 object-contain"
        aria-hidden
      />
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
