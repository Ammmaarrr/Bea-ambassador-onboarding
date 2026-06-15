import Image from "next/image";

import { fontAptos } from "@/lib/design";

export type PrizeCardData = {
  illustration: string;
  title: string;
  subtitle: string;
  badgeText: string;
  badge: {
    backgroundColor: string;
    borderColor: string;
    color: string;
  };
  width: number;
  titleNoWrap?: boolean;
};

export function PrizeCard({ card }: { card: PrizeCardData }) {
  return (
    <article
      className="relative flex w-full shrink-0 flex-col overflow-hidden rounded-[14px] bg-white"
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        height: "313px",
      }}
    >
      <div
        className="absolute right-[14px] top-[14px] z-10 flex items-center justify-center px-[12px]"
        style={{
          height: "28px",
          borderRadius: "14px",
          backgroundColor: card.badge.backgroundColor,
          border: `1px solid ${card.badge.borderColor}`,
        }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.02em] leading-none"
          style={{
            fontFamily: fontAptos,
            fontWeight: 600,
            color: card.badge.color,
          }}
        >
          {card.badgeText}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pt-10 pb-2 min-h-0">
        <Image
          src={card.illustration}
          alt=""
          aria-hidden
          width={320}
          height={200}
          className="max-h-[58%] w-auto max-w-[88%] object-contain select-none"
          draggable={false}
        />
      </div>

      <div className="px-4 pb-[22px] pt-1 text-center">
        <h3
          className="font-canela text-[18px] leading-[20px] text-[#000000]"
          style={{ whiteSpace: card.titleNoWrap ? "nowrap" : undefined }}
        >
          {card.title}
        </h3>
        <p
          className="mt-[6px] text-[13px] leading-[18px] text-[#8a8480]"
          style={{ fontFamily: fontAptos, fontWeight: 400 }}
        >
          {card.subtitle}
        </p>
      </div>
    </article>
  );
}
