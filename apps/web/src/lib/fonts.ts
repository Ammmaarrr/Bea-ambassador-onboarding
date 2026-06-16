import { Fraunces, Lato } from "next/font/google";
import localFont from "next/font/local";

/** Real Canela Text (trial subset from the design file) for headlines. */
export const canela = localFont({
  src: [
    { path: "../fonts/CanelaText-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/CanelaText-Medium.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  preload: true,
  variable: "--font-canela",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Resolved font-family string for inline styles (most reliable on mobile Safari). */
export const fontCanelaFamily = canela.style.fontFamily;

/** Fraunces — per-glyph fallback for the few characters not in the Canela trial subset. */
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-fraunces",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** UI/body sans. */
export const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-lato",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});
