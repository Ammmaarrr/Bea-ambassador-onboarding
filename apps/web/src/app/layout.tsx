import type { Metadata } from "next";
import "@/styles/globals.css";

import { fraunces, lato } from "@/lib/fonts";

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
    <html lang="en" className={`${fraunces.variable} ${lato.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/CanelaText-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${lato.className} antialiased`}>{children}</body>
    </html>
  );
}
