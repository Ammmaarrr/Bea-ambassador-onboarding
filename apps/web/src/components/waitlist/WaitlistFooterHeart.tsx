/** Hand-drawn outline heart — inline left of footer thank-you line (artboard 8). */
export function WaitlistFooterHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 12.8s-4.8-3.4-4.8-6.6C3.2 4.2 4.9 2.5 6.8 2.5c1 0 1.9.5 2.5 1.2.6-.7 1.5-1.2 2.5-1.2 1.9 0 3.6 1.7 3.6 3.7 0 3.2-4.8 6.6-4.8 6.6z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.1 11.2c.3.4.9.4 1.2 0"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
    </svg>
  );
}
