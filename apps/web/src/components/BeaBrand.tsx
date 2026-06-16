import Link from "next/link";

import { fontAptos } from "@/lib/design";

type Props = {
  className?: string;
  /** White text for use on dark/image backgrounds (login left panel). */
  inverted?: boolean;
};

/** Text wordmark — matches the login page `.left-brand` treatment. */
export function BeaBrand({ className = "", inverted = false }: Props) {
  return (
    <Link
      href="/"
      className={`text-[22px] font-medium tracking-[-0.3px] lg:text-[26px] ${inverted ? "text-white" : "text-[#1a1a1a]"} ${className}`}
      style={{ fontFamily: fontAptos, fontWeight: 500 }}
      aria-label="bea home"
    >
      bea
    </Link>
  );
}
