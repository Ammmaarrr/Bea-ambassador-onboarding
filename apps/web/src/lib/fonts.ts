import { Fraunces, Lato } from "next/font/google";

/** Literal stack for inline styles — matches fonts.css @font-face family name. */
export const fontCanelaFamily =
  '"Canela Text", var(--font-fraunces), Georgia, "Times New Roman", serif';

/** Fraunces — per-glyph fallback for characters outside the Canela trial subset. */
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
