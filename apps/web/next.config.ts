import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      { source: "/waitlist/market", destination: "/waitlist/3", permanent: true },
      { source: "/waitlist/name", destination: "/waitlist/4", permanent: true },
      { source: "/waitlist/school", destination: "/waitlist/5", permanent: true },
      { source: "/waitlist/email", destination: "/waitlist/7", permanent: true },
      { source: "/waitlist/confirmed", destination: "/waitlist/8", permanent: true },
      { source: "/waitlist/waiting-room", destination: "/waitlist/9", permanent: true },
    ];
  },
};

export default nextConfig;
