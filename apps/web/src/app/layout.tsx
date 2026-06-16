import type { Metadata } from "next";
import "@/styles/globals.css";

import { canela, fraunces, lato } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Welcome — Campus launch | bea",
  description: "Ambassador onboarding welcome page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${canela.variable} ${fraunces.variable} ${lato.variable}`}>
      <body className={`${lato.className} antialiased`}>{children}</body>
    </html>
  );
}
