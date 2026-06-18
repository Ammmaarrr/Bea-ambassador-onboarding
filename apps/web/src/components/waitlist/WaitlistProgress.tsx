type Props = {
  activeIndex: number;
  total?: number;
};

export function WaitlistProgress({ activeIndex, total = 5 }: Props) {
  return (
    <div className="waitlist-progress" role="progressbar" aria-valuenow={activeIndex + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={
            "waitlist-progress-bar" + (i <= activeIndex ? " waitlist-progress-bar--active" : "")
          }
        />
      ))}
    </div>
  );
}
