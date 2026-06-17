import { BeaBrand } from "./BeaBrand";
import overlays from "@/lib/artboard-overlays.json";

/** Pixel-aligned hero logo on welcome artboard (laptop+ only). */
export function ArtboardHeroLogo() {
  const { left, top, markSize, fontSize } = overlays.heroLogo;

  return (
    <div
      className="artboard-hero-logo"
      style={{ left, top, fontSize }}
      aria-hidden={false}
    >
      <BeaBrand inverted markSize={markSize} className="artboard-hero-brand" />
    </div>
  );
}
