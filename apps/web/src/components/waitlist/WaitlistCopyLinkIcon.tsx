/** Chain-link icon from artboard 8 copy button — currentColor inherits button text. */
export function WaitlistCopyLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.2 11.8l2.65-2.65a2.35 2.35 0 1 1 3.32 3.32l-2.65 2.65"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8 8.2l-2.65 2.65a2.35 2.35 0 1 1-3.32-3.32l2.65-2.65"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
