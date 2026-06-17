import Link from "next/link";
import overlays from "@/lib/artboard-overlays.json";

/** Transparent hit area over the baked artboard logo (laptop welcome only). */
export function ArtboardHeroLogo() {
  const { left, top, width, height } = overlays.heroLogo;

  return (
    <Link
      href="/"
      className="artboard-hero-logo-hit artboard-hit"
      style={{ left, top, width, height }}
      aria-label="bea home"
    />
  );
}
