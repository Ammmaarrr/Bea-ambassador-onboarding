type Props = {
  /** Number of completed segments (1–4). */
  filledCount: number;
  total?: number;
};

/** Four-segment progress bar — cumulative fill matching artboard stepper. */
export function WaitlistProgress({ filledCount, total = 4 }: Props) {
  return (
    <div
      className="waitlist-progress"
      role="progressbar"
      aria-valuenow={filledCount}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={
            "waitlist-progress-bar" +
            (i < filledCount ? " waitlist-progress-bar--filled" : "")
          }
        />
      ))}
    </div>
  );
}
