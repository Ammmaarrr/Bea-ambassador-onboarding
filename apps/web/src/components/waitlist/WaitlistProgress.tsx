type Props = {
  activeIndex: number;
  total?: number;
};

/** Five-segment progress bar — matches waitlist artboard (4px tall, 8px gaps). */
export function WaitlistProgress({ activeIndex, total = 5 }: Props) {
  return (
    <div
      className="waitlist-progress"
      role="progressbar"
      aria-valuenow={activeIndex + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={
            "waitlist-progress-bar" + (i === activeIndex ? " waitlist-progress-bar--active" : "")
          }
        />
      ))}
    </div>
  );
}
