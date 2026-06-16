"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { ONBOARDING_STEPS } from "@/lib/onboarding-steps";
import { fontAptos } from "@/lib/design";
import { navigation, onboarding } from "@/lib/config";

type Props = {
  activeIndex?: number;
};

export function MobileNav({ activeIndex }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const resolvedIndex =
    activeIndex ??
    ONBOARDING_STEPS.findIndex((step) => step.href === pathname);

  return (
    <header
      className="lg:hidden sticky top-0 z-50 border-b bg-[#f8f3ef]/95 backdrop-blur-md pt-[env(safe-area-inset-top)]"
      style={{ borderColor: "#edeceb", fontFamily: fontAptos }}
    >
      <div className="flex h-[56px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="bea home">
          <Image
            src="/images/bea-logo.png"
            alt=""
            width={72}
            height={28}
            className="h-[22px] w-auto"
            priority
          />
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dcd8d3] text-[#1a1a1a] transition-colors hover:bg-white/60 active:bg-white"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <button
          type="button"
          className="mobile-nav-backdrop fixed inset-0 z-40 bg-black/20"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        id="mobile-nav-panel"
        className={
          "mobile-nav-panel fixed right-0 top-0 z-50 flex h-full w-[min(88vw,320px)] flex-col border-l bg-[#f8f3ef] pt-[env(safe-area-inset-top)] shadow-2xl" +
          (open ? " mobile-nav-panel--open" : "")
        }
        style={{ borderColor: "#edeceb", fontFamily: fontAptos }}
        aria-hidden={!open}
      >
        <div className="flex h-[56px] items-center justify-between border-b px-4" style={{ borderColor: "#edeceb" }}>
          <span className="text-[13px] font-medium text-[#1a1a1a]">Menu</span>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1a1a1a]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#9a9490]">
            Onboarding
          </p>
          <ul className="space-y-1">
            {ONBOARDING_STEPS.map((step, i) => {
              const isActive = i === resolvedIndex;
              return (
                <li key={step.label}>
                  <Link
                    href={step.href}
                    className={
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] transition-colors" +
                      (isActive ? " bg-[#1a1a1a] text-white" : " text-[#1a1a1a] hover:bg-white/70")
                    }
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={
                        "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold" +
                        (isActive
                          ? " bg-white text-[#1a1a1a]"
                          : " border border-[#dcd8d3] text-[#9a9490]")
                      }
                    >
                      {i + 1}
                    </span>
                    {step.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t px-4 py-5 pb-[calc(20px+env(safe-area-inset-bottom))]" style={{ borderColor: "#edeceb" }}>
          <p className="text-[12px] text-[#888480]">
            {onboarding.header.loginPrompt}{" "}
            <Link
              href={navigation.login}
              className="text-[#1a1a1a] underline underline-offset-[3px]"
              onClick={() => setOpen(false)}
            >
              {onboarding.header.loginLabel}
            </Link>
          </p>
        </div>
      </nav>
    </header>
  );
}
