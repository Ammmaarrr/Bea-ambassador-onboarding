"use client";

import React from 'react';
import Image from 'next/image';

interface SchoolRankingItem {
    rank: number;
    schoolName: string;
    avatar: string;
    participants: number | null;
    prompts: number | null;
    invites: number | null;
    total: number | null;
}

export default function SchoolsPage() {
    const rankingData: SchoolRankingItem[] = [
        {
            rank: 1,
            schoolName: 'University of Connecticut',
            avatar: '/images/ron-avatar-new.png',
            participants: 200,
            prompts: 200,
            invites: 400,
            total: 600,
        },
        {
            rank: 2,
            schoolName: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            participants: null,
            prompts: null,
            invites: null,
            total: null,
        },
        {
            rank: 3,
            schoolName: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            participants: null,
            prompts: null,
            invites: null,
            total: null,
        },
        {
            rank: 4,
            schoolName: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            participants: null,
            prompts: null,
            invites: null,
            total: null,
        },
        {
            rank: 5,
            schoolName: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            participants: null,
            prompts: null,
            invites: null,
            total: null,
        },
        {
            rank: 6,
            schoolName: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            participants: null,
            prompts: null,
            invites: null,
            total: null,
        },
        {
            rank: 7,
            schoolName: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            participants: null,
            prompts: null,
            invites: null,
            total: null,
        }
    ];

    return (
        <main className="flex-1 flex flex-col gap-6 md:gap-8">

            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-[22px] md:text-[36px] font-canela font-medium tracking-[0.03em] text-neutral-900 leading-tight">
                    School Ranking
                </h1>
                <p className="text-[12px] md:text-[18px] font-lato font-medium tracking-[0.03em] text-neutral-500">
                    See who&apos;s leading the waitlist experience.
                </p>
            </div>

            {/* SUMMARY COMPETITION CARD */}
            <section className="bg-[#fbfbf9] border border-neutral-200/50 rounded-[12px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col sm:flex-row items-center gap-6 sm:gap-12 w-full">
                {/* Left block (Icon & Title) */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full bg-[#efebe5] flex items-center justify-center shrink-0">
                        {/* Columns / building pillars icon */}
                        <svg className="w-5.5 h-5.5 text-[#584939]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M2.25 21h19.5" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <span className="font-lato text-[12px] md:text-[18px] font-bold text-neutral-800 block leading-none">
                            About this competition
                        </span>
                        <span className="font-lato text-[12px] md:text-[18px] font-normal text-neutral-500 mt-1.5 block leading-none">
                            Campus Competition
                        </span>
                    </div>
                </div>

                {/* Right block (Stats details) */}
                <div className="flex-1 flex flex-wrap items-center justify-between sm:justify-end gap-8 sm:gap-16 w-full">
                    {/* Total Schools */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-normal text-neutral-500 leading-none">
                            Total Schools
                        </span>
                        <span className="font-lato text-[16px] md:text-[24px] font-bold text-neutral-800 mt-2 leading-none">
                            110
                        </span>
                    </div>

                    {/* Total Participants */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-normal text-neutral-500 leading-none">
                            Total Participants
                        </span>
                        <span className="font-lato text-[16px] md:text-[24px] font-bold text-neutral-800 mt-2 leading-none">
                            45,929
                        </span>
                    </div>

                    {/* Top Prize */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-normal text-neutral-500 leading-none">
                            Top Prize
                        </span>
                        <span className="font-lato text-[16px] md:text-[24px] font-bold text-neutral-800 mt-2 leading-none">
                            $10,000
                        </span>
                    </div>
                </div>
            </section>

            {/* RANKING TABLE CARD */}
            <section className="bg-[#fbfbf9] border border-neutral-200/40 rounded-[12px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] w-full">
                <div className="overflow-x-auto no-scrollbar w-full">
                    <div className="min-w-[640px] md:min-w-[800px] flex flex-col gap-0.5">
                        {/* Table Header Row */}
                        <div className="grid grid-cols-[60px_1fr_100px_100px_100px_80px] md:grid-cols-[100px_1fr_150px_150px_150px_120px] gap-4 items-center pb-3 border-b border-neutral-200/60 font-sfpro text-[11px] md:text-[14px] font-bold text-[#402b23] uppercase tracking-widest">
                            <span>Rank</span>
                            <span>School</span>
                            <span>Participants</span>
                            <span>Prompts</span>
                            <span>Invites</span>
                            <span>Total</span>
                        </div>

                        {/* List Items */}
                        {rankingData.map((item) => (
                            <div key={item.rank} className="grid grid-cols-[60px_1fr_100px_100px_100px_80px] md:grid-cols-[100px_1fr_150px_150px_150px_120px] gap-4 items-center py-4 border-b border-neutral-200/30 last:border-0 hover:bg-neutral-50/40 transition-colors duration-150">
                                {/* Rank cell */}
                                <div className="flex items-center pl-1">
                                    {item.rank === 1 && (
                                        <svg className="w-7 h-7 md:w-11 md:h-11 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.5V21L12 19.5L15 21V13.5" fill="#caa138" opacity="0.85" />
                                            <path d="M12 13.5V21L15 19.5L18 21V13.5" fill="#dfb33e" opacity="0.85" />
                                            <circle cx="12" cy="10" r="7" fill="#e5c158" stroke="#caa138" strokeWidth="1.2" />
                                            <circle cx="12" cy="10" r="5.2" fill="#dfb33e" />
                                            <text x="12" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="9" fontWeight="950" fill="white" textAnchor="middle">1</text>
                                        </svg>
                                    )}
                                    {item.rank === 2 && (
                                        <svg className="w-7 h-7 md:w-11 md:h-11 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.5V21L12 19.5L15 21V13.5" fill="#8d8d8d" opacity="0.85" />
                                            <path d="M12 13.5V21L15 19.5L18 21V13.5" fill="#a8a8a8" opacity="0.85" />
                                            <circle cx="12" cy="10" r="7" fill="#c0c0c0" stroke="#8d8d8d" strokeWidth="1.2" />
                                            <circle cx="12" cy="10" r="5.2" fill="#a8a8a8" />
                                            <text x="12" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="9" fontWeight="950" fill="white" textAnchor="middle">2</text>
                                        </svg>
                                    )}
                                    {item.rank === 3 && (
                                        <svg className="w-7 h-7 md:w-11 md:h-11 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.5V21L12 19.5L15 21V13.5" fill="#935b30" opacity="0.85" />
                                            <path d="M12 13.5V21L15 19.5L18 21V13.5" fill="#af6f3b" opacity="0.85" />
                                            <circle cx="12" cy="10" r="7" fill="#cd7f32" stroke="#935b30" strokeWidth="1.2" />
                                            <circle cx="12" cy="10" r="5.2" fill="#af6f3b" />
                                            <text x="12" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="9" fontWeight="950" fill="white" textAnchor="middle">3</text>
                                        </svg>
                                    )}
                                    {item.rank > 3 && (
                                        <span className="font-sfpro text-[14px] md:text-[20px] font-bold text-neutral-500 pl-2">
                                            {item.rank}
                                        </span>
                                    )}
                                </div>

                                {/* School Name & Avatar cell */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="relative w-7.5 h-7.5 rounded-full overflow-hidden border border-neutral-200/70 shadow-sm bg-neutral-100 flex items-center justify-center shrink-0">
                                        <Image
                                            src={item.avatar}
                                            alt={`${item.schoolName} avatar`}
                                            fill
                                            sizes="30px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="font-lato text-[12px] md:text-[18px] font-medium text-[#000000] truncate">
                                        {item.schoolName}
                                    </span>
                                </div>

                                {/* Participants cell */}
                                <span className="font-lato text-[12px] md:text-[18px] font-medium text-[#000000]">
                                    {item.participants !== null ? item.participants : ''}
                                </span>

                                {/* Prompts cell */}
                                <span className="font-lato text-[12px] md:text-[18px] font-medium text-[#000000]">
                                    {item.prompts !== null ? item.prompts : ''}
                                </span>

                                {/* Invites cell */}
                                <span className="font-lato text-[12px] md:text-[18px] font-medium text-[#000000]">
                                    {item.invites !== null ? item.invites : ''}
                                </span>

                                {/* Total cell */}
                                <span className="font-lato text-[12px] md:text-[18px] font-medium text-[#000000]">
                                    {item.total !== null ? item.total : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
