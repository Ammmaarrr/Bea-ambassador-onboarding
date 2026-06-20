"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const navItems = [
    { label: "Today", href: "/dashboard", icon: "calendar" },
    { label: "Top Voices", href: "/dashboard/voices", icon: "mic" },
    { label: "Forum", href: "/dashboard/forum", icon: "forum" },
    { label: "Markets", href: "/dashboard/markets", icon: "pin" },
    { label: "Schools", href: "/dashboard/schools", icon: "school" },
    { label: "Leaderboard", href: "/dashboard/leaderboard", icon: "rank" },
    { label: "Invite Friends", href: "/dashboard/invite", icon: "invite" },
    { label: "Rewards", href: "/dashboard/rewards", icon: "reward" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf8] font-sans pb-8 text-black select-none antialiased">
      <header className="w-full bg-[#fcfbf8] z-40 border-b border-neutral-200/40">
        <div className="w-full px-4 sm:px-6 md:px-12 py-4 sm:py-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1 text-neutral-600 hover:text-neutral-900 cursor-pointer"
              aria-label="Open menu"
            >
              ☰
            </button>
            <Link href="/" className="text-[20px] sm:text-[30px] md:text-[40px] font-canela font-medium tracking-tight text-neutral-900">
              Bea
            </Link>
          </div>
          {!["/dashboard/forum", "/dashboard/schools", "/dashboard/leaderboard", "/dashboard/invite"].includes(pathname) && (
            <div className="flex items-center gap-2 shrink min-w-0">
              <span className="text-[9px] md:text-[11px] font-bold text-neutral-500 uppercase tracking-wider whitespace-nowrap">Day 1 of 7</span>
            </div>
          )}
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-[18px] font-lato font-black text-neutral-800 leading-tight">Ron</p>
              <p className="text-[14px] font-lato font-medium text-[#7c7b7d] mt-0.5">Northeastern</p>
            </div>
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image src="/images/ron-avatar-new.png" alt="Ron profile avatar" fill sizes="36px" className="object-cover" priority />
            </div>
          </div>
        </div>
      </header>
      <div className="flex-grow w-full px-6 md:px-12 flex flex-col md:flex-row gap-8 py-8">
        <aside className="hidden md:flex flex-col gap-1 w-48 shrink-0 border-r border-neutral-300/40 pr-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 px-4 rounded-[8px] font-lato text-[14px] font-bold tracking-wider uppercase transition-all ${
                isActive(item.href) ? "bg-[#f1eee7] text-black shadow-sm" : "text-[#444444] hover:bg-[#f1eee7]/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </aside>
        {children}
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button type="button" className="fixed inset-0 bg-neutral-950/40" aria-label="Close menu" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-[#fcfbf8] shadow-2xl flex flex-col p-5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="py-2 px-3 font-lato text-[13px] font-semibold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
