import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  label: string;
};

export function WaitlistContinueButton({ href, label }: Props) {
  return (
    <Link href={href} className="waitlist-btn-primary">
      <span>{label}</span>
      <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}
